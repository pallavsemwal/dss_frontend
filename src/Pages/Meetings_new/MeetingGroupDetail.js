import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBaseUrl } from '../../utils';
import { useEffect } from 'react';
import { Button } from '@bootstrap-styled/v4';
import { Col, Row } from 'react-bootstrap';
export const MeetingGroupDetail = () => {
    const param = useParams();
    // console.log(param);
    const [memberSecretary, setMemberSecreatry] = useState([]);
    const [pastMeetings, setMeetings] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [committeeName, setName] = useState('');
    const [doables, setDoables] = useState([]);
    useEffect(() => {
        console.log(localStorage);
        fetch(getBaseUrl() + "meeting/meetingGroupDetails?meetingGroupId=" + param.meetingGroupId, {
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
                console.log("Data:", data);
                setMeetings(data.pastMeetings);
                setGroupMembers(data.groupMembers);
                setMemberSecreatry(data.memberSecretary);
                setName(data.committeeName);
                setDoables(data.doables);
                //     setDepartment(data.departmentName);
                //   setMeetingGroup(data.meetingGroups);
                //   console.log(meetingGroup);    
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }, [])
    return (
        <div style={{ marginTop: '20px' }}>
            <Row style={{ justifyContent: 'space-between' }}>
                <Col md="5">
                    <h2>{committeeName && committeeName}
                    </h2>
                </Col >
                <Col md="5">
                    <Row>
                        <Col md="6">
                            <h4>{memberSecretary && memberSecretary}</h4>
                        </Col>
                        <Col md="6">
                            <Button>Edit Group</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <div>

                <Row>
                    <Col sm={'12'} md="5" style={{ marginLeft: '20px' }}>
                <p>Total Number of Meetings : {pastMeetings && pastMeetings.length}</p>
                        <table style={{
                            borderCollapse: 'collapse',
                            border: '2px solid rgb(200, 200, 200)',
                            letterSpacing: '1px',
                            fontFamily: 'sans-serif',
                            fontSize: '.8rem'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Date</th>
                                    {/* <th>Name</th> */}
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Subject</th>
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Action</th>
                                </tr>
                            </thead>
                            {pastMeetings &&
                                pastMeetings.map((meeting) => {
                                    return (
                                        <tr >
                                                <th style={{
                                                    border: '1px solid rgb(190, 190, 190)',
                                                    padding: '10px'
                                                }}>
                                                    <Link to={"/user/meetingDetail/"+meeting.meetingid} style={{ textDecoration: 'none', border: 'none', color: 'black' }}>
                                                    {meeting.meetingsubject}
                                            </Link>
                                                </th>
                                            <th style={{
                                                border: '1px solid rgb(190, 190, 190)',
                                                padding: '10px'
                                            }}>{meeting.scheduledtime}</th>
                                            <th style={{
                                                border: '1px solid rgb(190, 190, 190)',
                                                padding: '10px'
                                            }}>
                                                <Button size="sm"> Action</Button>
                                            </th>
                                        </tr>)
                                })
                            }
                        </table>
                    </Col>
                    <Col md={'6'} style={{ margin: '20px'}}>
                <p>Total Number of Doables : {pastMeetings && pastMeetings.length}</p>

                        <table style={{
                            borderCollapse: 'collapse',
                            border: '2px solid rgb(200, 200, 200)',
                            letterSpacing: '1px',
                            fontFamily: 'sans-serif',
                            fontSize: '.8rem'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Name</th>
                                    {/* <th>Name</th> */}
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Doable Assigned</th>
                                    <th style={{
                                        border: '1px solid rgb(190, 190, 190)',
                                        padding: '10px'
                                    }}>Doables Completed</th>
                                </tr>
                            </thead>
                            {groupMembers &&
                                groupMembers.map((member) => {
                                    // console.log(member.id);
                                    // console.log(doables[0]);
                                    const doable = doables.find(item => item.assignedto == member.id)
                                    // console.log(doable);
                                    let name = "";
                                    if (member.first_name) {
                                        name += member.first_name;
                                    }
                                    name += " "
                                    if (member.last_name) {
                                        name += member.last_name;
                                    }
                                    return <tr>
                                        <th style={{
                                            border: '1px solid rgb(190, 190, 190)',
                                            padding: '10px'
                                        }}
                                        ><span>{name && name}</span></th>
                                        <th style={{
                                            border: '1px solid rgb(190, 190, 190)',
                                            padding: '10px'
                                        }}>
                                            {doable != null ?
                                                doable.totaldoable : 0}
                                        </th>
                                        <th style={{
                                            border: '1px solid rgb(190, 190, 190)',
                                            padding: '10px'
                                        }}>
                                            {doable != null ? doable.completeddoable : 0
                                            }
                                        </th>
                                    </tr>
                                })
                            }
                        </table>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
