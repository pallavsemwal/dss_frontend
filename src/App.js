import React from "react";
import Welcome from "./Pages/Welcome/Welcome";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import NotFound from "./Pages/NotFound/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./ApolloClient";
import { ToastProvider } from "react-toast-notifications";
import Combine_Lesson from "./Pages/LawOrder/Combine_Lesson";
import "./App.css";

function App() {
  return (
    <ToastProvider placement="bottom-left">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/user/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Welcome} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ToastProvider>
  );
}

export default App;