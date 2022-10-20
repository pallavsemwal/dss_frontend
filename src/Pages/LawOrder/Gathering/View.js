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

function GatheringView() {
  let location = useLocation();
  let id = location.state.id;
  let type = "type";
  let closed = location.state.close ? "Yes" : "No";
  if (location.state.political) {
    type = 'Political';
  }
  else if (location.state.religious) {
    type = 'Religious';
  }
  else if (location.state.social) {
    type = 'Social';
  }
  else if (location.state.protest) {
    type = 'Protest';
  }
  else {
    type = 'Government';
  }
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>Law and Order</BreadcrumbItem>
        <BreadcrumbItem>Gathering</BreadcrumbItem>
        <BreadcrumbItem>View</BreadcrumbItem>
        <BreadcrumbItem>{location.state.id}</BreadcrumbItem>
      </Breadcrumb>
      <h3>Basic Details</h3>
      <Table style={{ width: "50%" }}>
        <TrView label="Title" value={location.state.title} />
        <TrView label="Type" value={type} />
        <TrView label="Attendance" value={location.state.attendance} />
        <TrView label="Date" value={location.state.date} />
        <TrView label="Location" value={location.state.location} />
        <TrView label="Closed" value={closed} />
        <TrView label="Police Personnel Deplyed" value={location.state.police} />
        <TrView label="Ambulances Deployed" value={location.state.ambulance} />
        <TrView label="Firefighters Deployed" value={location.state.firefighters} />
      </Table>
      <Link to={
        {
          pathname: `/user/gathering/close/${id}`,
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

export default GatheringView;