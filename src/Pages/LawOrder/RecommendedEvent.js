import React, { useEffect, useState } from 'react'
import { GET_ALL_CALAMITIES, GET_ALL_CRIMES, GET_ALL_EPIDEMICS, GET_ALL_RALLIES, GET_ALL_GATHERINGS } from './LawOrderQueries'
import { useQuery } from "@apollo/react-hooks"
import LawModal from "./LawEventModal"
import styled from "styled-components";
import Button from '@bootstrap-styled/v4/lib/Button';
import './hover.css'
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "@bootstrap-styled/v4";
import { Link } from 'react-router-dom';

function RecommendedEvent({ situationType, rallyConfig, publicConfig, crimeConfig, calamityConfig, epidemicConfig }) {

  const ListDiv = styled.div`
    overflow-y: scroll;
    overflow-x: visible;
    height: 80vh;
  `;

  const ContainerStyleDiv = styled.div`
    width: 90%;
    padding: 8px;
    margin: 5px 0px;
    border-radius: 4px;
    border-left: 8px solid ${props => props.color};
    box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
  `;

  const InfoStyleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
  `;

  const HeadingRecommendEventH3 = styled.h3`
    margin: 0px;
    padding-left: 5px;
  `

  
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

  const { data: allEpidemics } = useQuery(GET_ALL_EPIDEMICS);
  const { data: allCrimes } = useQuery(GET_ALL_CRIMES);
  const { data: allRallies } = useQuery(GET_ALL_RALLIES);
  const { data: allCalamities } = useQuery(GET_ALL_CALAMITIES);
  const { data: allGatherings } = useQuery(GET_ALL_GATHERINGS);

  const [filteredRally, setFilteredRally] = useState(allRallies?.allRallies);
  const [filteredCalamity, setFilteredCalamity] = useState(allCalamities?.allCalamities);
  const [filteredCrime, setFilteredCrime] = useState(allCrimes?.allCrimes);
  const [filteredEpidemic, setFilteredEpidemic] = useState(allEpidemics?.allEpidemics);
  const [filteredGatherings, setFilteredGatherings] = useState(allGatherings?.allGatherings);


  useEffect(() => {
    const filteredRallyList = allRallies?.allRallies.filter((rally) => {
      var returnValue = true;
      if (rallyConfig["Political"]) {
        returnValue = returnValue && rally["political"];
      }
      if (rallyConfig["Religious"]) {
        returnValue = returnValue && rally["religious"];
      }
      if (rallyConfig["Government"]) {
        returnValue = returnValue && rally["government"];
      }
      if (rallyConfig["Social"]) {
        returnValue = returnValue && rally["social"];
      }
      if (rallyConfig["Protest"]) {
        returnValue = returnValue && rally["protest"];
      }
      if (rallyConfig["isMobile"] !== '') {
        if (rallyConfig["isMobile"] === "Stationary") {
          returnValue = returnValue && rally["stationary"]
        } else {
          returnValue = returnValue && (!rally["stationary"])
        }
      }
      if (rallyConfig["attendance"] !== '') {
        console.log(rallyConfig["attendance"]);
        if (rallyConfig["attendance"] == '<100') {
          console.log('hii')
          returnValue = returnValue && (rally["attendance"] < 100)
        }
        if (rallyConfig["attendance"] == '100-500') {
          console.log('hii')
          returnValue = returnValue && (rally["attendance"] >= 100 && rally["attendance"] < 500)
        }
        if (rallyConfig["attendance"] == '500-1000') {
          console.log('hii')
          returnValue = returnValue && (rally["attendance"] >= 500 && rally["attendance"] < 1000)
        }
        if (rallyConfig["attendance"] == '1000-10000') {
          console.log('hii')
          returnValue = returnValue && (rally["attendance"] >= 1000 && rally["attendance"] < 10000)
        }
        if (rallyConfig["attendance"] == '>10000') {
          console.log('hii')
          returnValue = returnValue && (rally["attendance"] >= 10000)
        }
      }
      return returnValue;
    })

    setFilteredRally(filteredRallyList);
  }, [rallyConfig, allRallies])

  useEffect(() => {
    const filteredGatheringList = allGatherings?.allGatherings.filter((gathering) => {
      var returnValue = true;
      if (publicConfig["Political"]) {
        returnValue = returnValue && gathering["political"];
      }
      if (publicConfig["Religious"]) {
        returnValue = returnValue && gathering["religious"];
      }
      if (publicConfig["Government"]) {
        returnValue = returnValue && gathering["government"];
      }
      if (publicConfig["Social"]) {
        returnValue = returnValue && gathering["social"];
      }
      if (publicConfig["Protest"]) {
        returnValue = returnValue && gathering["protest"];
      }
      if (publicConfig["isClosed"] != '') {
        if (publicConfig["isClosed"] == "Close") {
          returnValue = returnValue && gathering["close"]
        } else {
          returnValue = returnValue && (!gathering["close"])
        }
      }
      if (publicConfig["attendance"] !== '') {
        console.log(publicConfig["attendance"]);
        if (publicConfig["attendance"] == '<100') {
          console.log('hii')
          returnValue = returnValue && (gathering["attendance"] < 100)
        }
        if (publicConfig["attendance"] == '100-500') {
          console.log('hii')
          returnValue = returnValue && (gathering["attendance"] >= 100 && gathering["attendance"] < 500)
        }
        if (publicConfig["attendance"] == '500-1000') {
          console.log('hii')
          returnValue = returnValue && (gathering["attendance"] >= 500 && gathering["attendance"] < 1000)
        }
        if (publicConfig["attendance"] == '1000-10000') {
          console.log('hii')
          returnValue = returnValue && (gathering["attendance"] >= 1000 && gathering["attendance"] < 10000)
        }
        if (publicConfig["attendance"] == '>10000') {
          console.log('hii')
          returnValue = returnValue && (gathering["attendance"] >= 10000)
        }
      }
      return returnValue;
    })

    setFilteredGatherings(filteredGatheringList);
  }, [publicConfig, allGatherings])

  useEffect(() => {
    const filteredCalamityList = allCalamities?.allCalamities.filter((calamity) => {
      var returnValue = true;
      if (calamityConfig["Flood"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'FLOODS');
      }
      if (calamityConfig["Earthquake"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'EARTHQUAKE');
      }
      if (calamityConfig["Forest Fire"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'FORESTFIRE');
      }
      if (calamityConfig["Landslide"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'LANDSLIDE');
      }
      if (calamityConfig["Drought"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'DROUGHT');
      }
      if (calamityConfig["Storm"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'STORM');
      }
      if (calamityConfig["Cyclone"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'CYCLONE');
      }
      if (calamityConfig["Others"]) {
        returnValue = returnValue && (calamity["calamityType"] == 'OTHER');
      }
      if (calamityConfig["affected"] !== '') {
        console.log(calamityConfig["affected"]);
        if (calamityConfig["affected"] == '<100') {
          console.log('hii')
          returnValue = returnValue && (calamity["peopleAffected"] < 100)
        }
        if (calamityConfig["affected"] == '100-500') {
          console.log('hii')
          returnValue = returnValue && (calamity["peopleAffected"] >= 100 && calamity["affected"] < 500)
        }
        if (calamityConfig["affected"] == '500-1000') {
          console.log('hii')
          returnValue = returnValue && (calamity["peopleAffected"] >= 500 && calamity["affected"] < 1000)
        }
        if (calamityConfig["affected"] == '1000-10000') {
          console.log('hii')
          returnValue = returnValue && (calamity["peopleAffected"] >= 1000 && calamity["affected"] < 10000)
        }
        if (calamityConfig["affected"] == '>10000') {
          console.log('hii')
          returnValue = returnValue && (calamity["peopleAffected"] >= 10000)
        }
      }

      return returnValue;

    })

    setFilteredCalamity(filteredCalamityList);

  }, [allCalamities, calamityConfig]);

  useEffect(() => {
    const filteredCrimeList = allCrimes?.allCrimes.filter((crime) => {
      var returnValue = true;
      if (crimeConfig["Loot"]) {
        returnValue = returnValue && (crime["crimeType"] == 'LOOT');
      }
      if (crimeConfig["Murder"]) {
        returnValue = returnValue && (crime["crimeType"] == 'MURDER');
      }
      if (crimeConfig["Smuggling"]) {
        returnValue = returnValue && (crime["crimeType"] == 'SMUGGLING');
      }
      if (crimeConfig["Rape"]) {
        returnValue = returnValue && (crime["crimeType"] == 'RAPE');
      }
      if (crimeConfig["Robbery"]) {
        returnValue = returnValue && (crime["crimeType"] == 'ROBBERY');
      }
      if (crimeConfig["Kidnapping"]) {
        returnValue = returnValue && (crime["crimeType"] == 'KIDNAPPING');
      }
      if (crimeConfig["Others"]) {
        returnValue = returnValue && (crime["crimeType"] == 'OTHER');
      }


      return returnValue;

    })

    setFilteredCrime(filteredCrimeList);

  }, [allCrimes, crimeConfig]);

  useEffect(() => {
    const filteredEpidemicList = allEpidemics?.allEpidemics.filter((epidemic) => {
      var returnValue = true;
      if (epidemicConfig["Seasonal"]) {
        returnValue = returnValue && epidemic["epidemicType"].includes('Seasonal');
      }
      if (epidemicConfig["Deadly"]) {
        returnValue = returnValue && epidemic["epidemicType"].includes('Deadly');
      }
      if (epidemicConfig["Highly Infectious"]) {
        returnValue = returnValue && epidemic["epidemicType"].includes('Highly');
      }

      if (epidemicConfig["infected"] != '') {
        returnValue = returnValue && (parseInt(epidemicConfig["infected"]) < epidemic["totalInfected"])
      }
      return returnValue;
    })

    setFilteredEpidemic(filteredEpidemicList);
  }, [epidemicConfig, allEpidemics])

  const Epidemic = ({ data, key }) => {
    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
    let id = data['id']
    let url = `/user/epidemic/view/${id}`
    let url_2 = `/user/epidemic/lesson/${id}`
    return (
      // <LawModal data={data} situationType={situationType}>
      <span>
        <span onClick={toggleModal}>
        <ContainerStyleDiv color="#f13c20" className='hoverEvent'>
          <div>
            <HeadingRecommendEventH3>
              <i className="fa fa-ambulance"></i> Epidemic
            </HeadingRecommendEventH3>
          </div>
          <InfoStyleDiv>
            <span>Title: {data["title"]}</span>
            <span>Type: {data["epidemicType"].slice(0, -2)}</span>
            <span>Year: {data["year"]}</span>
            <Link to={
              {
                pathname: url_2,
                state: data
              }
            }>
              <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }}>Lesson Learnt</Button>
            </Link>
          </InfoStyleDiv>
        </ContainerStyleDiv>
        </span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Epidemic Data</ModalHeader>
          <ModalBody>
            <EpidemicData data={data} />
          </ModalBody>
        </Modal>
        </span>
      // </LawModal>
    );
  };

  const Calamity = ({ data, key }) => {
    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
    let id = data['id']
    let url = `/user/calamity/view/${id}`
    let url_2 = `/user/calamity/lesson/${id}`
    return (
      // <LawModal data={data} situationType={situationType}>
      <span>
        <span onClick={toggleModal}>
        <ContainerStyleDiv color="#4056a1" className='hoverEvent'>
          <div>
            <HeadingRecommendEventH3>
              <img src="https://img.icons8.com/fluent-systems-regular/24/000000/emergency-exit.png" />
              Calamity
            </HeadingRecommendEventH3>
          </div>
          <InfoStyleDiv>
            <span>Title: {data["title"]}</span>
            <span>Type: {data["calamityType"]}</span>
            <span>Start Date: {data["startDate"]}</span>
            <span>End Date: {data["endDate"]}</span>
            <Link to={
              {
                pathname: url_2,
                state: data
              }
            }>
              <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }}>Lesson Learnt</Button>
            </Link>
          </InfoStyleDiv>
        </ContainerStyleDiv>
        </span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Calamity Data</ModalHeader>
          <ModalBody>
            <CalamityData data={data} />
          </ModalBody>
        </Modal>
        </span>
      // </LawModal>
    );
  };

  const Rally = ({ data, key }) => {
    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
    let id = data['id']
    let url = `/user/rally/view/${id}`
    let url_2 = `/user/rally/lesson/${id}`
    return (
      // <LawModal data={data} situationType={situationType}>
      <span>
        <span onClick={toggleModal}>
        <ContainerStyleDiv color="#d79922" className='hoverEvent'>
          <HeadingRecommendEventH3>
            <i className="fa fa-bullhorn"></i>Rally
          </HeadingRecommendEventH3>
          <InfoStyleDiv>
            <span>Title: {data["rallyTitle"]}</span>
            <span>Attendance: {data["attendance"]}</span>
            <span>Date: {data["date"]}</span>
            <Link to={
              {
                pathname: url_2,
                state: data
              }
            }>
              <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }}>Lesson Learnt</Button>
            </Link>
          </InfoStyleDiv>
        </ContainerStyleDiv>
        </span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Rally Data</ModalHeader>
          <ModalBody>
            <RallyData data={data} />
          </ModalBody>
        </Modal>
        </span>
      // </LawModal>
    );
  };

  const Gathering = ({ data, key }) => {
    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
    let id = data['id']
    let url = `/user/gathering/view/${id}`
    let url_2 = `/user/gathering/lesson/${id}`
    return (
      // <LawModal data={data} situationType={situationType}>
      <span>
        <span onClick={toggleModal}>
        <ContainerStyleDiv color="#5cdb95" className='hoverEvent'>
          <div>
            <HeadingRecommendEventH3>
              <i className="fa fa-users"></i>Public Gathering
            </HeadingRecommendEventH3>
          </div>
          <InfoStyleDiv>
            <span>Title: {data["title"]}</span>
            <span>Attendance: {data["attendance"]}</span>
            <span>Date: {data["date"]}</span>
            <Link to={
              {
                pathname: url_2,
                state: data
              }
            }>
              <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }}>Lesson Learnt</Button>
            </Link>
          </InfoStyleDiv>
        </ContainerStyleDiv>
        </span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Public Gathering Data</ModalHeader>
          <ModalBody>
            <GatheringData data={data} />
          </ModalBody>
        </Modal>
        </span>
      // </LawModal>
    );
  };

  const Crime = ({ data, key }) => {
    const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
    let id = data['id']
    let url = `/user/crime/view/${id}`
    let url_2 = `/user/crime/lesson/${id}`
    return (
      // <LawModal data={data} situationType={situationType}>
      <span>
        <span onClick={toggleModal}>
        <ContainerStyleDiv color="#c5cbe3" className='hoverEvent'>
          <div>
            <HeadingRecommendEventH3>
              <img src="https://img.icons8.com/material/16/000000/handcuffs.png" />
              Crime
            </HeadingRecommendEventH3>
          </div>
          <InfoStyleDiv>
            <span>Title: {data["title"]}</span>
            <span>Type: {data["crimeType"]}</span>
            <span>Date: {data["date"]}</span>
            <Link to={
              {
                pathname: url_2,
                state: data
              }
            }>
              <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }}>Lesson Learnt</Button>
            </Link>
          </InfoStyleDiv>
        </ContainerStyleDiv>
        </span>
        <Modal isOpen={modal} toggle={() => toggleModal()}>
          <ModalHeader style={{ "background-color": "rgb(228, 231, 231)" }}>Crime Data</ModalHeader>
          <ModalBody>
            <CrimeData data={data} />
          </ModalBody>
        </Modal>
        </span>
      // </LawModal>
    );
  };


  if (!allEpidemics || !allCalamities || !allCrimes || !allRallies || !allGatherings) { return <p> waiting </p> }
  else {
    const EpidemictList = filteredEpidemic?.map((epidemic) => {
      return <Epidemic key={epidemic["id"]} data={epidemic} />
    })
    const CalamityList = filteredCalamity?.map((calamity) => {
      return <Calamity key={calamity["id"]} data={calamity} />
    })
    const CrimeList = filteredCrime?.map((crime) => {
      return <Crime key={crime["id"]} data={crime} />
    })
    const RallyList = filteredRally?.map((rally) => {
      return <Rally key={rally["id"]} data={rally} />
    })
    const GatheringList = filteredGatherings?.map((gathering) => {
      return <Gathering key={gathering["id"]} data={gathering} />
    })

    if (situationType === "Rally") {
      return <ListDiv>{RallyList}</ListDiv>;
    } else if (situationType === "Crime") {
      return <ListDiv>{CrimeList}</ListDiv>;
    } else if (situationType === "Calamity") {
      return <ListDiv>{CalamityList}</ListDiv>;
    } else if (situationType === "Epidemic") {
      return <ListDiv>{EpidemictList}</ListDiv>;
    } else if (situationType === "Public") {
      return <ListDiv>{GatheringList}</ListDiv>;
    } else if (situationType === "All") {
      return <ListDiv>{RallyList}
        {/* <br/> */}
        {CrimeList}
        {/* <br/> */}
        {CalamityList}
        {/* <br/> */}
        {EpidemictList}
        {/* <br/> */}
        {GatheringList}</ListDiv>;
    }
  }
}

export default RecommendedEvent;