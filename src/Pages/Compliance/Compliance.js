import React, { useEffect, useState } from 'react'
import { getBaseUrl } from '../../utils';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ComplianceDetail } from './ComplianceDetail';
import { Modal } from 'react-bootstrap';
import { CreateCompliance } from './CreateCompliance';
export const Compliance = () => {
    const [assignedTo, setAssignedTo] = useState([]);
    const [assignedBy, setAssignedBy] = useState([]);
    const [show, setShow] = useState(0);
    const [doableId, setDoableId] = useState();
    const [doableSubject, setDoableSubject] = useState();
    const [doableType, setDoableType] = useState();
    const [deadline, setDoableDeadline] = useState();
    const [selected, setSelected] = useState(-1);
    const [selected1, setSelected1] = useState(-1);
    const [showModal, setShowModal] = useState(0);
    const handleClose = () => setShowModal(0);
    const handleShow = () => setShowModal(1);
    useEffect(() => {
        fetch(getBaseUrl() + "doable/getAllCompliance", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "JWT " + localStorage.getItem('token')
            }
        }).then((data) => {
            return data.json();
        })
            .then((data) => {
                setAssignedBy(data.assignedBy)
                setAssignedTo(data.assignedTo)

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const showCompliance = (item, index, num) => {
        if (selected == index) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (selected1 == index) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (num == 1) {
            setSelected(-1);
            setSelected1(index);
        }
        else {
            setSelected1(-1);
            setSelected(index);
        }
        setDoableId(item.doableId);
        setDoableSubject(item.subject);
        setDoableType(item.doableType);
        setDoableDeadline(item.deadline);
        console.log(item);
        setShow(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                <div><h2>Compliance</h2></div>
                <Button onClick={handleShow} style={{ width: '200px', backgroundColor: '#39cccc', border: 'none' }}> Assign Doable </Button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateCompliance/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {show ?

                <ComplianceDetail doableId={doableId} setSelected1={setSelected1} setSelected={setSelected} deadline={deadline} setShow={setShow} doableSubject={doableSubject} doableType={doableType} />
                :
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h3>Total Doables Assigned By You: {assignedBy.length}</h3>
                    <h3>Total Doables Assigned To You: {assignedTo.length}</h3>
                </div>
            }
            <Row>
                <Col lg="6" style={{ padding: '0px 10px' }}>
                    <table className='head'>
                        <thead>
                            <tr style={{ background: '#39CCCC', color: 'white' }}>
                                <th className='tb'>S.No</th>
                                <th className='tb'>subject</th>
                                <th className='tb'>Assigned To</th>
                                <th className='tb'>Deadline</th>
                                <th className='tb'>Status</th>
                                <th className='tb'>View</th>
                                {/* <th className='tb'> Status</th> */}
                                {/* <th style={{
                  border: '1px solid #F4F4F4',
                  padding: '10px'
                }}>Misc</th> */}
                            </tr>
                        </thead>
                        {assignedBy && assignedBy.map((item, index) => {
                            let bgColor = '';
                            let textColor = '';
                            if (index == selected) {
                                bgColor = '#076391';
                                textColor = 'white';
                            }
                            else {
                                bgColor = 'white';
                                textColor = 'black';
                            }
                            // console.log(bgColor);
                            return (
                                <>
                                    <tr style={{ background: bgColor, color: textColor }} >
                                        <th className='tb'>{index}</th>
                                        <th className='tb'>
                                            {item.subject}
                                        </th>
                                        <th className='tb'>{item.first_name + " " + item.last_name}</th>
                                        <th className='tb'>{moment(item.deadline, "YYYY-MM-DD").format('ll')}</th>
                                        <th className='tb'>{item.completed ? <>Completed</> : <>Not Completed</>}</th>
                                        <th className='tb'>
                                            <Button onClick={(e) => showCompliance(item, index, 0)} size='sm' style={{ background: '#39CCCC', border: 'none' }}>View</Button>
                                        </th>

                                    </tr>

                                </>)
                        })}
                    </table>
                </Col>
                <Col lg="6" style={{ padding: '0px 10px' }}>
                    <table className='head'>
                        <thead>
                            <tr style={{ background: '#39CCCC', color: 'white' }}>
                                <th className='tb'>S.No</th>
                                <th className='tb'>subject</th>
                                <th className='tb'>Assigned By</th>
                                <th className='tb'>Deadline</th>
                                <th className='tb'>Status</th>
                                <th className='tb'>View</th>
                                {/* <th className='tb'> Status</th> */}
                                {/* <th style={{
                  border: '1px solid #F4F4F4',
                  padding: '10px'
                }}>Misc</th> */}
                            </tr>
                        </thead>
                        {assignedTo.map((item, index) => {
                            let bgColor = '';
                            let textColor = '';
                            if (index == selected1) {
                                bgColor = '#076391';
                                textColor = 'white';
                            }
                            else {
                                bgColor = 'white';
                                textColor = 'black';
                            }
                            return (
                                <>
                                    <tr style={{ background: bgColor, color: textColor }}>
                                        <th className='tb'>{index}</th>
                                        <th className='tb'>
                                            <Link to={'/user/complianceDetail/' + item.doableId} style={{ color: 'black', textDecoration: 'none' }}>
                                                {item.subject}
                                            </Link>
                                        </th>
                                        <th className='tb'>{item.first_name + " " + item.last_name}</th>
                                        <th className='tb'>{moment(item.deadline, "YYYY-MM-DD").format('ll')}</th>
                                        <th className='tb'>{item.completed ? <>Completed</> : <>Not Completed</>}</th>
                                        <th className='tb'>
                                            <Button onClick={(e) => showCompliance(item, index, 1)} size='sm' style={{ background: '#39CCCC', border: 'none' }}>View</Button>
                                        </th>
                                    </tr>
                                </>)
                        })}
                    </table>
                </Col>
            </Row>
        </div>
    )
}
