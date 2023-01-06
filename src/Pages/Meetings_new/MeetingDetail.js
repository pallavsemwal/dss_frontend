import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { firebaseConfig, getBaseUrl } from '../../utils';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Form from 'react-bootstrap/Form';
import { initializeApp } from "firebase/app";
import { initialNotesValue } from './constant';
import { getStorage, ref,  getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { Previews } from './FileUploader';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseButton from 'react-bootstrap/CloseButton';
import RichTextEditor from '../../Commons/Editor';
import { CircleLoader } from 'react-spinners';
export const MeetingDetail = () => {
  const params = useParams();
  const [doables, setDoables] = useState([]);
  const [relatedDocument, setRelatedDocument] = useState([]);
  const [minutes, setMinutes]= useState(initialNotesValue);
  const [participants, setArray] = useState([]);
  const animatedComponents = makeAnimated();
  const [member, setMember] = useState({});
  const [subject, setSubject] = useState('');
  const [loading, setLoading]= useState(0);
  const [relatedDocumentLink, setRelatedDocumentLink]= useState([]);
  // const [color, setColor] = useState('');
  const [reminderPeriod, setReminderPeriod] = useState(7);
  const [agenda, setAgenda]= useState([]);
  const [meetingLink, setMeetingLink]= useState([]);
  const [uploadedDocuments, setUploadedDocuments]= useState([]);
  const [file, setFile] = useState([]);
  const uploadFileRef = useRef();
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  const addFile = (e) => {
    e.preventDefault();
    const a=relatedDocument;
    if (e.target.files[0]) { // IF THERE ARE FILES TO BE UPLOADED
      var pendingFiles = [...file];
      for (let i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i]); // DISPLAYS EACH FILE
        a.push(e.target.files[i]); 
        pendingFiles.push(e.target.files[i].name); 
        uploadDocument(e.target.files[i]);
      }
      setRelatedDocument(a);
      setFile(pendingFiles);
    }
    // window.location.reload();
  };

  const removeFile = (i) => {
    setFile([...file.filter((_, index) => index !== i)]);
    setRelatedDocument([...relatedDocument.filter((_, index) => index !== i)]);

  };

  const BrowseFile = () => {
    return (
      <>
        <label>
          Upload
          <input
            type="file"
            onChange={(e) => addFile(e)}
            accept=".pdf"
            ref={uploadFileRef}
            multiple
          />
        </label>
      </>
    );
  };
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
    console.log(member);
    d.subject = subject;
    d.assignedTo = member.key;
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
    // relatedDocument.map((item) => {
      //   uploadDocument(item);
      // });
      const d = []
      doables.map((item,index) => {
        delete item.memberName;
        item.relatedDocumentLink= [uploadedDocuments[0].documentLink];
        if (!item.success) {
          console.log('this is the item:', item);
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
            setLoading(0);
            if(index==0) alert('Meeting Saved');
          })
          .catch((err) => {
            console.log(err);
          });
        }
        else {
          d.push(item);
          if(index==0) alert('doables Created');
      }
      setLoading(0);
      const t= setTimeout(()=>{
        window.location.reload();
      }, 1000)
    });
  }
  // const addDocument = (e) => {
    //   e.preventDefault();
    //   const selectedFile=e.target.files;
  //   const file = selectedFile;
  //   const a=docValue;
  //   a.push(file.name);
  //   setDocValue(a);
  // const d = relatedDocument;
  // d.push(...file);
  // setRelatedDocument(d);
  //   console.log(relatedDocument);
  // }
  const uploadDocument = (f) => {
    const storageRef = ref(storage, '/doableRelatedDocuments/' + f.name);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, f);
    uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('done');
          const a = relatedDocumentLink;
          a.push(downloadURL);
          const d={};
      d.meetingId= params.meetingId;
      d.documentLink= downloadURL;
      fetch(getBaseUrl() + "meeting/uploadDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "JWT " + localStorage.getItem('token')
        },
        body: JSON.stringify(d),
      }).then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log('here:',data);
        setLoading(0);
        })
        .catch((err) => {
          console.log(err); 
        });
          setRelatedDocumentLink(a);
          console.log(relatedDocumentLink)
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
        const val=[];
        data.groupMembers.map((item)=>{
          val.push({key:item.id,  label:item.first_name+" "+item.last_name});
        })
        setArray(val);
        const a= JSON.parse(data.agenda)
        console.log(a);
        setAgenda(a);
        setUploadedDocuments(data.uploadedDocuments);
        console.log('HI',uploadedDocuments);
        const ds=[];
        data.doables.map((item)=>{
          const x= {};
          x.success= true;
          x.subject= item.subject;
          x.assignedTo= item.assignedTo;
          x.deadline= item.deadline;
          x.reminderPeriod= item.reminderPeriod;
          // console.log(item.assignedTo);
          // const m=participants.find((it)=> it.key==item.assignedTo);
          // console.log(m.label);
          // item.memberName = m.label;
          let name='';
          participants.map((i)=>{
            if(i.key==x.assignedTo){
              name= i.label;
            }
          })
          x.memberName= name;
          ds.push(x);
        })
        setDoables(ds);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  const saveMeeting=()=>{
    console.log(uploadFileRef.current.files);
    console.log(relatedDocument);
  }


  return (
    <div>
      {loading?
      <><CircleLoader/></>
      :
      <>
      <Row>
        <Col md='8'>
          <Row>
            <Col md="11">
              <p>Minutes Of Meetings</p>
              <div style={{height:'350px', boxShadow:'2px 2px 8px 2px gainsboro', padding:'10px', borderRadius:'10px'}}>
              <RichTextEditor style={{height:'100%'}} value={minutes} setValue={(val)=>setMinutes(val)}/>
              </div>
            </Col>
            <Col style={{marginTop:'20px'}}>
            OR Upload Minutes of meeting
            <input type='file' style={{margin:'10px', width:'100%'}}/>
            </Col>
            <Col style={{margin:'20px'}}>
            <Button> Upload Minutes of Meeting</Button>
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
                    <th className='tb' style={{width:'25%'}}>Member</th>
                    <th className='tb'>Doable</th>
                    <th className='tb'>Deadline</th>
                    <th className='tb'>Reminder Period</th>
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
                  console.log(item);
                  const a= participants.find((i)=>(i.key== item.assignedTo));
                  return (
                    <tr >
                      <th className='tb'>
                        {a.label}
                      </th>
                      <th className='tb'>
                        {item.subject}
                      </th>
                      <th className='tb'>
                        {moment(item.deadline).format('ll') }
                      </th>
                      <th className='tb'>
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
          <label>
        Upload File:
      </label>
      <BrowseFile />

      <div
        style={{ maxHeight: "20rem", minHeight: "10rem", background:'#eeeeee', padding:'10px', borderRadius:'10px', display:'flex', marginTop:'10px' }}
      >
        {!file.length?<>Upload Files</>:<></>}
        {file.map((val, index) => {
          return (
            <>
              <div  style={{margin:'3px'}}>
                <div style={{display:'flex'}}>
                <PictureAsPdfIcon style={{fontSize:'50px', color:'red'}}/>
                <CloseButton style={{width:'1px'}} onClick={() => {
                  removeFile(index);
                }}/>
                </div>
                {/* <CancelIcon /> */}
                <p style={{fontSize:'13px', width:"50px", overflow:'hidden'}}>{val}</p>
              </div>
              </>
          );
        })}
      </div>
          </Row>
          <Row className="mt-3">
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
              {uploadedDocuments && uploadedDocuments.map((item)=>{
                const a= participants.find((i)=>(i.key== item.uploadedBy));
                const x= item.documentLink.indexOf("%2F");
                const y = item.documentLink.indexOf("?alt");
                const s= item.documentLink.substring(x+3,y).replaceAll("%20", " ");
                // const d= s.replace("%20", " ");
                console.log(s);
                return (
                  <tr>
                  <th style={{
                border: '1px solid rgb(190, 190, 190)',
                padding: '10px'
              }}>{a.label}</th>
              <th style={{
                border: '1px solid rgb(190, 190, 190)',
                padding: '10px'
              }}>
                {/* <object data="data/test.pdf" type="application/pdf" width="300" height="200"> */}
                <a href={item.documentLink} target='_blank' style={{textDecoration:'none', color:'black'}} type='application/pdf'><PictureAsPdfIcon style={{fontSize:'20px', color:'red'}}/>{s}</a>
                {/* </object> */}
              </th>
                  </tr>
                )
              })}
              

            </table>
        <Col>
        <table className='head mt-3' >
                      <thead>
                        <tr style={{ background: '#39CCCC', color: 'white' }}>
                          <th className='tb'>Description</th>
                          <th className='tb'>Assigned To</th>
                        </tr>
                      </thead>
                      {agenda && agenda.map((item) => {
                        return (
                          <tr>
                            <th className="tb">
                              {item.description}
                            </th>
                            <th className="tb">
                              {item.assignedTo}
                            </th>
                          </tr>
                        )
                      })}
                    </table>
        </Col>
          </Row>
        </Col>
        <Button style={{ width: '200px', marginTop: '20px' }} onClick={submit}>Save Meeting</Button>
      </Row>
      </>}
    </div>
  )
}
