import React from "react";
import CalamityCreate from "./Calamity";
import CalamityView from "./View";
import CalamityClose from "./Close";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CalamityLesson from "./Lesson";

function Rally() {
  return (
    <Router>
      <Route exact path="/user/calamity/create" component={CalamityCreate} />
      <Route exact path="/user/calamity/view/:id" component={CalamityView} />
      <Route exact path="/user/calamity/lesson/:id" component={CalamityLesson} />
      <Route exact path="/user/calamity/close/:id" component={CalamityClose} />
    </Router>
  );
}
export default Rally;