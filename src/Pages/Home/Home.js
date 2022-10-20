import React from "react";
import LeftPane from "../LeftPane/LeftPane";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CalenderPage from "../Calender/CalenderPage";
import MeetingPortal from "../Meeting/MeetingPortal";
import DistrictInfo from "../District/District";
import SchemesInfo from "../Schemes/Schemes";
import Integrated from "../Integrated/Integrated";
import LawOrder from "../LawOrder/LawOrder";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_INFO } from "./HomeQueries";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingComponent from "../LoadingPage/LoadingComponent";
import Rally from "../LawOrder/Rally/Home";
import Epidemic from "../LawOrder/Epidemic/Home";
import Calamity from "../LawOrder/Calamity/Home";
import Gathering from "../LawOrder/Gathering/Home";
import Crime from "../LawOrder/Crime/Home";
import Blank from "../Integrated/blank";
import Combine_Lesson from "../LawOrder/Combine_Lesson";
import { Meetings } from "../Meetings_new/Meetings";
import { CreateMeeting } from "../Meetings_new/CreateMeeting";
import { CreateMeetingGroup } from "../Meetings_new/CreateMeetingGroup";
import { MeetingGroupDepartment } from "../Meetings_new/MeetingGroupDepartment";
import { MeetingGroupDetail } from "../Meetings_new/MeetingGroupDetail";
import { MeetingDetail } from "../Meetings_new/MeetingDetail";
import { Compliance } from "../Compliance/Compliance";
import { ComplianceDetail } from "../Compliance/ComplianceDetail";

function Home() {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <LoadingComponent />;
  if (error || data === undefined) {
    window.location.replace("/login");
    return <p>Error :(</p>;
  }
  return (
    <div>
      <Header
        firstName={data?.user?.firstName}
        lastName={data?.user?.lastName}
      />
      <div className="home-container">
        <Router>
          <LeftPane
            name={data?.user?.firstName + " " + data?.user?.lastName}
            rank={data?.user?.profile?.rank}
            batch={data?.user?.profile?.batch}
            district={data?.user?.profile?.district[0].name}
            districtId={data?.user?.profile?.district[0].id}
          />
          <div className="rightPane">
            <Route exact path="/user/" component={Integrated} />
            <Route exact path="/user/schedule" component={CalenderPage} />
            <Route exact path="/user/search" component={MeetingPortal} />
            <Route exact path="/user/laworder" component={LawOrder} />
            <Route exact path="/user/combine_lesson" component={Combine_Lesson} />
            <Route exact path="/user/district/:id" component={DistrictInfo} />
            <Route exact path="/user/schemes" component={SchemesInfo} />
            <Route path="/user/rally" component={Rally} />
            <Route path="/user/gathering" component={Gathering} />
            <Route path="/user/epidemic" component={Epidemic} />
            <Route path="/user/blank" component={Blank} />
            <Route path="/user/calamity" component={Calamity} />
            <Route path="/user/crime" component={Crime} />
            <Route exact path="/user/meeting/:meetingId" component={Meetings}/>
            <Route exact path="/user/meetings/createMeetingGroup" component={CreateMeetingGroup}/>
            <Route exact path="/user/meetings/createMeeting" component={CreateMeeting}/>
            <Route exact path="/user/meetingGroup/department/:departmentId" component={MeetingGroupDepartment}/>
            <Route exact path="/user/meetingGroupDetails/:meetingGroupId" component={MeetingGroupDetail}/>
            <Route exact path="/user/meetingDetail/:meetingId" component={MeetingDetail}/>
            <Route path="/user/compliance" component={Compliance}/>
            <Route exact path="/user/complianceDetail/:doableId" component={ComplianceDetail}/>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
export default Home;