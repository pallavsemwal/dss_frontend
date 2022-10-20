import React, {useState} from "react";
import {Row, Col} from "@bootstrap-styled/v4";
import MeetingBrief from './MeetingBrief'
import MeetingLists from './MeetingList'
import * as MS from "./MeetingStyled";

function MeetingsPresenter({filteredEvents}) {
  const [curMeetId, setcurMeetId] = useState(0);
  if (filteredEvents?.searchEvents !== undefined) {
    if (filteredEvents?.searchEvents?.length > 0) {
      return (
        <MS.MeetingContainer>
          <Row>
            <Col>
              <MeetingLists
                filteredEvents={filteredEvents}
                curMeetId={curMeetId}
                setcurMeetId={setcurMeetId}
              />
            </Col>
            <Col>
              <MeetingBrief
                eventDetails={filteredEvents?.searchEvents[curMeetId]}
              />
            </Col>
          </Row>
        </MS.MeetingContainer>
      );
    } else {
      return <h3>No Results Found</h3>;
    }
  } else {
    return null;
  }
}

export default MeetingsPresenter;
