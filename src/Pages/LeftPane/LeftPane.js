import React from "react";
import Menu from "./Menu";
import Profile from "./Profile";
import styled from "styled-components";

const MenuDiv = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* background: #fafafa; */
  padding: 8px;
  justify-content: right;
  text-align: right;
  overflow: hidden;
`;

function LeftPane({name, rank, batch, district, districtId}) {
  return (
    <div className="leftPane">
      <MenuDiv>
        {/* <Profile name={name} rank={rank} batch={batch} district={district} /> */}
        <Menu districtId={districtId} />
      </MenuDiv>
    </div>
  );
}

export default LeftPane;
