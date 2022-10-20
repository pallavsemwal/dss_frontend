import React, {useState, useEffect} from "react";
import RichTextEditor from "../../Commons/Editor";
import {getBaseUrl} from "../../utils";
import * as MS from "./MeetingStyled";

const notesInitialValue = [
  {
    type: "paragraph",
    children: [{text: "Make your notes here!", italic: true}],
  },
];

const handleDownload = async (file_name) => {
  let token = localStorage.getItem('token')
  fetch(getBaseUrl()+'media/'+file_name, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`
    },
  }).then((res) => {
    if(res.status === 200) {
      res.blob().then((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
    } else throw 'Error'
  }).catch((e) => {
      alert("File Cannot Be Downloaded.")
  })
}

function MeetingBrief({eventDetails}) {
  const [notes, setNotes] = useState(notesInitialValue);
  let start_time = new Date(eventDetails.startDateTime).toLocaleString();
  let end_time = new Date(eventDetails.endDateTime).toLocaleString();
  let title = eventDetails.eventName;
  let venue = eventDetails.location;
  let tags = eventDetails.tags;
  let priority = eventDetails.priority;

  useEffect(() => {
    if (eventDetails.mom !== null) {
      setNotes(JSON.parse(eventDetails.mom));
    } else {
      setNotes(notesInitialValue);
    }
  }, [eventDetails]);

  return (
    <div>
      <MS.BriefDiv>
        <h2>{title}</h2>
        <table style={{width: '100%'}}>
          <tbody>
            <tr>
              <MS.LTD> Venue </MS.LTD>
              <MS.RTD> {venue} </MS.RTD>
              <MS.LTD> Priority</MS.LTD>
              <MS.RTD> {priority} </MS.RTD>
            </tr>
            <tr> 
              <MS.LTD> Start Date</MS.LTD>
              <MS.RTD> {start_time.slice(0,10)} </MS.RTD>
              <MS.LTD> Start Time</MS.LTD>
              <MS.RTD> {start_time.slice(12,17)} </MS.RTD>
            </tr>
            <tr>
              <MS.LTD> End Date</MS.LTD>
              <MS.RTD> {end_time.slice(0,10)} </MS.RTD>
              <MS.LTD> End Time</MS.LTD>
              <MS.RTD> {end_time.slice(12,17)} </MS.RTD>
            </tr>
            <tr>
              <MS.LTD> Tags</MS.LTD>
              <MS.RTD>{tags.map((obj, idx) => 
                <span>{obj.name}</span>
              )}</MS.RTD>
            </tr>
          </tbody>
        </table>

        <h4>Attachment</h4>
        <div>
          {eventDetails?.files?.length === 0 && (
            <i style={{color: 'gray', fontSize: '0.8em'}}> No Attachments </i>
          )}
          {eventDetails.files.map((file, idx) => {
            const file_name_split = file.file.split("/");
            const file_name = file_name_split[file_name_split.length - 1];
            return <MS.StyledAnchor key={idx} onClick={() => handleDownload(file_name)}>{file_name}</MS.StyledAnchor>
          })}
        </div>
        <h4>Notes</h4>
        <MS.TextEditorDiv>
          <RichTextEditor value={notes} setValue={setNotes} />
        </MS.TextEditorDiv>
      </MS.BriefDiv>
    </div>
  );
}

export default MeetingBrief;
