import React from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";
import BusinessIcon from "@material-ui/icons/Business";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import SearchIcon from "@material-ui/icons/Search";
import PollIcon from "@material-ui/icons/Poll";
import NotificationsIcon from "@material-ui/icons/Notifications";
import StorageIcon from '@material-ui/icons/Storage';
import ContactsIcon from "@material-ui/icons/Contacts";
import GavelIcon from "@material-ui/icons/Gavel";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom";

const MenuTable = styled.table`
  font-size: 1em;
  line-height: 2.2em;
  width: 100%;
  color: #000;
  border-spacing: 0px;
  font-family: 'Hind Siliguri', sans-serif;
`;

const MenuLink = styled(Link)`
  padding: 8px 0px;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #f0ad52;
  }
`;

function MenuOption ({children, name, link}) {
  return (
    <div style={{margin: "8px 0px"}}>
      <tr style={{ justifyContent: "center", display: "flex", flexWrap: "wrap", height: "40px"}}>
        <td><MenuLink to={link}>{children}</MenuLink></td>
      </tr>
      <tr style={{justifyContent: "center", display: "flex", flexWrap: "wrap"}}>
        <td> {name} </td>
      </tr>
    </div>
  )
}

function Menu({districtId}) {
  const districtLink = "/user/district/" + districtId;
  const IconStyle = {fontSize: "40px"};
  return (
    <MenuTable>
      <tbody>
        <MenuOption name="Home" link="/user">
          <HomeIcon style={IconStyle} />
        </MenuOption>
        <MenuOption name="District" link={districtLink}>
          <PlaceIcon style={IconStyle} />
        </MenuOption>
        {/* <MenuOption name="Dept. Details" link="/user">
            <BusinessIcon fontSize="inherit" />
        </MenuOption> */}
        <MenuOption name="Schedule" link="/user/schedule">
          <CalendarTodayIcon style={IconStyle} />
        </MenuOption>
        <MenuOption name="Search" link="/user/search">
          <SearchIcon style={IconStyle} />
        </MenuOption>
        <MenuOption name="Schemes" link="/user/schemes">
          <PollIcon style={IconStyle} />
        </MenuOption>
        {/* <MenuOption name="Notices" link="/user">
          <NotificationsIcon fontSize="inherit" />
        </MenuOption> */}
        {/* <MenuOption name="Contacts" link="/user">
          <ContactsIcon fontSize="inherit" />
        </MenuOption> */}
        <MenuOption name="Law " link="/user/laworder">
          <GavelIcon style={IconStyle} />
        </MenuOption>
        <MenuOption name="Compliance" link="/user/compliance">
          <AssignmentIcon style={IconStyle}/>
        </MenuOption>
      </tbody>
    </MenuTable>
  );
}

export default Menu;
