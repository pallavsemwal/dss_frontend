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

function CalamityView() {
  let location = useLocation();
  let type = "type";
  let id = location.state.id;
  console.log(location.state)
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>Law and Order</BreadcrumbItem>
        <BreadcrumbItem>Calamity</BreadcrumbItem>
        <BreadcrumbItem>Close</BreadcrumbItem>
        <BreadcrumbItem>{location.state.id}</BreadcrumbItem>
      </Breadcrumb>
      <h3>Basic Details</h3>
      <Table style={{ width: "50%" }}>
        <TrView label="Title" value={location.state.title} />
        <TrView label="Start Date" value={location.state.startDate} />
        <TrView label="End Date" value={location.state.endDate} />
        <TrView label="Type" value={location.state.calamityType} />
        <TrView label="People Affected" value={location.state.peopleAffected} />
        <TrView label="Injured" value={location.state.injured} />
        <TrView label="Dead" value={location.state.dead} />
        <TrView label="Total Cost" value={location.state.totalCost} />
        <TrView label="Police Personnel Deployed" value={location.state.police} />
        <TrView label="NDRF Personnel Deployed" value={location.state.ndrf} />
        <TrView label="Ambulances Deployed" value={location.state.ambulance} />
      </Table>
      <Link to= {
        {
          pathname: `/user/calamity/close/${id}`,
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

export default CalamityView;
