import React from 'react';
import { getBaseUrl } from '../../utils';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { Row, Col } from 'react-bootstrap';
import './MeetingGroupDetail'
export const MeetingGroupDepartment = () => {
    const [meetingGroup, setMeetingGroup]= useState([]);
    const [departmentName, setDepartment ] = useState('');
    const param= useParams();
    console.log(param);
    useEffect(() => {
        console.log(localStorage);
        fetch(getBaseUrl() + "meeting/allMeetingGroup?departmentId="+param.departmentId, {
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
            setDepartment(data.departmentName);
          setMeetingGroup(data.meetingGroups);
          console.log(meetingGroup);    
        })
        .catch((err)=>{
          console.log(err);
        }); 
      },[])
  return (
    <div>
            {departmentName && departmentName}
        <Row>
        {meetingGroup && meetingGroup.map((item)=>{
            return <>
            
            <Col md='3'>
              <Link to={'/user/meetingGroupDetails/'+item.groupId}>
              <div style={{width:'100%', height:'150px', backgroundColor:'#F9F9F9', borderRadius:'10px',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', padding:'10px 12px'}}>
              <p>{item.committeeName}</p>
              {item.memberSecretary_id}

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
