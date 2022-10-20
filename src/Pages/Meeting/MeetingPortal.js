import React, {useState} from "react";
import MeetingPresenter from "./Meeting";
import SearchEvent from "./SearchEvent";

function MeetingPortal() {
  const [filteredEvents, setFilteredEvents] = useState({});
  return (
    <div>
      <h2>Search</h2>
      <SearchEvent setFilteredEvents={setFilteredEvents} />
      <MeetingPresenter filteredEvents={filteredEvents} />
    </div>
  );
}

export default MeetingPortal;
