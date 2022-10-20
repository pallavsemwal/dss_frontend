import React from "react";
import styled from "styled-components";
import {Row, Col} from "@bootstrap-styled/v4";

const FooterHTML = styled.footer`
  background-color: #000;
  color: #FFF;
  padding: 16px 2%;
  font-weight: bold;
  font-size: 1em;
  line-height: 1em;
`;

function Footer() {
  return (
    <FooterHTML>
      <Row>
        <Col>
          <h3>CONTACT INFO</h3>
          <ol>Mob no. +91-8929897373</ol>
          <ol>office no.- 01731-295894</ol>
          <ol>qwerty@gmail.com</ol>
        </Col>
        <Col>
          <h3>OTHER SERVICES</h3>
          <ol>E-judicial Service</ol>
          <ol>E-FIR</ol>
          <ol>Fire service</ol>
          <ol>Health service</ol>
        </Col>
        <Col>
          <h3>INFORMATION</h3>
          <ol>Privacy policy</ol>
          <ol>Terms & Conditions</ol>
          <ol>Press Release</ol>
        </Col>
      </Row>
    </FooterHTML>
  );
}

export default Footer;
