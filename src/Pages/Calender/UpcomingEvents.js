import React, { useState, useEffect } from "react";
import { GET_UPCOMING_EVENTS } from "./Events/EventQueries";
import moment from "moment-timezone";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { HeaderDiv } from "./CalenderStyled";
import { parsePriorityColor } from "./Constants";
import FlagIcon from "@material-ui/icons/Flag";
import { Row, Col } from "@bootstrap-styled/v4";
import { getBaseUrl } from "../../utils";
import {Link} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
const EventsListDiv = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #f2f2f2;
  width: auto;
  padding: 2px 4px;
`;

const EventDiv = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 4px;
  padding: 4px 8px;
  line-height: 1.2em;
  font-size: 1.2em;
  border-left: 6px ${(props) => parsePriorityColor(props.priority)} solid;
  background-color: white;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
`;

const Events = ({ details }) => {
  let { EventDate, Venue, Title, Priority } = details;
  return (
    <EventDiv priority={Priority}>
      <div style={{width : "10%", height : "2em", top: "0", left : "0"}}>
      <FlagIcon style={{ color: parsePriorityColor(Priority) }} />{" "}
      </div> 
      <div style={{width : "90%", height: "2em", top: "0", right: "0"}}>
      {" "}{Title} {" "}
      </div>
        <div style={{width: "100%", bottom: "0"}}>
        <span style={{ color: "gray", fontSize: "0.9em" }}>
        {EventDate},{" "}{Venue}
        </span>
        </div>
    </EventDiv>
  );
};

export default function UpcomingEvents() {
  // const { data } = useQuery(GET_UPCOMING_EVENTS, {
  //   variables: {
  //     curtime: moment().utc().format(),
  //   },
  //   pollInterval: 60000,
  // });
  
  const [upcoming, setUpcoming]= useState([]);
  const [events, setEvents] = useState([]);
  const [num , setNum]= useState(1);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading]= useState(1);
  const handleChange = (event, value) => {
    setLoading(1);
    setPage(value);
    fetch(getBaseUrl() + "meeting/upcomingMeetings?limit=5&page1="+value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"JWT "+ localStorage.getItem('token')
      }
    }).then((data)=>{
      // console.log(data);
      // console.log(data.result);
      return data.json();
    })
    .then((data)=>{
      setLoading(0);
      setUpcoming(data.content);
      setNum(data.num_pages);
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  };
  useEffect(() => {
    // console.log(localStorage);
    fetch(getBaseUrl() + "meeting/upcomingMeetings?page1=2&limit=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"JWT "+ localStorage.getItem('token')
      }
    }).then((data)=>{
      // console.log(data);
      // console.log(data.result);
      return data.json();
    })
    .then((data)=>{
      setLoading(0);
      setUpcoming(data.content);
      setNum(data.num_pages);
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    }); 
  },[])
  // Use Effect For Fetch
  // useEffect(() => {
  //   const parsedData = data?.eventsUpcoming?.map((obj, ind) => {
  //     return {
  //       Title: obj.eventName,
  //       Venue: obj.location,
  //       EventDate: moment(obj.startDateTime).format("DD/MM/YY - HH:mm"),
  //       Priority: obj.priority,
  //     };
  //   });

  //   if (parsedData !== undefined) {
  //     setEvents(parsedData);
  //   }
  // }, [data]);

  return (
    <div>
      {/* <HeaderDiv> Upcoming Events </HeaderDiv> */}
      <h3>Upcoming Events</h3>
      {/* {events?.length > 0 ? (
        <div>
          {events.map((obj, idx) => (
            <Events details={obj} key={idx} />
          ))}
        </div>
      ) : (
        <span style={{ padding: "8px", textAlign: "center" }}>
          0 Result Found
        </span>
      )} */}
      {loading?
      <>
    <Skeleton variant="rectangular" style={{ marginTop:'10px', borderRadius:'5px', width:'100%', height:'110px'}}  />
    <Skeleton variant="rectangular" style={{ marginTop:'10px', borderRadius:'5px', width:'100%', height:'110px'}}  />
    <Skeleton variant="rectangular" style={{ marginTop:'10px', borderRadius:'5px', width:'100%', height:'110px'}}  />
    <Skeleton variant="rectangular" style={{ marginTop:'10px', borderRadius:'5px', width:'100%', height:'110px'}}  />
    <Skeleton variant="rectangular" style={{ marginTop:'10px', borderRadius:'5px', width:'100%', height:'110px'}}  />
    </>
    :  
    <></>
    }
      {upcoming.map((item)=>{
        // console.log(item.meetingid);
        if(loading==0){

          return (<Link style={{textDecoration:'none', color:'white'}} to={'/user/meetingDetail/'+item.meetingId+"?groupId="+item.groupId}><div style={{background:'#39ccdd',padding:'4px',marginTop:'10px', borderRadius:'5px'}}>
          <h4>{item.committeeName} </h4>
          <h5>{item.meetingSubject} </h5>
          <h5>{moment(item.scheduledTime).format("ll")}</h5>
        </div></Link>);
        }
        // committeename: 'testing', meetingsubject: 'Job lagwa do', scheduledtime: '2022-11-04T18:58:14'
      })}
      <Pagination style={{marginTop:'20px'}} count={num} page={page} onChange={handleChange} />
    </div>
  );
}
