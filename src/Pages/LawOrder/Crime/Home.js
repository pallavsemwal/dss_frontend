import React from "react";
import CrimeCreate from "./Crime";
import CrimeView from "./View";
import CrimeClose from './Close'
import { BrowserRouter as Router, Route } from "react-router-dom";
import CrimeLesson from "./Lesson";

function Crime() {
  return (
    <Router>
      <Route exact path="/user/crime/create" component={CrimeCreate} />
      <Route exact path="/user/crime/view/:id" component={CrimeView} />
      <Route exact path="/user/crime/lesson/:id" component={CrimeLesson} />
      <Route exact path="/user/crime/close/:id" component={CrimeClose} />
    </Router>
  );
}
export default Crime;