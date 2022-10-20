import React from "react";
import GatheringCreate from "./Gathering";
import GatheringView from "./View";
import GatheringClose from "./Close";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GatheringLesson from "./Lesson";

function Gathering() {
  return (
    <Router>
      <Route exact path="/user/gathering/create" component={GatheringCreate} />
      <Route exact path="/user/gathering/view/:id" component={GatheringView} />
      <Route exact path="/user/gathering/lesson/:id" component={GatheringLesson} />
      <Route exact path="/user/gathering/close/:id" component={GatheringClose} />
    </Router>
  );
}
export default Gathering;