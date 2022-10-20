import React, { useState } from "react";
import RecommendedEvent from "./RecommendedEvent";
import NewActivityDropDown from "./ActivityBar";
import { Input, Option } from "@bootstrap-styled/v4";
import styled from "styled-components";
import Filters from "./Filters";
import './hover.css'
import { Link } from "react-router-dom";
import Button from "@bootstrap-styled/v4/lib/Button";

const LawOrderGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 30%) 5% 75%;
  grid-template-rows: minmax(80vh, auto);
  grid-template-areas: "filters . lists";
  border-top: 1px solid #eee;
  padding-top: 8px;
`;

const ListDiv = styled.div`
  grid-area: lists;
  height: 100%;
`;

const HeaderStyleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  top: 0px;
`;

const FilterPane = styled.div`
  font-size: 1.1em;
  height: 95%;
  width: 100%;
  overflow-y: auto;
  border-radius: 10px;
  padding: 2%;
`

function LawOrder() {

  const [filterType, setFilterType] = useState('All');
  const [rallyConfig, setRallyConfig] = useState({ 'isMobile': '', 'Political': false, 'Religious': false, 'Social': false, 'Protest': false, 'Government': false, 'attendance': '', });
  const [crimeConfig, setCrimeConfig] = useState({ 'Loot': false, 'Smuggling': false, 'Murder': false, 'Kidnapping': false, 'Robbery': false, 'Rape': false, 'Others': false, });
  const [publicConfig, setPublicConfig] = useState({ 'isClosed': '', 'Political': false, 'Religious': false, 'Social': false, 'Protest': false, 'Government': false, 'attendance': '', });
  const [calamityConfig, setCalamityConfig] = useState({ 'Flood': false, 'Earthquake': false, 'Drought': false, 'Landslide': false, 'Forest Fire': false, 'Cyclone': false, 'Storm': false, 'Others': false, 'affected': '', });
  const [epidemicConfig, setEpidemicConfig] = useState({ 'Seasonal': false, 'Highly Infectious': false, 'Deadly': false, 'infected': '', });

  const resetFilterSettings = () => {
    setCalamityConfig({ 'Flood': false, 'Earthquake': false, 'Drought': false, 'Landslide': false, 'Forest Fire': false, 'Cyclone': false, 'Storm': false, 'Others': false, 'affected': '', });
    setRallyConfig({ 'isMobile': '', 'Political': false, 'Religious': false, 'Social': false, 'Protest': false, 'Government': false, 'attendance': '', });
    setCrimeConfig({ 'Loot': false, 'Smuggling': false, 'Murder': false, 'Kidnapping': false, 'Robbery': false, 'Rape': false, 'Others': false, });
    setEpidemicConfig({ 'Seasonal': false, 'Highly Infectious': false, 'Deadly': false, 'infected': '', });
    setPublicConfig({ 'isClosed': '', 'Political': false, 'Religious': false, 'Social': false, 'Protest': false, 'Government': false, 'attendance': '', })
  }

  const changeFilterType = (e) => {
    setFilterType(e.target.value);
    resetFilterSettings();
  }

  console.log("Remounting")

  return (
    <div>
      <HeaderStyleDiv>
        <h2>Law and Order</h2>
        <Link to={
          {
            pathname: `combine_lesson`,
          }
        }>
          <Button style={{ height: 'fit-content', marginTop: '20px', borderRadius: '15px' }}>Combined Lesson Learnt</Button>
        </Link>

        <NewActivityDropDown />
      </HeaderStyleDiv>
      <LawOrderGrid>
        <FilterPane>
          <h3>Type of event</h3>
          <Input type="select" style={{ padding: "4px", width: "90%", fontSize: "1.1em", cursor: "pointer" }} onChange={changeFilterType} value={filterType}>
            <Option value="All">--All--</Option>
            <Option value="Rally">Rally</Option>
            <Option value="Public">Public Gathering</Option>
            <Option value="Calamity">Calamity</Option>
            <Option value="Crime">Crime</Option>
            <Option value="Epidemic">Epidemic</Option>
          </Input>
          &nbsp; &nbsp;
          <br />
          <br />
          <span style={{ display: "inline-block", width: "50%", fontWeight: "700", fontSize: "1.2em" }}>Filters</span>
          <Button style={{ background: "#0276FF", 'border-radius': "8px", 'font-weight': "500", 'box-shadow': '2px 2px 5px #888888' }} onClick={resetFilterSettings}>Clear Filters</Button>
          <Filters
            action={filterType}
            setRallyConfig={setRallyConfig}
            setPublicConfig={setPublicConfig}
            setCalamityConfig={setCalamityConfig}
            setCrimeConfig={setCrimeConfig}
            setEpidemicConfig={setEpidemicConfig}
            rallyConfig={rallyConfig}
            publicConfig={publicConfig}
            crimeConfig={crimeConfig}
            epidemicConfig={epidemicConfig}
            calamityConfig={calamityConfig} />
        </FilterPane>
        <ListDiv>
          <h2>Recent Law and Order Events </h2>
          <RecommendedEvent
            situationType={filterType}
            rallyConfig={rallyConfig}
            publicConfig={publicConfig}
            crimeConfig={crimeConfig}
            calamityConfig={calamityConfig}
            epidemicConfig={epidemicConfig} />
        </ListDiv>
      </LawOrderGrid>
    </div>
  );
}

export default LawOrder;