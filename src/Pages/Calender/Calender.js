import React, {useState} from "react";
import styled from "styled-components";
import moment from "moment-timezone";
import {monthDict, dayDict} from "./Constants";
import {HeaderDiv} from "./CalenderStyled";

const Table = styled.table`
  border-spacing: 1px;
  text-align: center;
  /* width: 100%; */
  table-layout: fixed;
  /* font-size: 1.3em; */
  /* line-height: 1.3em; */
`;

const TD = styled.td`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => props.color || "black"};
`;

function CalenderCell({offset, curDate, monthYear, selectDate}) {
  let color;
  let year = monthYear[1];
  let month = monthYear[0];
  let dateObj = new Date(year, month, offset);
  if (dateObj.getMonth() !== month) color = "gray";
  let isCurDate = dateObj.getTime() === curDate.startOf("day").valueOf();
  if (isCurDate) color = "#F0AD4E";
  if (dateObj.getTime() === moment().startOf("day").valueOf())
    color = "#1E90FF";
  return (
    <TD color={color} onClick={() => selectDate(dateObj)}>
      {isCurDate ? <u> {dateObj.getDate()} </u> : dateObj.getDate()}
    </TD>
  );
}

function CalenderRow({offset, curDate, monthYear, selectDate}) {
  return (
    <tr>
      {[...Array(7)].map((_, idx) => (
        <CalenderCell
          key={idx}
          offset={offset + idx}
          curDate={curDate}
          selectDate={selectDate}
          monthYear={monthYear}
        />
      ))}
    </tr>
  );
}

function CalenderTopRow({row}) {
  return (
    <tr>
      {row.map((obj, idx) => (
        <TD key={idx}>{obj}</TD>
      ))}
    </tr>
  );
}

export default function Calender({curDate, setCurDate}) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  let switchPrevMonth = () => {
    if (month) setMonth(month - 1);
    else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  let switchNextMonth = () => {
    if (month !== 11) setMonth(month + 1);
    else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  let selectDate = (dateObj) => {
    if (dateObj.getTime() !== curDate.startOf("day").valueOf()) {
      setMonth(dateObj.getMonth());
      setYear(dateObj.getFullYear());
      setCurDate(moment(dateObj));
    }
  };

  let monthFirstDay = new Date(year, month);
  let CalenderOffset = ((monthFirstDay.getDay() + 4) % 7) + 1;
  return (
    <div>
      <h3>Calendar</h3>
      <div style={{boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.2)'}}>
        <HeaderDiv>
          <span style={{float: "left", cursor: 'pointer'}} onClick={switchPrevMonth}>
            &nbsp; &#8249;
          </span>
          {monthDict[month]} {year}
          <span style={{float: "right", cursor: 'pointer'}} onClick={switchNextMonth}>
            &#8250; &nbsp;
          </span>
        </HeaderDiv>
        <Table>
          <tbody>
            <CalenderTopRow row={dayDict} />
            {[...new Array(6)].map((_, idx) => (
              <CalenderRow
                key={idx}
                offset={7 * idx - CalenderOffset}
                curDate={curDate}
                monthYear={[month, year]}
                selectDate={selectDate}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
