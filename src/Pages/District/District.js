import React from "react";
import styled, { keyframes } from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_DISTRICT_INFO } from "./DistrictQueries";
import { Row, Col } from "@bootstrap-styled/v4";
import LoadingComponent from "../LoadingPage/LoadingComponent";

const FieldCol = styled.td`
  font-size: 1.5em;
  padding: 8px;
`;

const SlideIn = keyframes`
  from { transform: translate3d(50%, 0, 0); visibility: visible; }
  to { transform: translate3d(0, 0, 0);}
`;

const MapIframe = styled.iframe`
  animation-name: ${SlideIn};
  animation-duration: 2s;
  width: 100%;
  height: 600px;
  @media (max-width: 768px) {
    animation: none;
    margin-top: 16px;
    width: 100%;
    min-width: 400px;
    height: 400px;
  }
`;

function DetailField({ field, value }) {
  return (
    <tr>
      <FieldCol style={{ fontWeight: "bold" }}>{field}</FieldCol>
      <FieldCol>:</FieldCol>
      <FieldCol>{value}</FieldCol>
    </tr>
  );
}

function DistrictInfo({ match }) {
  const { loading, error, data } = useQuery(GET_DISTRICT_INFO, {
    variables: { id: match?.params?.id },
  });

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error :(</p>;
  if (data === undefined) return <p>Waiting...</p>;
  else {
    let address =
      data?.district?.name + ", " + data?.district?.state + ", India";
    return (
      <div>
        <h2>District Details</h2>
        <Row>
          <Col>
            <DetailField field="Name" value={data?.district?.name} />
            <DetailField field="State" value={data?.district?.state} />
            <DetailField
              field="Population"
              value={data?.district?.population}
            />
          </Col>
          <Col>
            <MapIframe
              allowfullscreen
              frameborder="0"
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyD93Oeipr_tDPZDno_5gHTFL2l_iFrdVrk&q=" +
                encodeURIComponent(address)
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DistrictInfo;
