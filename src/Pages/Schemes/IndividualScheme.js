import React from "react";
import styled from "styled-components";
import { Row, Col } from "@bootstrap-styled/v4";
import dImage from "../Images/scheme.jpeg";

const ImgScheme = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 0px;
`;
const DetailDiv = styled.div`
  text-align: center;
  margin: 8px 0px;
  width: inherit;
  font-family: "Poppins", sans-serif;
`;
const StatsCol = styled(Col)`
  padding: 2px;
  text-align: center;
`;
const ProgressBar = styled.div`
  position: absolute;
  bottom: 4px;
  left: 0px;
  width: ${(props) => props.completion * 100}%;
  border-bottom: 6px green solid;
`;

function IndividualSchemeDesign({ details, complete }) {
  let totalPeople = details.numPeopleLeft + details.numPeopleReached;
  let completion = details.numPeopleReached / totalPeople;
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ImgScheme src={details.src || dImage} />
        <ProgressBar completion={completion} />
      </div>
      <h3 style={{ margin: "5px 0px 10px 0px" }}>{details.name}</h3>
      {complete && (
        <Row>
          <StatsCol style={{ borderRight: "2px black solid" }}>
            <h4 style={{ margin: "2px" }}>{details.numPeopleReached}</h4>Reached
          </StatsCol>
          <StatsCol>
            <h4 style={{ margin: "2px" }}>{details.numPeopleLeft}</h4>Left
          </StatsCol>
        </Row>
      )}
      {complete && <DetailDiv>{details.details}</DetailDiv>}
    </div>
  );
}

export default IndividualSchemeDesign;
