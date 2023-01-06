import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToastCalendar from "./ToastCalendar";
import Calender from "./Calender";
import moment, { now } from "moment-timezone";
import UpcomingEvents from "./UpcomingEvents";
import * as CS from "./CalenderStyled";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { AlternateEmail, RemoveFromQueue } from "@material-ui/icons";
import { InputGroup, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { getBaseUrl } from "../../utils";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from "react-router-dom";
import { CircleLoader } from "react-spinners";
function CalenderPage() {

  const [curDate, setCurDate] = useState(moment());
  const [newEvent, setNewEvent] = useState(0);
  const [actionType, setType] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading1(0);
  }
  const handleShow = () => setShow(true);
  const [participantsList, setparticipants] = useState([]);
  const [meetingGroups, setMeetingGroups] = useState([]);
  const [optionsArray, setArray] = useState([]);
  const [scheduleFirst, setScheduleFirst] = useState(1);
  const [scheduledDate, setScheduledDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [scheduledTime, setTime] = useState(moment('10:00', 'hh:mm').format('hh:mm'))
  const [agenda, setAgenda] = useState([]);
  const [recurring, setRecurring] = useState(1);
  const [department, setDepartment] = useState([]);
  const [relatedDepartments, setRelatedDepartments] = useState([]);
  const [depArr, setDepArr] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [events, setEvents] = useState([]);
  const [num, setNum] = useState(1);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(1);
  const [priority, setPriority] = useState();
  const [loading1, setLoading1] = useState(0);
  const priorities = [
    { key: '1', label: 'LOW' },
    { key: '2', label: 'NORMAL' },
    { key: '3', label: 'HIGH' },
  ]
  const handleChange = (event, value) => {
    setLoading(1);
    setPage(value);
    fetch(getBaseUrl() + "meeting/upcomingMeetings?limit=5&page1=" + value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem('token')
      }
    }).then((data) => {
      // console.log(data);
      // console.log(data.result);
      return data.json();
    })
      .then((data) => {
        setLoading(0);
        setUpcoming(data.content);
        setNum(data.num_pages);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // console.log(localStorage);
    fetch(getBaseUrl() + "meeting/upcomingMeetings?page1=1&limit=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.getItem('token')
      }
    }).then((data) => {
      // console.log(data);
      // console.log(data.result);
      return data.json();
    })
      .then((data) => {
        setLoading(0);
        setUpcoming(data.content);
        setNum(data.num_pages);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  const changeScheduledTime = (e) => {
    setTime(e.target.value);
  }

  const changeScheduleFirst = (e) => {
    // console.log(e.target.value);
    setScheduleFirst(!scheduleFirst);
  }
  const changeScheduledDate = (e) => {
    setScheduledDate(e.target.value);
  }
  useEffect(() => {

    if (actionType == 3) {

      fetch(getBaseUrl() + "meeting/getMeetingGroups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "JWT " + localStorage.getItem('token'),
        }
      }).then((data) => {
        //   console.log(data.json());
        return data.json();
      })
        .then((data) => {
          console.log(data);
          const val = []
          data.map((item) => {
            val.push({ value: item.pk, label: item.fields.committeeName })
          })
          console.log(val);
          setMeetingGroups(val);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }, [actionType]);
  const UpdateUpcomingEventList = () => setNewEvent(newEvent + 1)
  const addParticipants = (e) => {
    console.log(e);
    
  }
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

    fetch(getBaseUrl() + 'meeting/getAllDepartments', {
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
        console.log('DATA::', data);
        const a = [];
        data.map((item) => {
          a.push({ value: item.pk, label: item.fields.departmentName });
        });
        setDepArr(a);
        console.log('HERE', depArr)
        // console.log(upcoming);
        // console.log(department);
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
  const changeRelatedDepartments = (e) => {
    const v = relatedDepartments;
    console.log(e);
    let obj = [];
    if (e != null) {
      e.map((item) => {
        obj.push(item.value);
      })
    }
    console.log(obj);
    setRelatedDepartments(obj);
  }
  const handleSubmit = (e) => {
    setLoading1(1);
    e.preventDefault();
    var object = {};

    const formData = new FormData(e.target);
    console.log(formData);
    formData.forEach((value, key) => {
      if (key != 'participants') {
        object[key] = value
      }
    })
    object['groupMembers'] = participantsList;
    // object['scheduledTime'] = 
    if (actionType != 3) {
      object['committeeName'] = object['Name'];
      object['groupType'] = actionType - 1;
      object['relatedDepartmentId'] = relatedDepartments;
      delete object.type;
      delete object.Name;
      if (!object['groupMembers'].find((val) => (val == parseInt(object['memberSecretary'])))) {
        object['groupMembers'].push(parseInt(object['memberSecretary']));
      }
      object['isRecurring'] = (object['isRecurring'] == 'on');

      console.log(object);
      fetch(getBaseUrl() + "meeting/createMeetingGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "JWT " + localStorage.getItem('token')
        },
        body: JSON.stringify(object),
      }).then((data) => {
        // console.log(data.json());
        return data.json();
      })
        .then((data) => {
          console.log(data);
          alert('Meeting Group Created');
          setType(1);
          setAgenda();
          setPriority();
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (actionType == 3) {
      object["agenda"] = JSON.stringify(agenda);
      object['meetingSubject'] = object['Name'];
      object["scheduledTime"] = scheduledDate + " " + scheduledTime + ":00"
      // console.log(scheduledDate+" "+scheduledTime+":00")
      delete object.Name;
      object['priority']= priority.key;
      console.log(object);
      fetch(getBaseUrl() + "meeting/createMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "JWT " + localStorage.getItem('token')
        },
        body: JSON.stringify(object),
      }).then((data) => {
        // console.log(data.json());
        return data.json();
      })
        .then((data) => {
          console.log(data);
          alert('Meeting Created');
          
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });

    }

  }
  const animatedComponents = makeAnimated();
  //   { value: 1, label: "Ankit" },
  //   { value: 2, label: "Pallav" },
  //   { value: 3, label: "Nitesh" }
  // ];
  const [agendaTo, setAgendaTo] = useState('All Members');
  const [agendaDes, setAgendaDes] = useState('Description');
  const addAgenda = () => {
    const a = agenda;
    a.push({ assignedTo: agendaTo, description: agendaDes });
    setAgendaDes('');
    setAgendaTo('');
    setAgenda(a);
  }
  return (
    <Row >
    <Col md='8'>
      <Row>
        <Col md='8'>
        <InputGroup className="mt-3 mb-3">
        <Form.Control type='text' placeholder="Search Metting Group / Meeting / Department" />
        <Button variant='primary'>Search</Button>
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md='12'>
      <div style={{ marginTop: '10px' }}>
            <h3>Departments</h3>
            <div style={{ display: 'flex',marginTop:'10px' }}>
              {department && department.map((item) => {
                return <Link to={'/user/meetingGroup/department/' + item[1]}><div style={{ padding: '10px', background: 'blue', margin: '0px 10px', borderRadius: '5px', color: 'white' }}> {item[0]}</div></Link>
              })}
            </div>
          </div>
          </Col>
      </Row>
      <Row style={{marginBottom:'20px', marginTop:'20px'}}>
        <Col md='12'>
          <h2>Schedule</h2>
          <ToastCalendar
            curDate={curDate}
            setCurDate={setCurDate}
            UpdateUpcomingEventList={upcoming}
          />
      </Col>
      </Row>
      </Col>
      <Col  md='4' style={{padding:'10px'}}>
      <div style={{ width: '100%' }}>
            <Button onClick={handleShow}>Create New</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                Create New
              </Modal.Header>
              {loading1?
              <center>
              <CircleLoader/>
              </center>
            :  
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Select name="type" style={{ marginTop: '10px' }} value={actionType} onChange={(e) => setType(e.target.value)}>
                    <option value={1} >Create New Meeting Group</option>
                    <option value={2}>Create Ad hoc Meeting</option>
                    <option value={3}>Create New Meeting</option>
                  </Form.Select>
                  {/* {actionType == 1 ?
                  <Row style={{ marginTop: '10px' }}>
                    <Col md='10'>
                    <Form.Label>Schedule 1st Meeting Along With Meeting Group?</Form.Label>
                    </Col>
                    <Col md='2'>
                      <Form.Check checked={scheduleFirst} onChange={changeScheduleFirst} type='checkbox' />
                    </Col>
                  </Row>
                  : <></>} */}
                  <Form.Control style={{ marginTop: '10px' }} name="Name" placeholder={actionType != 3 ? "Name Of Meeting Group" : "Meeting Subject"} />
                  {(actionType == 3) ?
                    <Row style={{ justifyContent: 'space-around', marginTop: '10px' }} >
                      <Col md={6}>
                        {/* {actionType=='Ad hoc' || actionType=='' */}
                        {actionType == 3 ? <>Schedule of meet</> : <>Schedule of 1st meet</>}
                        {/* <>Schedule of Meet</>  */}
                        <Form.Control className='col-md-5' value={scheduledDate} name="scheduledDate" id="hi" placeholder="Schedule Time" onChange={changeScheduledDate} type="date" />
                      </Col>
                      <Col md={6}>
                        {actionType == 3 ? <>Time of meet</> : <>Time of 1st meet</>}
                        {/* <>Time of Meet</> */}
                        <Form.Control type='time' value={scheduledTime} onChange={changeScheduledTime} name="scheduledTime" className='col-md-5' />
                      </Col>
                    </Row>
                    :
                    <></>}
                  {/* <Form.Control style={{marginTop:'10px'}}  /> */}
                  {actionType != 3 ?
                    <>
                      <Row>
                        <Col>
                          <Form.Label style={{ marginTop: '10px', marginLeft: '20px' }}>Is Recurring</Form.Label>
                        </Col>
                        <Col>
                          <Form.Check name="isRecurring" type={'checkbox'} checked={recurring} onChange={(e) => setRecurring(!recurring)} style={{ margin: '10px 0px' }} />
                        </Col>
                      </Row>
                      {recurring ?
                        <Form.Control placeholder="Recurring Time" name="recurringTime" type="number" />
                        :
                        <></>
                      }
                    </>
                    :
                    <></>
                  }
                  {/* <Form.Select onChange={addParticipants} multiple='true' >
                  <option value={1}>Pallav</option>
                  <option value={2}>Ankit</option>
                  <option value={3}>Nitesh</option>
                </Form.Select> */}
                  {/* <DropdownMultiselect name='participants' placeholder='Participants' options={optionsArray}/> */}
                  {actionType != 3 ?
                    <>
                      <Select
                        className="mt-2"
                        name="groupMembers"
                        placeholder="Select Members"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // value={participantsList}
                        isMulti
                        onChange={changeParticipants}
                        options={optionsArray}
                      />
                      <Select
                        className="mt-2"
                        name="memberSecretary"
                        placeholder="Member Secretary"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        // value={participantsList}
                        // onChange={chnageMemberSecretary}
                        options={optionsArray}
                      />
                      <Select
                        className="mt-2"
                        name="relatedDepartmentId"
                        placeholder="Select Related Departments"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={changeRelatedDepartments}
                        options={depArr}
                      />
                    </>
                    :
                    <></>
                  }
                  {actionType == 3 ?
                    <>
                      <Select
                        className="mt-3"
                        name="groupId"
                        type='text'
                        placeholder="Select Meeting Group"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={meetingGroups}
                      />
                      <Select className='mt-3'
                        name="priority"
                        type='text'
                        placeholder={'Priority'}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={priorities}
                        value={priority}
                        onChange={(e) => setPriority(e)}
                      />
                      <table className='head mt-3' >
                        <thead>
                          <tr style={{ background: '#39CCCC', color: 'white' }}>
                            <th className='tb'>Assigned To</th>
                            <th className='tb'>Description</th>
                          </tr>
                        </thead>
                        <tr>
                          <th className="tb">
                            <Form.Control type='text' value={agendaTo} onChange={(e) => setAgendaTo(e.target.value)} />
                          </th>
                          <th className="tb">
                            <Form.Control type='text' value={agendaDes} onChange={(e) => setAgendaDes(e.target.value)} />
                          </th>
                        </tr>
                        {agenda.map((item) => {
                          return (
                            <tr>
                              <th className="tb">
                                {item.assignedTo}
                              </th>
                              <th className="tb">
                                {item.description}
                              </th>
                            </tr>
                          )
                        })}
                      </table>
                      <Button style={{ marginTop: '10px', background: '#39cccc', border: 'none' }} onClick={addAgenda}>
                        Add
                      </Button>
                    </>
                    :
                    <></>
                  }
                  <Row>
                    <Col md='4'>
                      <Button variant="primary" style={{ marginTop: '20px', backgroundColor: '#39cccc', border: 'none' }} type='submit' >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
          }
              
            </Modal>
          </div>
          <UpcomingEvents loading={loading} upcoming={upcoming} num={num} page={page} handleChange={handleChange} />
          </Col>
    </Row>
  );
}

export default CalenderPage;
