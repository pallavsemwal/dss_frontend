import React, { useState, useEffect } from "react";
import * as CS from "../Calender/CalenderStyled";
import Calender from "../Calender/Calender";
import moment from "moment-timezone";
import UpcomingEvents from "../Calender/UpcomingEvents";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GET_TOP_SCHEMES_FOR_USER } from "../Schemes/SchemeQueries";
import IndividualSchemeDesign from "../Schemes/IndividualScheme";
import { useQuery } from "@apollo/react-hooks";
import LoadingComponent from "../LoadingPage/LoadingComponent";

import MeetingImage from "../Images/Meetings.png"
import FilesImage from "../Images/FilesIO.png"
import LawOrderImage from "../Images/Law.png"
import MailImage from "../Images/Mails.png"
import SchemesImage from "../Images/schemes_n.jpg"
import { getBaseUrl } from "../../utils";

const ActivityGridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  text-align: center;
  width:80%;
`;

const ActivityCardDiv = styled(Link)`
  margin: 4px;
  width: 220px;
  margin:15px;
  min-width: 150px;
  align-self: stretch;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-decoration: none;
  color: #000;
  &:hover {
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 1200px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    width: 160px;
  }
`;

function ActivityCard({ imgName, name, link }) {
  return (
    <ActivityCardDiv to={link}>
      <img
        alt="activity_image"
        src={imgName}
        style={{ width: "100%" }}
      />
      <h3 style={{ margin: "5px 0px 10px 0px" }}>{name}</h3>
    </ActivityCardDiv>
  );
}

function Integrated() {
  
  const [curDate, setCurDate] = useState(moment());
  const { loading, error, data } = useQuery(GET_TOP_SCHEMES_FOR_USER);
  const [loadingD, setLoading] = useState(1);
  const [upcoming, setUpcoming] = useState([]);
  const [num, setNum] = useState(1);
  const [page, setPage] = React.useState(1);
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
  }, []);
  if (loading) return <LoadingComponent />;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  if (data === undefined) return <p>Waiting...</p>;
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
  

  return (
    <CS.TotalPageDiv>
      <CS.MiddlePageDiv>
        <h2>Activities</h2>
        <ActivityGridDiv>
          <ActivityCard
            link="/user/schedule"
            imgName={MeetingImage}
            name="Manage Meetings"
          />
          <ActivityCard
            link="/user/schemes"
            imgName={SchemesImage}
            name="Schemes"
          />
          <ActivityCard
            link="/user/laworder"
            imgName={LawOrderImage}
            name="Law & Order"
          />
          <ActivityCard
            link="/user/blank"
            imgName={FilesImage}
            name="Files I/O"
          />

          <ActivityCard
            link="/user/blank"
            imgName={MailImage}
            name="Mails/Grievances"
          />
          {/* {data.topSchemes.map((obj, idx) => (
            <ActivityCardDiv key={idx}>
              <IndividualSchemeDesign details={obj} />
            </ActivityCardDiv>
          ))} */}
        </ActivityGridDiv>
      </CS.MiddlePageDiv>
      <CS.CalenderPane>
        <Calender curDate={curDate} setCurDate={setCurDate} />
        <br />
        <UpcomingEvents loading={loadingD} upcoming={upcoming} num={num} page={page} handleChange={handleChange} />
      </CS.CalenderPane>
    </CS.TotalPageDiv>
  );
}

export default Integrated;