import React from "react";
import * as MS from "./MeetingStyled";

function Meeting({idx, meetingData, curMeetId, setcurMeetId}) {
  let start_date = new Date(meetingData.startDateTime).toLocaleDateString();
  let venue = meetingData.location;
  let title = meetingData.eventName;
  return (
    <MS.MeetingDiv
      highlight={idx === curMeetId}
      onClick={() => setcurMeetId(idx)}
    >
      <tr>
        <td>
          <MS.TimeSpan>{start_date}</MS.TimeSpan>
        </td>
        <td>
          <div>
            <span style={{color: "gray"}}>Title: </span>
            <span style={{color: "black"}}>{title}</span>
            <br />
            <span style={{color: "gray"}}>Venue: </span>
            <span style={{color: "black"}}>{venue}</span>
          </div>
        </td>
      </tr>
    </MS.MeetingDiv>
  );
}

function MeetingLists({filteredEvents, curMeetId, setcurMeetId}) {
  return (
    <div>
      <h3>Results</h3>
      <table style={{width: "100%"}}>
        <tbody>
          {filteredEvents?.searchEvents?.map((obj, idx) => (
            <Meeting
              key={idx}
              idx={idx}
              meetingData={obj}
              curMeetId={curMeetId}
              setcurMeetId={setcurMeetId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingLists;