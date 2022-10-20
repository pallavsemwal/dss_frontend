import React from "react";
import {
  Table,
  Td,
  Tr,
  Breadcrumb,
  BreadcrumbItem,
} from "@bootstrap-styled/v4";
import { useLocation, Link } from 'react-router-dom'

import { RichTextReadOnly } from "../../../Commons/Editor";
import { initialNotesValue } from "../Constants";
import { ShadowBox } from "../LawOrderStyled";
import Button from "@bootstrap-styled/v4/lib/Button";

function TrView({ label, value }) {
  return (
    <Tr>
      <Td>
        <strong>{label}</strong>
      </Td>
      <Td>:</Td>
      <Td>{value}</Td>
    </Tr>
  );
}

function EpidemicView() {
  let location = useLocation();
  let id = location.state.id;
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>Law and Order</BreadcrumbItem>
        <BreadcrumbItem>Epidemic</BreadcrumbItem>
        <BreadcrumbItem>View</BreadcrumbItem>
        <BreadcrumbItem>{location.state.id}</BreadcrumbItem>
      </Breadcrumb>
      <h3>Basic Details</h3>
      <Table style={{ width: "50%" }}>
        <TrView label="Title" value={location.state.title} />
        <TrView label="Year" value={location.state.year} />
        <TrView label="Type" value={location.state.epidemicType} />
        <TrView label="Total Infected" value={location.state.totalInfected} />
        <TrView label="Cured" value={location.state.cured} />
        <TrView label="Dead" value={location.state.died} />
        <TrView label="Health Staff Deployed" value={location.state.healthstaff} />
        <TrView label="Police Personnel Deployed" value={location.state.police} />
        <TrView label="Hospital Beds" value={location.state.hospitalbeds} />
      </Table>
      <Link to= {
        {
          pathname: `/user/epidemic/close/${id}`,
          state: location.state
        }
      }>
        <Button color="danger">Close Event</Button>
      </Link>
      {/* <h3>Lesson's Learned</h3>
      <ShadowBox>
        <RichTextReadOnly value={initialNotesValue} />
      </ShadowBox> */}
    </div>
  );
}

export default EpidemicView;
