import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getBaseUrl } from '../../utils';
export const Meetings = () => {
  const params= useParams();
  useEffect(() => {
    console.log(localStorage);
    fetch(getBaseUrl() + "meeting/meetingDetail?meetingId="+ params.meetingId , {
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
    },[]);
  return (
    <div>MeetingDetail</div>
  )
}
