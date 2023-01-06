import React from 'react';
import { getBaseUrl } from '../../utils';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { Row, Col } from 'react-bootstrap';
import './MeetingGroupDetail'
export const MeetingGroupDepartment = () => {
  const [meetingGroup, setMeetingGroup] = useState([]);
  const [departmentName, setDepartment] = useState('');
  const [c, setC]= useState('');
  const [t, setT]= useState(1);
  const [b, setB]= useState(1);
  const param = useParams();
  console.log(param);
  useEffect(() => {
    console.log(localStorage);
    fetch(getBaseUrl() + "meeting/allMeetingGroup?departmentId=" + param.departmentId, {
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
        setDepartment(data.departmentName);
        setMeetingGroup(data.meetingGroups);
        console.log(meetingGroup);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  return (
    <div>
      <span style={{ fontSize: '2.4em' }}>{departmentName && departmentName}</span>
      <Row>
        {meetingGroup && meetingGroup.map((item) => {
          const val=['#009E4C', '#37AC47', '#87BC3C' ,'#C0D028','#C2B300', '#BC812F', '#B85B2D', '#B85B2D','#dc3545','rgb(190, 0, 0)' ]
          let color=""
          let total=0;
          let completed=0;
          // fetch(getBaseUrl() + "meeting/doableCount?groupId=" + item.groupId, {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Authorization": "JWT " + localStorage.getItem('token'),
          //   }
          // }).then((data) => {
          //   //   console.log(data.json());
          //   return data.json();
          // })
          // .then((data) => {
          //   console.log(data);
          //   completed=data[0].completedtotaldoable;
          //   total=data[0].totaldoable;
          //   color=val[9-Math.floor((completed/total)*10)];
          //   color=color+' solid 30px';
          //   setT(total);
          //   setB(completed);
          //   setC(color);
          // })
          // .catch((err) => {
          //   console.log(err);
          // });
          total=Math.floor(Math.random()*15);
          completed=Math.floor(Math.random()*total);
          console.log(Math.floor(completed/total)*9)
          color=val[9-Math.floor(completed/total*9)]+" solid 30px";
          return <>

            <Col md='3' style={{ margin: '10px 0px' }}>
              <Link style={{ textDecoration: 'none', fontFamily: 'Roboto' }} to={'/user/meetingGroupDetails/' + item.groupId}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#F9F9F9',
                  color: 'black',
                  borderRadius: '10px',
                  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                  padding: '10px 12px',
                  borderBottom: color
                }}>
                  <h4>{item.committeeName}</h4>
                  <span >Member Secretary:</span> <span style={{ fontWeight: '600', fontSize: '17px' }}> {item.first_name + " " + item.last_name}</span>
                  {item.isRecurring ? <p>Meeting : Every {item.recurringTime} days </p> : <></>}
                  <p>Total Number Of Doables: {total}</p>
                  <p>Total Number Of Completed Doables: {completed}</p>

                </div>
              </Link>
            </Col>
          </>
        })
        }
      </Row>
    </div>
  )
}
