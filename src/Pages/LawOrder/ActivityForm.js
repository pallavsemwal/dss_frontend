import React from "react";
import styled from "styled-components";
import Rally from "./Rally/Rally";
import Gathering from "./Gathering/Gathering";
import Calamity from "./Calamity/Calamity";
import Epidemic from "./Epidemic/Epidemic";
import Crime from "./Crime/Crime";

const FormDiv = styled.div`
  padding: 12px 0px;
`;

function ActivityForm({ action }) {
  if (action === "1") {
    return (
      <FormDiv>
        <Rally />
      </FormDiv>
    );
  } else if (action === "2") {
    return (
      <FormDiv>
        <Gathering />
      </FormDiv>
    );
  } else if (action === "3") {
    return (
      <FormDiv>
        <Epidemic />
      </FormDiv>
    );
  } else if (action === "4") {
    return (
      <FormDiv>
        <Calamity />
      </FormDiv>
    );
  } else if (action === "5") {
    return (
      <FormDiv>
        <Crime />
      </FormDiv>
    );
  } else {
    return <FormDiv>
      {/* <Rally/>
      <Gathering />
      <Calamity/>
      <Epidemic/>
      <Crime/> */}
    </FormDiv>;
  }
}

export default ActivityForm;