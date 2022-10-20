import styled from "styled-components";

export const TotalPageDiv = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 100%;
  display: grid;
  height: 100%;
  position: relative;
  justify-items: center;
  grid-template-columns: auto minmax(350px, 30%);
  grid-template-rows: auto;
  grid-template-areas: "eventsPane CalenderPane";
`;

export const MiddlePageDiv = styled.div`
  grid-area: eventsPane;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const CalenderPane = styled.div`
  grid-area: CalenderPane;
  padding-left: 24px;
`;

export const HeaderDiv = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 0.4em;
  text-align: center;
  color: #fff;
  font-size: 1.2em;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: black;
`;
