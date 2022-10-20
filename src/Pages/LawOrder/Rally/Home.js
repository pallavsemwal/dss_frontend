import React from "react";
import RallyCreate from "./Create";
import RallyView from "./View";
import RallyClose from './Close'
import RallyView_lesson from "./Lesson";
import { BrowserRouter as Router, Route } from "react-router-dom";

function Rally() {
  return (
    <Router>
      <Route exact path="/user/rally/create" component={RallyCreate} />
      <Route exact path="/user/rally/view/:id" component={RallyView} />
      <Route exact path="/user/rally/lesson/:id" component={RallyView_lesson} />
      <Route exact path="/user/rally/close/:id" component={RallyClose} />
    </Router>
  );
}
export default Rally;