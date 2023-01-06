import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBaseUrl } from '../../utils';
import { useEffect } from 'react';
import { Button } from '@bootstrap-styled/v4';
import { Col, Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
export const MeetingGroupDetail = () => {
    const param = useParams();
    // console.log(param);
    const series = [76, 67, 61];
    const options = {
        chart: {
            height: 120,
            type: 'donut',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 0,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: true,
                    },
                    value: {
                        show: false,
                    }
                }
            }
        },
        colors: ['#d9534f', '#daa520', '#9acd32'],
        labels: ['High', 'Medium', 'Low'],
        legend: {
            show: true,
            floating: true,
            fontSize: '11px',
            position: 'left',
            offsetX: -30,
            offsetY: -10,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 1
            },
            formatter: (seriesName, opts) => {
                return seriesName
            },
            itemMargin: {
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    };
    const pSeries = [{
        name: 'Remaining',
        data: [44, 55, 18]
      }, {
        name: 'Done',
        data: [53, 32, 12]
      },];
    const pOptions={
        chart: {
          type: 'bar',
          height: 100,
          stacked: true,
          stackType: '100%'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff', '#ddd']
        },
        xaxis: {
          categories: ['Low', 'Medium' , 'High'],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K"
            }
          }
        },
        fill: {
          opacity: 1
        
        }
        ,
        legend: {
            show:false,
          position: 'right',
          horizontalAlign: 'left',
          offsetX: -10
        }
    };
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
                    <h2> Committee Name: {committeeName && committeeName}
                    </h2>
                </Col >
                <Col md="5">
                    <Row>
                        <Col md="6" style={{marginTop:'10px'}}>
                            <span style={{fontFamily:'Roboto', fontSize:'20px', fontWeight:'400'}}>Member Secretary:</span>
                            <span style={{fontFamily:'Roboto', fontSize:'20px', fontWeight:'600'}}>{memberSecretary && memberSecretary}</span>
                        </Col>
                        <Col md="6">
                            <Button>Edit Group</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Row style={{ padding: '10px 40px', justifyContent: 'space-around' }} >
                <Col md='3' >
                    <div style={{ width: '100%', height: '250px', padding: '10px', borderRadius: '10px', color: "black", boxShadow: '1px 1px 4px 3px #d1d1d1' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>    {doables[0] && doables[0].totaldoable} Doables Assigned</span>
                    <ReactApexChart options={pOptions} series={pSeries} type="bar" height={150} style={{width:'90%', marginTop:'0px'}} />
                    </div>
                </Col>
                <Col md='3'>
                    <div style={{ width: '100%', height: '250px', padding: '10px', borderRadius: '10px', color: "black", boxShadow: '1px 1px 4px 3px #d1d1d1' }}>
                        {/* {doables && doables[0].totaldoable} */}
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>{pastMeetings.length} Meetings Done</span>
                        <ReactApexChart options={options} series={series} type="donut" height={180}  style={{ marginTop: '0px' }} />

                    </div>
                </Col>
                <Col md='3'>
                    <div style={{ width: '100%', height: '250px', padding: '10px', borderRadius: '10px', color: "black", boxShadow: '1px 1px 4px 3px #d1d1d1' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{pastMeetings.length} Meetings Done</span>
                        <ReactApexChart options={options} series={series} type="donut" height={180}  style={{ marginTop: '0px' }} />
                    </div>
                </Col>
                <Col md='3'>
                    <div style={{ width: '100%', height: '250px', padding: '10px', borderRadius: '10px', color: "black", boxShadow: '1px 1px 4px 3px #d1d1d1' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{pastMeetings.length} Meetings Done</span>
                        <ReactApexChart options={options} series={series} type="donut" height={180}  style={{ marginTop: '0px' }} />
                    </div>
                </Col>
            </Row>

            <Row style={{ padding: ' 0px 40px' }}>
                <Col sm={'12'} md="4" style={{ margin: '20px 0px', padding: '0px' }}>

                    <table className='head' style={{ width: '100%' }}>
                        <thead className='head'>
                            <tr style={{ background: '#3f51b5', color: 'white' }}>
                                <th className='tb' colSpan={3} style={{ verticalAlign: 'center', textAlign: 'center', padding: '6px 0px', fontSize: '16px' }}  >Meetings
                                </th>
                            </tr>
                        </thead>
                        {pastMeetings &&
                            pastMeetings.map((meeting) => {
                                return (
                                    <tr >
                                        <th className='tb'>
                                            <Link to={"/user/meetingDetail/" + meeting.meetingid} style={{ textDecoration: 'none', border: 'none', color: 'black' }}>
                                                {meeting.meetingsubject}
                                            </Link>
                                        </th>
                                        <th className='tb'
                                        >{meeting.scheduledtime}</th>
                                        <th className='tb'
                                        >
                                            <Button size="sm"> Action</Button>
                                        </th>
                                    </tr>)
                            })
                        }
                    </table>
                </Col>
                <Col md={'4'} style={{ margin: '20px 0px' }}>
                    {/* <p>Total Number of Doables : {pastMeetings && pastMeetings.length}</p> */}

                    <table className='head' style={{ width: '100%' }} >
                        <thead className='head'>
                            <tr style={{ background: '#3f51b5', color: 'white' }}>
                                <th className='tb' colSpan={3} style={{ verticalAlign: 'center', textAlign: 'center', padding: '6px 0px', fontSize: '16px' }}  > Doables </th>
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
                                    <th className='tb' style={{ width: '40%' }}
                                    ><span>{name && name}</span></th>
                                    <th className='tb'>
                                        {doable != null ?
                                            doable.totaldoable : 0}
                                    </th>
                                    <th className='tb'>
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
    )
}
