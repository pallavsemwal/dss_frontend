import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "@bootstrap-styled/v4";
import Button from "@bootstrap-styled/v4/lib/Button";
import { Link } from "react-router-dom";


function LawModal({ situationType, data, children }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
  const RallyData = ({ data }) => {
    let id = data['id']
    let url = `/user/rally/view/${id}`
    return (<div>
      <p>Title: {data["rallyTitle"]}</p>
      <p>Date of Rally: {data["date"]}</p>
      <p>Type: {data["political"] ? "Political," : ""}{data["social"] ? "Social," : ""}{data["religious"] ? "Religious," : ""}{data["government"] ? "Government," : ""}{data["protest"] ? "Protest," : ""}</p>
      <p>Start Location: {data["startLocation"]}</p>
      <p>End Location: {data["endLocation"] ? data["endLocation"] : data["startLocation"]}</p>
      <Link to={
        {
          pathname: url,
          state: data
        }
      }>
        <Button style={{ background: "rgb(65, 66, 66)", 'border-radius': "7px", 'font-weight': "500", 'box-shadow': '2px 2px 4px rgb(184, 187, 187)', "border": "none" }}>More Info</Button>
      </Link>
    </div>)
  }
  const GatheringData = ({ data }) => {
    let id = data['id']
    let url = `/user/gathering/view/${id}`
    return (<div>
      <p>Title: {data["title"]}</p>
      <p>Date of Rally: {data["date"]}</p>
      <p>Type: {data["political"] ? "Political," : ""}{data["social"] ? "Social," : ""}{data["religious"] ? "Religious," : ""}{data["government"] ? "Government," : ""}{data["protest"] ? "Protest," : ""}</p>
      <p>Start Location: {data["location"]}</p>
      <Link to={
        {
          pathname: url,
          state: data
        }
      }>
        <Button style={{ background: "#0276FF", 'border-radius': "7px", 'font-weight': "500", 'box-shadow': '2px 2px 4px #888888' }}>More Info</Button>
      </Link>
    </div>)
  }
  const CrimeData = ({ data }) => {
    let id = data['id']
    let url = `/user/crime/view/${id}`
    return (<div>
      <p>Type: {data["crimeType"]}</p>
      <p>Title: {data["title"]}</p>
      <p>Area: {data["area"]}</p>
      <p>Date and Time of Crime: {data["dateTime"]}</p>
      <Link to={
        {
          pathname: url,
          state: data
        }
      }>
        <Button style={{ background: "#0276FF", 'border-radius': "7px", 'font-weight': "500", 'box-shadow': '2px 2px 4px #888888' }}>More Info</Button>
      </Link>
    </div>)
  }
  const CalamityData = ({ data }) => {
    let id = data['id']
    let url = `/user/calamity/view/${id}`
    return (<div>
      <p>Title: {data["title"]}</p>
      <p>Type: {data["calamityType"]}</p>
      <p>Injured: {data["injured"]}</p>
      <p>Dead: {data["dead"]}</p>
      <p>People Affected: {data["peopleAffected"]}</p>
      <p>Start Date: {data["startDate"]}</p>
      <p>End Date: {data["endDate"]}</p>
      <p>Total Cost: {data["totalCost"]}</p>
      <Link to={
        {
          pathname: url,
          state: data
        }
      }>
        <Button style={{ background: "#0276FF", 'border-radius': "7px", 'font-weight': "500", 'box-shadow': '2px 2px 4px #888888' }}>More Info</Button>
      </Link>
    </div>)
  }
  const EpidemicData = ({ data }) => {
    let id = data['id']
    let url = `/user/epidemic/view/${id}`
    return (<div>
      <p>Title: {data["title"]}</p>
      <p>Type: {data["epidemicType"].slice(0, -2)}</p>
      <p>Died: {data["died"]}</p>
      <p>Cured: {data["cured"]}</p>
      <p>Total Infected: {data["totalInfected"]}</p>
      <p>Died: {data["died"]}</p>
      <p>Beds Required: {data["hospitalbeds"]}</p>
      <p>Hospital Staff: {data["healthstaff"]}</p>
      <p>Police: {data["police"]}</p>
      <p>Year: {data["year"]}</p>
      <Link to={
        {
          pathname: url,
          state: data
        }
      }>
        <Button style={{ background: "#0276FF", 'border-radius': "7px", 'font-weight': "500", 'box-shadow': '2px 2px 4px #888888' }}>More Info</Button>
      </Link>
    </div>)
  }
  if (situationType == "Rally") {
    return (
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Rally Data</ModalHeader>
          <ModalBody>
            <RallyData data={data} />
          </ModalBody>
        </Modal>
      </span>
    );
  } else if (situationType == "Crime") {
    return (
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Crime Data</ModalHeader>
          <ModalBody>
            <CrimeData data={data} />
          </ModalBody>
        </Modal>
      </span>
    );
  } else if (situationType == "Calamity") {
    return (
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Calamity Data</ModalHeader>
          <ModalBody>
            <CalamityData data={data} />
          </ModalBody>
        </Modal>
      </span>
    );
  } else if (situationType == "Epidemic") {
    return (
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Epidemic Data</ModalHeader>
          <ModalBody>
            <EpidemicData data={data} />
          </ModalBody>
        </Modal>
      </span>
    );
  } else if (situationType == "Public") {
    return (
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Public Gathering Data</ModalHeader>
          <ModalBody>
            <GatheringData data={data} />
          </ModalBody>
        </Modal>
      </span>
    );
  } else {
    return (<div>
      <span>
        <span onClick={toggleModal}>{children}</span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Rally Data</ModalHeader>
          <ModalBody>
            <RallyData data={data} />
          </ModalBody>
        </Modal>
      </span>

    </div>)
  }

}

export default LawModal;