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

function CrimeLesson() {
    let location = useLocation();
    let id = location.state.id;
    let type = "type";
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>Law and Order</BreadcrumbItem>
                <BreadcrumbItem>Crime</BreadcrumbItem>
                <BreadcrumbItem>View</BreadcrumbItem>
                <BreadcrumbItem>{location.state.id}</BreadcrumbItem>
            </Breadcrumb>
            <h3>Basic Details</h3>
            <Table style={{ width: "50%" }}>
                <TrView label="Title" value={location.state.title} />
                <TrView label="Type" value={location.state.crimeType} />
                <TrView label="Date" value={location.state.dateTime} />
                <TrView label="Area" value={location.state.area} />
            </Table>
            {/* <Link to= {
        {
          pathname: `/user/crime/close/${id}`,
          state: location.state
        }
      }>
        <Button color="danger">Close Event</Button>
      </Link> */}
            <h3>Lesson's Learned</h3>
            <ShadowBox>
                <RichTextReadOnly value={initialNotesValue} />
            </ShadowBox>
        </div>
    );
}

export default CrimeLesson;