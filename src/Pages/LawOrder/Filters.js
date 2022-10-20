import React, { useState } from "react";
import styled from 'styled-components';
import './hover.css'
import {
  Input,
  Label,
} from "@bootstrap-styled/v4";

const divStyle = { display: "flex", flexWrap: "wrap", position: "relative", height: "100%", width: "100%", paddingTop: "20px", overflowY: "visible" };
const leftDiv = { position: "absolute", left: "0px", height: "80%", width: "90%", top: "5%" };
// const rightDiv = { position: "absolute", right: "0px", height: "80%", width: "50%", top: "10%" };




function Filters({ action, setCalamityConfig, setCrimeConfig, setEpidemicConfig, setRallyConfig, rallyConfig, setPublicConfig, publicConfig, crimeConfig, epidemicConfig, calamityConfig, }) {

  const rallyFilterRadio = (e) => {
    setRallyConfig(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }));
  }

  const rallyFilterCheckbox = (e) => {
    setRallyConfig(prevState => ({
      ...prevState, [e.target.name]: e.target.checked
    }));
  }


  function RallyFilter({ setRallyConfig, rallyConfig }) {

    const LabelInput = ({ name }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="checkbox" name={name} onChange={rallyFilterCheckbox} checked={rallyConfig[name]} /> {name}
          </Label>
          <br />
        </div>
      )
    }

    const AttendanceInput = ({ gt }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="radio" name="attendance" value={gt} checked={rallyConfig["attendance"] == gt} /> {gt} <br />
          </Label>
        </div>
      )
    }

    const StatusInput = ({ gt }) => {
      return (
        <Label className="hoverme">
          {gt}
          <Input style={{ cursor: "pointer" }} type="radio" name="isMobile" value={gt} checked={rallyConfig["isMobile"] == gt} />
        </Label>

      )
    }

    return (
      <div style={divStyle}>

        <div style={leftDiv}>
          <div onChange={rallyFilterRadio}>
            <StatusInput gt="Stationary" /> &nbsp; &nbsp;
            <StatusInput gt="Mobile" />
          </div>
          <p style={{ fontWeight: "bold" }}>Nature of Event</p>
          <LabelInput name="Political" />
          <LabelInput name="Religious" />
          <LabelInput name="Social" />
          <LabelInput name="Protest" />
          <LabelInput name="Government" />
          <p style={{ fontWeight: "bold" }}>Attendance</p>
          <div onChange={rallyFilterRadio}>
            <AttendanceInput gt="<100" />
            <AttendanceInput gt="100-500" />
            <AttendanceInput gt="500-1000" />
            <AttendanceInput gt="1000-10000" />
            <AttendanceInput gt=">10000" />
          </div>
        </div>
      </div>
    )
  }

  function CrimeFilter({ crimeConfig, setCrimeConfig }) {

    const crimeFilterCheckbox = (e) => {
      setCrimeConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.checked
      }));
    }

    const LabelInput = ({ name }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="checkbox" name={name} onChange={crimeFilterCheckbox} checked={crimeConfig[name]} /> {name}
          </Label>
          <br />
        </div>
      )
    }

    return (
      <div style={divStyle}>
        <div style={leftDiv}>
          <p style={{ fontWeight: "bold" }}>Nature of Event</p>
          <LabelInput name="Loot" />
          <LabelInput name="Smuggling" />
          <LabelInput name="Murder" />
          <LabelInput name="Kidnapping" />
          <LabelInput name="Robbery" />
          <LabelInput name="Rape" />
          <LabelInput name="Others" />
        </div>
      </div>
    )
  }

  function PublicFilter({ publicConfig, setPublicConfig }) {

    const publicFilterRadio = (e) => {
      setPublicConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.value
      }));
      console.log(publicConfig)
    }

    const publicFilterCheckbox = (e) => {
      setPublicConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.checked
      }));
      console.log(publicConfig)
    }



    const LabelInput = ({ name }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="checkbox" name={name} onChange={publicFilterCheckbox} checked={publicConfig[name]} /> {name}
          </Label>
          <br />
        </div>
      )
    }

    const AttendanceInput = ({ gt }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="radio" name="attendance" value={gt} checked={publicConfig["attendance"] == gt} /> {gt} <br />
          </Label>
        </div>
      )
    }

    const StatusInput = ({ gt }) => {
      return (
        <Label className="hoverme">
          {gt}
          <Input style={{ cursor: "pointer" }} type="radio" name="isClosed" value={gt} checked={publicConfig["isClosed"] == gt} />
        </Label>

      )
    }

    return (
      <div style={divStyle}>
        <div style={leftDiv}>
          <div onChange={publicFilterRadio}>
            <StatusInput gt="Open" /> &nbsp; &nbsp;
            <StatusInput gt="Close" />
          </div>
          <p style={{ fontWeight: "bold" }}>Nature of Event</p>
          <LabelInput name="Political" />
          <LabelInput name="Religious" />
          <LabelInput name="Social" />
          <LabelInput name="Protest" />
          <LabelInput name="Government" />
          <p style={{ fontWeight: "bold" }}>Attendance</p>
          <div onChange={publicFilterRadio}>
            <AttendanceInput gt="<100" />
            <AttendanceInput gt="100-500" />
            <AttendanceInput gt="500-1000" />
            <AttendanceInput gt="1000-10000" />
            <AttendanceInput gt=">10000" />
          </div>
        </div>
      </div>
    )
  }

  function CalamityFilter({ calamityConfig, setCalamityConfig }) {

    const calamityFilterRadio = (e) => {
      setCalamityConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.value
      }));
      console.log(calamityConfig)
    }

    const calamityFilterCheckbox = (e) => {
      setCalamityConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.checked
      }));
      console.log(calamityConfig)
    }



    const LabelInput = ({ name }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="checkbox" name={name} onChange={calamityFilterCheckbox} checked={calamityConfig[name]} /> {name}
          </Label>
          <br />
        </div>
      )
    }

    const AttendanceInput = ({ gt }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="radio" name="affected" value={gt} checked={calamityConfig["affected"] == gt} /> {gt} <br />
          </Label>
        </div>
      )
    }

    return (
      <div style={divStyle}>
        <div style={leftDiv}>
          <p style={{ fontWeight: "bold" }}>Nature of Event</p>
          <LabelInput name="Flood" />
          <LabelInput name="Earthquake" />
          <LabelInput name="Drought" />
          <LabelInput name="Landslide" />
          <LabelInput name="Forest Fire" />
          <LabelInput name="Cyclone" />
          <LabelInput name="Storm" />
          <LabelInput name="Others" />
          <p style={{ fontWeight: "bold" }}>Affected</p>
          <div onChange={calamityFilterRadio}>
            <AttendanceInput gt="<100" />
            <AttendanceInput gt="100-500" />
            <AttendanceInput gt="500-1000" />
            <AttendanceInput gt="1000-10000" />
            <AttendanceInput gt=">10000" />
          </div>
        </div>
      </div>
    )
  }

  function EpidemicFilter({ epidemicConfig, setEpidemicConfig }) {

    const epidemicFilterRadio = (e) => {
      setEpidemicConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.value
      }));
    }

    const epidemicFilterCheckbox = (e) => {
      setEpidemicConfig(prevState => ({
        ...prevState, [e.target.name]: e.target.checked
      }));
    }

    const LabelInput = ({ name }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="checkbox" name={name} onChange={epidemicFilterCheckbox} checked={epidemicConfig[name]} /> {name}
          </Label>
          <br />
        </div>
      )
    }

    const AttendanceInput = ({ gt }) => {
      return (
        <div>
          <Label className="hoverme">
            <Input style={{ cursor: "pointer" }} type="radio" name="infected" value={gt} checked={epidemicConfig["infected"] == gt} /> {gt} <br />
          </Label>
        </div>
      )
    }

    return (
      <div style={divStyle}>
        <div style={leftDiv}>
          <p style={{ fontWeight: "bold" }}>Nature of Event</p>
          <LabelInput name="Seasonal" />
          <LabelInput name="Deadly" />
          <LabelInput name="Highly Infectious" />
          <p style={{ fontWeight: "bold" }}>Infected</p>
          <div onChange={epidemicFilterRadio}>
            <AttendanceInput gt="<100" />
            <AttendanceInput gt="100-500" />
            <AttendanceInput gt="500-1000" />
            <AttendanceInput gt="1000-10000" />
            <AttendanceInput gt=">10000" />
          </div>
        </div>
      </div>
    )
  }

  if (action === "Rally") {
    return <RallyFilter rallyConfig={rallyConfig} setRallyConfig={setRallyConfig} />;
  }
  else if (action === "Crime") {
    return <CrimeFilter setCrimeConfig={setCrimeConfig} crimeConfig={crimeConfig} />;
  } else if (action === "Public") {
    return <PublicFilter setPublicConfig={setPublicConfig} publicConfig={publicConfig} />;
  } else if (action === "Calamity") {
    return <CalamityFilter setCalamityConfig={setCalamityConfig} calamityConfig={calamityConfig} />;
  } else if (action === "Epidemic") {
    return <EpidemicFilter setEpidemicConfig={setEpidemicConfig} epidemicConfig={epidemicConfig} />;
  } else {
    return <div>

    </div>;
  }
}

export default Filters;