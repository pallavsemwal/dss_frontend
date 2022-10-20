import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from '@bootstrap-styled/v4';
import Background from "../Images/emblem_big.png";

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5%;
  position: relative;
  box-sizing: border-box;
  background-color: rgb(240, 240,240);
  background-image: url(${Background});
  background-repeat: 'repear-x';
`

const WrapperDiv = styled.div`
  margin: auto;
  box-shadow: 0px 0px 3px 0px black;
  background-color: #FFFFFFF2;
  padding: 20px 40px;
`

const NotFound = () => {
  return (
    <BackgroundDiv>
      <WrapperDiv>
        <h1>404 Not Found!</h1>
        <h1>The Page you requested wasn't Found!</h1>
        <h2>Perhaps you are here because:</h2>
        <ul>
          <li><h3>The page was moved</h3></li>
          <li><h3>The page was removed</h3></li>
          <li><h3>Incompetence of our developers...</h3></li>
        </ul>
        <Link to="/user">
          <Button size='lg'>
            Return to Homepage
          </Button>
        </Link>
      </WrapperDiv>
    </BackgroundDiv>
  );
};

export default NotFound;
