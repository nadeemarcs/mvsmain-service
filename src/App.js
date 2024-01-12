import React from "react";
import View from "./components/Jobopening/viewpage.js";
import Createjob from "./components/Jobopening/createjobform.js";
import Changeowner from "./components/Jobopening/changeowner.js";
import Jobopening from "./components/Jobopening";
import Clients from "./components/Clients";
import Createclient from "./components/Clients/createclientform";
import Clienteyeview from "./components/Clients/clienteyeview";
import Clientview from "./components/Clients/clientview";
import Vendors from "./components/Vendors";
import Vendorview from "./components/Vendors/vendorview";
import Createvendor from "./components/Vendors/createvendor";
import Vendoreyeview from "./components/Vendors/eyeview";
import Candidates from "./components/Candidates";

import Profile from "./profilepage";
import Eyeviewjob from "./components/Jobopening/eyeview";
import Eyeviewcandidate from "./components/Candidates/eyeview";
import Candidateview from "./components/Candidates/candidateviewform";
import Addcandidate from "./components/Candidates/addcandidate";
import Pipeline from "./components/Jobopening/pipeline";
import Jobopeningview from "./components/Jobopening/viewpage";
import Admindashboard from "./admindashboard.js";
import {
  BrowserRouter as Router,
  Switch,
  
  Route,
} from "react-router-dom";
import Login from "./components/Login/index.js";
import Register from "./components/Register/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/common/header";
import { toast } from "react-toastify";
// Navbar
import Calendar from "./calendar";

//Setting
import Setting from "./Setting";
import SettingPage from "./Setting/settingPage";

//Manage
import Manage from "./Manage";
import { connect } from "react-redux";

//Reports
import Reports from "./reports";
import FullPageLoader from "./components/PageLoader/FullPageLoader.js";

//postjob
import PostJobs from "./Jobpost";

function App(props) {
  const { message } = props;

  // useEffect(() => {
  //   if (message)
  //     toast.success(message)
  // }, [message])
  return (
    <React.Fragment>
      <Header />

      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Admindashboard />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/view">
          <View />
        </Route>
        
        <Route exact path="/createjob">
          <Createjob />
        </Route>
        <Route exact path="/eyeview">
          <Eyeviewjob />
        </Route>
        <Route exact path="/jobopening">
          <Jobopening />
        </Route>
        <Route exact path="/profilepage">
          <Profile />
        </Route>
        <Route exact path="/candidates">
          <Candidates />
        </Route>
        <Route exact path="/candidateview">
          <Candidateview />
        </Route>
        <Route exact path="/addcandidate">
          <Addcandidate />
        </Route>
        <Route exact path="/eyeviewcandidate">
          <Eyeviewcandidate />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/createclient">
          <Createclient />
        </Route>
        <Route exact path="/vendors">
          <Vendors />
        </Route>
        <Route exact path="/createvendor">
          <Createvendor />
        </Route>
        <Route exact path="/vendorview">
          <Vendorview />
        </Route>
        <Route exact path="/vendoreyeview">
          <Vendoreyeview />
        </Route>
        <Route exact path="/clienteyeview">
          <Clienteyeview />
        </Route>
        <Route exact path="/clientview">
          <Clientview />
        </Route>
        <Route exact path="/pipeline">
          <Pipeline />
        </Route>
        <Route exact path="/jobopeningview">
          <Jobopeningview />
        </Route>
        <Route exact path="/admindashboard">
          <Admindashboard />
        </Route>
        <Route exact path="/changeowner">
          <Changeowner />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/setting">
          <Setting />
        </Route>
        <Route exact path="/settingPage">
          <SettingPage />
        </Route>
        <Route exact path="/manage">
          <Manage />
        </Route>
        <Route exact path="/reports">
          <Reports />
        </Route>
        <Route exact path="/postJobs">
          <PostJobs />
        </Route>
      </Switch>
      <ToastContainer />
      <FullPageLoader />
    </React.Fragment>
  );
}
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(App);
