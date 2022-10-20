import React from "react";
import styled from "styled-components";
import image from "../Images/emblem_big.png";
import dp from "../Images/sp.png";
import { Row, Col, Button } from "@bootstrap-styled/v4";

const HeaderHTML = styled.header`
  background-color: #000;
  padding: 4px 2%;
  color: #fff;
  font-size: 1.8em;
  font-family: 'Hind Siliguri', sans-serif;
`;

const NameSpan = styled.span`
  color: #fff;
  font-size: 22px;
  font-family: 'Conv_Coving01';
  vertical-align: middle;
  letter-spacing: 2px;
  margin: 0px 16px;
  background: -webkit-linear-gradient(#F89936, #FFF, #3E890E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
`;

const DPImg = styled.img`
  width: 24px;
  vertical-align: middle;
  border: 2px white solid;
`;

const ImageSymbol = styled.img`
  width: 1em;
  vertical-align: middle;
  -webkit-filter: invert(100%);
  filter: invert(100%);
`

const AccountToolbar = styled(Col)`
  font-size: 0.6em;
  padding: 5px;
  text-align: right;
`

const handleLogOut = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};

function Header({ firstName, lastName }) {
  return (
    <HeaderHTML>
      <Row>
        <Col>
          <ImageSymbol src={image} alt="DP" style={{ verticalAlign: "middle" }} />
          <NameSpan>Decision Support System</NameSpan>
        </Col>
        <AccountToolbar>
          <DPImg src={dp} /> &nbsp;
          {firstName} &nbsp; | &nbsp; &nbsp;
          <Button onClick={handleLogOut} size='sm' color='warning'> Logout </Button>
        </AccountToolbar>
      </Row>
    </HeaderHTML>
  );
}

export default Header;
