import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToastCalendar from "./ToastCalendar";
import Calender from "./Calender";
import moment from "moment-timezone";
import UpcomingEvents from "./UpcomingEvents";
import * as CS from "./CalenderStyled";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { RemoveFromQueue } from "@material-ui/icons";
import { Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { getBaseUrl } from "../../utils";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from "react-router-dom";
function CalenderPage() {
  
  const [curDate, setCurDate] = useState(moment());
  const [newEvent, setNewEvent] = useState(0);
  const [actionType, setType] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [participantsList, setparticipants] = useState([]);
  const [meetingGroups,setMeetingGroups] = useState([]);
  const [optionsArray, setArray] = useState([]);
  useEffect(() => {
    if(actionType==3){

      fetch(getBaseUrl() + "meeting/getMeetingGroups", {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"JWT "+ localStorage.getItem('token'),
      }
    }).then((data)=>{
    //   console.log(data.json());
      return data.json();
    })
    .then((data)=>{
      console.log(data);
      const val=[]
      data.map((item)=>{
        val.push({value:item.pk, label:item.fields.committeeName})
      })
      console.log(val);
      setMeetingGroups(val);
    })
    .catch((err)=>{
      console.log(err);
    }); 
  }
  },[actionType]);
  const UpdateUpcomingEventList = () => setNewEvent(newEvent + 1)
  const addParticipants = (e) => {
    console.log(e);

  }
  const [department, setDepartment] = useState([]);
useEffect(() => {
    console.log(localStorage);
    fetch(getBaseUrl() + "meeting/allDepartment", {
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
        setDepartment(data.departments);
        // console.log(upcoming);
        console.log(department);
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
          const val=[];
          data.map((item)=>{
            val.push({value:item.pk,label:item.fields.first_name+" "+ item.fields.last_name})
          })
          setArray(val);
          // console.log(upcoming);
          // console.log(department);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])
  const changeParticipants = (e) => {
    let v = participantsList;
    // v.push(e.value);
    // setparticipants(v);
    console.log(e);
    let obj = [];
    if (e != null) {
      e.map((item) => {
        obj.push(item.value);
      })
    }
    console.log(obj);
    setparticipants(obj);

  }
  const handleSubmit = (e) => {

    e.preventDefault();
    var object = {};

    const formData = new FormData(e.target);
    console.log(formData);
    formData.forEach((value, key) => {
      if (key != 'participants') {
        object[key] = value
      }
    })
    object[''] = participantsList;
    object['meetingSubject']=object.Name;
    object['scheduledTime']=  object.scheduledDate+" "+object.scheduledTime+":00"
    console.log(object);
    fetch(getBaseUrl() + "meeting/createMeeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem('token')
      },
      body:JSON.stringify(object),
    }).then((data) => {
      // console.log(data.json());
      return data.json();
    })
      .then((data) => {
        console.log(data);
        // const val=[];
        // data.map((item)=>{
        //   val.push({value:item.pk,label:item.fields.first_name+" "+ item.fields.last_name})
        // })
        // setArray(val);
        // console.log(upcoming);
        // console.log(department);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const animatedComponents = makeAnimated();
  //   { value: 1, label: "Ankit" },
  //   { value: 2, label: "Pallav" },
  //   { value: 3, label: "Nitesh" }
  // ];
  return (
    <CS.TotalPageDiv>
      <CS.MiddlePageDiv>
        <h2>Schedule</h2>
        <ToastCalendar
          curDate={curDate}
          setCurDate={setCurDate}
          UpdateUpcomingEventList={UpdateUpcomingEventList}
        />
        <div style={{ marginTop: '40px' }}>
          <h3>Departments</h3>
          <div style={{display:'flex', }}>
            {department && department.map((item)=>{
              return <Link to={'/user/meetingGroup/department/'+item[1]}><div style={{padding:'10px', background:'blue', margin:'0px 10px', borderRadius:'5px', color:'white'}}> {item[0]}</div></Link>
            })}
          </div>
        </div>
      </CS.MiddlePageDiv>

      <Col md='10' className='mt-4'>
        {/* <Button style={{marginTop:'20px'}} href={'/'}>Add New Meeting Group</Button> */}
        {/* <Calender curDate={curDate} setCurDate={setCurDate} /> */}
        {/* <br /> */}
        <div style={{width:'100%'}}>
          <Button onClick={handleShow}>Create New</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              Create New
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Select name="type" style={{ marginTop: '10px' }} value={actionType} onChange={(e) => setType(e.target.value)}>
                  <option value={1} >Create New Meeting Group</option>
                  <option value={2}>Create Ad hoc Meeting</option>
                  <option value={3}>Create New Meeting</option>
                </Form.Select>
                <Form.Control style={{ marginTop: '10px' }} name="Name" placeholder="Name" />
                <Row style={{ justifyContent: 'space-around', marginTop: '10px' }} >
                  <Col md={6}>
                    {/* {actionType=='Ad hoc' || actionType=='' */}
                    {actionType!=2 ?<>Schedule of 1st meet</>:<>Schedule of meet</>}
                    
                    <Form.Control className='col-md-5' name="scheduledDate" id="hi" placeholder="Schedule Time" type="date" />
                  </Col>
                  <Col md={6}>
                  {actionType!=2 ?<>Time of 1st meet</>:<>Time of meet</>}
                    <Form.Control type='time' name="scheduledTime" className='col-md-5' />
                  </Col>
                </Row>
                {/* <Form.Control style={{marginTop:'10px'}}  /> */}
                <Row>
                  <Col>
                    <Form.Label style={{marginTop:'10px', marginLeft:'20px'}}>Is Recurring</Form.Label>
                  </Col>
                  <Col>
                    <Form.Check name="isRecurring" type={'checkbox'} style={{ margin: '10px 0px' }} />
                  </Col>
                </Row>
                <Form.Control placeholder="Recurring Time" name="recurringTime" type="number" />
                {/* <Form.Select onChange={addParticipants} multiple='true' >
                  <option value={1}>Pallav</option>
                  <option value={2}>Ankit</option>
                  <option value={3}>Nitesh</option>
                </Form.Select> */}
                {/* <DropdownMultiselect name='participants' placeholder='Participants' options={optionsArray}/> */}
                {actionType!=3?
                <Select 
                className="mt-2"
                name="participants"
                placeholder="Select Members"
                closeMenuOnSelect={true}
                components={animatedComponents}
                // value={participantsList}
                isMulti
                onChange={changeParticipants}
                options={optionsArray}
                />
                :
                <></>
                }
                {actionType==3 ?
                <Select
                className="mt-3"
                  name="groupId"
                  type='text'
                  placeholder="Select Meeting Group"
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={meetingGroups}
                  />
                  :
                  <></>
                }
                <Button variant="primary" style={{ marginTop: '20px' }} type='submit' >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <UpcomingEvents />
      </Col>
    </CS.TotalPageDiv>
  );
}

export default CalenderPage;
