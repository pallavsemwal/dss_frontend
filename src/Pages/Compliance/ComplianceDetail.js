import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBaseUrl } from '../../utils';
import { Row, Col, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import moment from 'moment-timezone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

export const ComplianceDetail = (props) => {
    // console.log(props);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(getBaseUrl() + "doable/getComplianceDetail?doableId=" + props.doableId, {
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
                setMessages(data);
                // setAssignedBy(data.assignedBy);
                // setAssignedTo(data.assignedTo);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [props]);
    const closeDetail = (e) => {
        // console.log(props);
        props.setShow(0);
        props.setSelected(-1);
        props.setSelected1(-1);
    }
    return (
        <div style={{boxShadow: '0px 3px 6px 4px #bbb', margin: '10px 0px'}}>
            <div style={{ justifyContent: 'space-between',background:'#49c9ba', color:'white',padding:'10px', display: 'flex' }}>
                <span>Doable Detail</span>
                <div><CloseButton variant='white' onClick={(e) => closeDetail(e)} /></div>
            </div>
        <div style={{  padding: '20px' }}>
            <Row>
                <Col md='3'>Compliance Type:</Col>
                <Col>{props.doableType}</Col>
            </Row>
            <Row>
                <Col md='3'> Compliance Subject:</Col>
                <Col>{props.doableSubject}</Col>
            </Row>
            <Row>
                <Col md='3'> Compliance Deadline:</Col>
                <Col>{moment(props.deadline, "YYYY-MM-DD").format('ll')}</Col>
            </Row>
            <table className='head mt-4'>
                <thead>
                    <tr style={{ background: '#39CCCC', color: 'white' }}>
                        <th className='tb'>S.No</th>
                        <th className='tb'>Sent By</th>
                        <th className='tb'>Recieved By</th>
                        <th className='tb'>Sent Date</th>
                        <th className='tb'>Message</th>
                        <th className='tb'>Attatchment</th>
                        {/* <th className='tb'> Status</th> */}
                        {/* <th style={{
                  border: '1px solid #F4F4F4',
                  padding: '10px'
                }}>Misc</th> */}
                    </tr>
                    {messages && messages.map((item, index) => {
                        return (
                            <tr>
                                <th className='tb'>S.No</th>
                                <th className='tb'>{item.sender_first_name+" "+item.sender_last_name}</th>
                                <th className='tb'>{item.receiver_first_name+" "+item.receiver_last_name}</th>
                                <th className='tb'>{moment(props.deadline, "YYYY-MM-DD").format('ll')}</th>
                                <th className='tb'>{item.messageContent}</th>
                                <th className='tb'>0 <AttachEmailIcon/></th>

                            </tr>
                        )
                    })}
                </thead>
            </table>
            <Row >
                <Button size='sm' style={{width:'200px', margin:'10px 20px',  background:'#39CCCC', border:'none'}}>
                    Forward Message
                </Button>
                <Button size='sm' style={{width:'200px', margin:'10px 20px',  background:'#39CCCC', border:'none'}}>
                    Conclude Compliance
                </Button>
            </Row>

        </div>
        </div>
    )
}
