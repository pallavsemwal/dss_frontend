import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EpidemicCreate from "./Epidemic";
import EpidemicView from "./View";
import EpidemicClose from "./Close";
import EpidemicLesson from "./Lesson";

function Epidemic() {
  return (
    <Router>
      <Route exact path="/user/epidemic/create" component={EpidemicCreate} />
      <Route exact path="/user/epidemic/view/:id" component={EpidemicView} />
      <Route exact path="/user/epidemic/lesson/:id" component={EpidemicLesson} />
      <Route exact path="/user/epidemic/close/:id" component={EpidemicClose} />
    </Router>
  );
}
export default Epidemic;