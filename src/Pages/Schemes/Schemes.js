import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_SCHEMES_FOR_USER } from "./SchemeQueries";
import IndividualSchemeDesign from "./IndividualScheme";
import LoadingComponent from "../LoadingPage/LoadingComponent";
import Button from "@bootstrap-styled/v4/lib/Button";
import SchemeModal from "./Scheme.modal";

const SchemesGridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 8px;
  margin: 8px;
  align-items: flex-start;
`;
const SchemeWindowDiv = styled.div`
  margin: 8px;
  max-width: 200px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

function SchemesInfo() {
  const { loading, error, data } = useQuery(GET_ALL_SCHEMES_FOR_USER);
  // useEffect(useQuery());

  if (loading) return <LoadingComponent />;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  if (data === undefined) return <p>Waiting...</p>;
  else {
    let schemeCount = data?.allSchemesDistrict?.length;
    return (
      <div>
        <h2>Schemes Portal</h2>
        <SchemeModal>
        <Button
            color="primary"
            size="sm"
            // onClick={handleAddEvent}
            style={{ marginRight: "7px", boxSizing: "border-box" }}
          >
            &nbsp;<strong>Add New Scheme</strong>&nbsp;
          </Button>
          </SchemeModal>
        <h4>
          {schemeCount} {schemeCount > 1 ? "Schemes" : "Scheme"} Found
        </h4>
        <SchemesGridDiv>
          {data.allSchemesDistrict.map((obj, idx) => (
            <SchemeWindowDiv key={idx}>
              <IndividualSchemeDesign complete details={obj} />
            </SchemeWindowDiv>
          ))}
        </SchemesGridDiv>
      </div>
    );
  }
}

export default SchemesInfo;
