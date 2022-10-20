import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { firebaseConfig, getBaseUrl } from '../../utils';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Form from 'react-bootstrap/Form';
import { initializeApp } from "firebase/app";
import { getStorage, ref,  getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Previews } from './FileUploader';

export const MeetingDetail = () => {
  const params = useParams();
  const [doables, setDoables] = useState([]);
  const [relatedDocument, setRelatedDocument] = useState([]);
  const [docValue, setDocValue]= useState([]);
  const [participants, setArray] = useState([]);
  const animatedComponents = makeAnimated();
  const [member, setMember] = useState({});
  const [subject, setSubject] = useState('');
  const [color, setColor] = useState('');
  const [reminderPeriod, setReminderPeriod] = useState(7);
  // const today=moment().format('YYYY-MM-DD');
  const [deadline, setDeadline] = useState(moment().add(15, 'days').format('YYYY-MM-DD'));
  const changeDeadline = (e) => {
    console.log(moment().add(7, 'days').format('YYYY-MM-DD'))
    // console.log(Date.now());
    setDeadline(e.target.value);
  }



  const changeSubject = (e) => {
    // console.log(e.target.value);
    setSubject(e.target.value);
  }
  // console.log(params);
  const change = (e) => {
    // console.log(e);
    // setMemberName(e.label);
    // setMemberId(e.value);
    // console.log(member);
    // console.log(e);
    setMember(e);
    // console.log(member);
  }
  const addDoable = () => {
    const d = {};
    d.subject = subject;
    d.assignedTo = member.value;
    d.memberName = member.label;
    d.deadline = deadline;
    d.reminderPeriod = reminderPeriod;
    d.doableType = "meeting";
    d.typeId = params.meetingId;
    const ds = doables;
    ds.push(d);
    setDoables(ds);
    setSubject('');
    setDeadline(moment().add(15, 'days').format('YYYY-MM-DD'));
    // setMemberId('');
    // setMemberName('');
    setReminderPeriod(7);
    setMember({});
    // console.log(ds);
  }
  const submit = () => {
    const d = []
    doables.map((item) => {
      if (!item.success) {

        fetch(getBaseUrl() + "doable/createDoable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT " + localStorage.getItem('token')
          },
          body: JSON.stringify(item),
        }).then((data) => {
          // console.log(data.json());
          return data.json();
        })
          .then((data) => {
            // setDepartment(data.departments);
            // console.log(upcoming);
            console.log(data);
            const i = item;
            i.message = data.message;
            i.success = data.success;
            d.push(i);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        d.push(item);
      }
    });
  }
  const addDocument = (e) => {
    e.preventDefault();
    const selectedFile=e.target.files;
    const file = selectedFile;
    const a=docValue;
    a.push(file.name);
    setDocValue(a);
    const d = relatedDocument;
    d.push(...file);
    setRelatedDocument(d);
    console.log(relatedDocument);
  }
  const uploadDocument = (e) => {
    console.log(relatedDocument);
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, '/meetingRelatedDocuments/2');
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, relatedDocument[0]);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            // console.log('Upload is paused');
            break;
          case 'running':
            // console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  useEffect(() => {
    console.log(localStorage);
    fetch(getBaseUrl() + "meeting/meetingDetail?meetingId=" + params.meetingId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem('token')
      }
    }).then((data) => {
      // console.log(data.json());
      return data.json();
    })
      .then((data) => {
        // setDepartment(data.departments);
        // console.log(upcoming);
        console.log(data);

      })
      .catch((err) => {
        console.log(err);
      });


    fetch(getBaseUrl() + "meeting/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem('token')
      }
    }).then((data) => {
      // console.log(data.json());
      return data.json();
    })
      .then((data) => {
        console.log(data);
        const val = [];
        data.map((item) => {
          val.push({ value: item.pk, label: item.fields.first_name + " " + item.fields.last_name })
        })
        setArray(val);
        // console.log(upcoming);
        // console.log(department);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Row>
        <Col md='8'>
          <Row>
            <Col md="8">
              <p>Minutes Of Meetings</p>
              <textarea style={{ width: '100%', height: '300px' }}></textarea>
            </Col>
          </Row>
          <Row>
            <Col md="10">
              <p>Doables</p>
              <table style={{
                borderCollapse: 'collapse',
                border: '2px solid rgb(200, 200, 200)',
                letterSpacing: '1px',
                fontFamily: 'sans-serif',
                fontSize: '.8rem',
                width: '100%'
              }}>
                <thead>
                  <tr>
                    <th style={{
                      border: '1px solid rgb(190, 190, 190)',
                      padding: '10px'
                    }}>Member</th>
                    <th style={{
                      border: '1px solid rgb(190, 190, 190)',
                      padding: '10px'
                    }}>Doable</th>
                    <th style={{
                      border: '1px solid rgb(190, 190, 190)',
                      padding: '10px'
                    }}>Deadline</th>
                    <th style={{
                      border: '1px solid rgb(190, 190, 190)',
                      padding: '10px'
                    }}>Reminder Period</th>
                    {/* <th style={{
                      border: '1px solid rgb(190, 190, 190)',
                      padding: '10px'
                    }}> Status</th> */}
                    {/* <th style={{
                  border: '1px solid rgb(190, 190, 190)',
                  padding: '10px'
                }}>Misc</th> */}
                  </tr>
                </thead>
                {doables && doables.map((item) => {

                  return (
                    <tr >
                      <th style={{
                        border: '1px solid rgb(190, 190, 190)',
                        padding: '0px'
                      }}>
                        {item.memberName}
                      </th>
                      <th style={{
                        border: '1px solid rgb(190, 190, 190)',
                        padding: '0px'
                      }}>
                        {item.subject}
                      </th>
                      <th style={{
                        border: '1px solid rgb(190, 190, 190)',
                        padding: '0px'
                      }}>
                        {item.deadline}
                      </th>
                      <th style={{
                        border: '1px solid rgb(190, 190, 190)',
                        padding: '0px'
                      }}>
                        {item.reminderPeriod}
                      </th>
                      {/* <th style={{
                        border: '1px solid rgb(190, 190, 190)',
                        padding: '0px'
                      }}> {item.success?<>Sent</>:<>Not Sent</>}</th> */}
                    </tr>
                  )
                })}
                <tr>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '0px'
                  }}>
                    <Select
                      name="Member"
                      type='text'
                      placeholder="Member"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      options={participants}
                      value={member}
                      onChange={change}
                    />
                  </th>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '0px 0px'
                  }}>
                    <Form.Control type='text' value={subject} onChange={changeSubject} />
                  </th>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '10px'
                  }}>
                    <Form.Control type="date" value={deadline} onChange={changeDeadline} />
                  </th>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '0px'
                  }}>
                    <Form.Control type="number" onChange={(e) => setReminderPeriod(e.target.value)} value={reminderPeriod} />
                  </th>

                </tr>

              </table>
              <Button onClick={addDoable}>Add New Doable</Button>
            </Col>
          </Row>
        </Col>
        <Col md="4">
          <Row>
            <Button onClick={uploadDocument} style={{ marginTop: '30px' }}>Upload Document</Button>
            <Form.Control type='file' onChange={(e) => addDocument(e)}  multiple/>
          </Row>
          <Row className="mt-3">
            <h3>Uploaded Documents</h3>
            <div>
              {docValue && docValue.map((item,key)=>{
                return <>{key}</>
              })}
            </div>
            <table style={{
              borderCollapse: 'collapse',
              border: '2px solid rgb(200, 200, 200)',
              letterSpacing: '1px',
              fontFamily: 'sans-serif',
              fontSize: '.8rem',
              width: '100%'
            }}>
              <thead>
                <tr>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '10px'
                  }}>Member</th>
                  <th style={{
                    border: '1px solid rgb(190, 190, 190)',
                    padding: '10px'
                  }}>Document Uploaded</th>
                  {/* <th style={{
                  border: '1px solid rgb(190, 190, 190)',
                  padding: '10px'
                }}>Misc</th> */}
                </tr>

              </thead>
              <th style={{
                border: '1px solid rgb(190, 190, 190)',
                padding: '10px'
              }}>Pallav Semwal</th>
              <th style={{
                border: '1px solid rgb(190, 190, 190)',
                padding: '10px'
              }}>
                {/* <object data="data/test.pdf" type="application/pdf" width="300" height="200"> */}
                <a href=' /notice.pdf' type='application/pdf'> Test.pdf</a>

                {/* </object> */}
              </th>

            </table>
          </Row>
        </Col>
        <Button style={{ width: '200px', marginTop: '20px' }} onClick={submit}>Save Meeting</Button>
      </Row>

    </div>
  )
}
