import React, { useState } from "react";
import {
  Row,
  Table,
  Td,
  Tr,
  Breadcrumb,
  BreadcrumbItem,
  Col,
} from "@bootstrap-styled/v4";
import RichTextEditor from "../../../Commons/Editor";
import { useLocation } from 'react-router-dom'
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

function CrimeClose() {
  let location = useLocation();
  let type = "type";
  const [notes, setNotes] = useState(initialNotesValue);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>Law and Order</BreadcrumbItem>
        <BreadcrumbItem>Crime</BreadcrumbItem>
        <BreadcrumbItem>Close</BreadcrumbItem>
        <BreadcrumbItem>{location.state.id}</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col lg="6">
          <h3>Add New Lessons Learned</h3>
        </Col>
        <Col lg="6">
          <h3>Previous Lessons Learned</h3>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <ShadowBox>
            <RichTextEditor value={notes} setValue={setNotes} />
          </ShadowBox>
        </Col>
        <Col lg="6">
          <ShadowBox>
            <RichTextEditor value={notes} setValue={setNotes} />
          </ShadowBox>
        </Col>
      </Row>
      <Button color="success">Submit and Close Event</Button>
    </div>
  );
}

export default CrimeClose;
