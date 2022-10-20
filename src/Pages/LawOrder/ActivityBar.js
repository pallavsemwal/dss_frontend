import React, { useState } from "react";
import styled from "styled-components";
import './hover.css'

import {
  InputGroup,
  Input,
  Option,
  InputGroupAddon,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "@bootstrap-styled/v4";
import { Link } from "react-router-dom";

const ActionList = [
  "None",
  "Rally",
  "Public Gathering",
  "Epidemic",
  "Natural Calamity",
  "Crime",
];

function LinkDropDownItem({ text, src, style }) {
  return (
    <Link to={src} style={style}>
      <Dropdown >{text}</Dropdown>
    </Link>
  );
}


function NewActivityDropDown() {
  const [isOpen, setIsOpen] = useState();
  const DropdownItemStyled = {
    color: "black",
    textDecoration: "none",
    opacity: "0.7"
  };

  const DropdownItemHover = styled.li`
    &:hover {
    background-color: #DDD8E6;
    font-size: 1.1em;
    transition: 0.5s;
  }
  `
  return (
    <div style={{ float: "right", marginTop: "20px" }}>
      <Dropdown
        color="danger"
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <DropdownToggle caret style={{background:"#0276FF",'border-radius':"16px",'font-weight':"500",'box-shadow': '2px 2px 16px #888888',width:"300px"}}>+ New Law and Order Activity</DropdownToggle>
        <DropdownMenu style={{paddingLeft: "10px", paddingRight: "10px",position:"absolute",background: "white "}}>
          <DropdownItemHover style={{width:"275px"}}> <LinkDropDownItem src="rally/create" text="Rally" style={DropdownItemStyled} /> </DropdownItemHover>
          <DropdownItemHover> <LinkDropDownItem src="gathering/create" text="Public Gathering" style={DropdownItemStyled} /> </DropdownItemHover>
          <DropdownItemHover> <LinkDropDownItem src="epidemic/create" text="Epidemic" style={DropdownItemStyled} /> </DropdownItemHover>
          <DropdownItemHover> <LinkDropDownItem src="calamity/create" text="Natural Calamity" style={DropdownItemStyled} /> </DropdownItemHover>
          <DropdownItemHover> <LinkDropDownItem src="crime/create" text="Crime" style={DropdownItemStyled} /> </DropdownItemHover>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function ActivityBar({ setAction }) {
  return (
    <div>
      <div style={{ float: "left" }}>
        <InputGroup style={{ width: "40%", minWidth: "350px" }}>
          <InputGroupAddon>Action &nbsp;</InputGroupAddon>
          <Input type="select" onChange={(e) => setAction(e.target.value)}>
            {ActionList.map((action, idx) => (
              <Option key={idx} value={idx}>
                {action}
              </Option>
            ))}
          </Input>
        </InputGroup>
      </div>
      <NewActivityDropDown />
    </div>
  );
}

export default NewActivityDropDown;
