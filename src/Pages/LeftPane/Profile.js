import React from "react";
import styled from "styled-components";

const ProfileDiv = styled.table`
  width: calc(100%-32px);
  padding: 4px 12px;
  font-size: 1.3em;
  line-height: 1.5em;
  font-family: "Sen", sans-serif;
  margin-bottom: 16px;
`;

const ProfileCol = styled.td`
  overflow: hidden;
`;

function Detail({Key, value}) {
  return (
    <tr>
      <ProfileCol lg={3}>{Key}</ProfileCol>
      <ProfileCol>:&nbsp; {value}</ProfileCol>
    </tr>
  );
}

function Profile({name, rank, batch, district}) {
  return (
    <ProfileDiv>
      <tbody>
        <Detail Key="Name" value={name} />
        <Detail Key="Rank" value={rank} />
        <Detail Key="Batch" value={batch} />
        <Detail Key="District" value={district} />
      </tbody>
    </ProfileDiv>
  );
}

export default Profile;
