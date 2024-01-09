import React, { useState , useEffect} from "react";
import logo from "../resumrlogo.jpg";
import "./setting.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateUserProfile } from '../actions/profile';
import { getUserProfile } from '../actions/profile';
import { connect, useDispatch } from "react-redux";
import { getUsers } from "../actions/auth";
import {toast} from 'react-toastify';
// material ui
import { Grid, TextField, CardContent, Typography, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
}));

function SettingPage(props) {
  const dispatch = useDispatch();
  const { usersList,user: currentUser, } = props;
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const { profile=[] } = props;
  const [ showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserProfile(userDetails.id));
  }, [dispatch]);
  const [isUpdated, setIsUpdated] = useState(false);
  const editProfile = (e, prop) => {
    profile[prop] = e.target.value;
    // console.log(profile);
    setIsUpdated(!isUpdated);
  }
  const classes = useStyles();

  const defaultProps = {
    options: skills100,
    getOptionLabel: (option) => option.title,
  };

  //Switch
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setTimeZone(event.target.value);
  };

  const [, setTimeZone] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", marginLeft: "110px", marginTop: "0px" }}>
        <Grid item style={{ display: "flex", flex: "0.7" }} className="pe-md-5">
          <CardContent>
            <Grid item>
              <div className="d-flex justify-content-between">

              <Typography
              className="my-2"
                variant="h6"
                gutterBottom
                align="left"
                style={{ fontSize:"17px", fontWeight:"500"}}
                >
                Personal Details
              </Typography>
              {/* <Button style={{height:"32px", marginRight:"-235px"}}
                        className="btn bg-temp-blue text-center ms-2 btn-sm " 
                        
                        variant="contained"
                        onClick={()=>{
                          delete profile.password;
                            dispatch(updateUserProfile({...profile}));
                            toast.success("Profile updated successfully");
                        }}
                        >Save & update</Button> */}
                </div>
            </Grid>
            <form>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Name"
                    value= {currentUser.firstName + ' ' + currentUser.lastName}
                    label="Name"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Title"
                    label="Title"
                    value={profile.title}
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Department"
                    value={profile.department}
                    label="Department"
                    onChange={(e)=>editProfile(e, "department")}
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Email"
                    value={currentUser.email}
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                <TextField
                    size="small"
                    placeholder="Time Zone"
                    value={profile.timeZone}
                    label="Time Zone"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                  {/* <FormControl
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                  > */}
                    {/* <InputLabel id="demo-controlled-open-select-label">
                      City+TimeZone
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={0}
                      onChange={handleChange}
                    >
                      <MenuItem value="0">
                        None
                      </MenuItem>
                      <MenuItem value={1}>GMT+5:30</MenuItem>
                      <MenuItem value={2}>UTC+05:30</MenuItem>
                      <MenuItem value={3}>Denver (GMT-7)</MenuItem>
                      <MenuItem value={4}>Phoenix (GMT-7)</MenuItem>
                      <MenuItem value={5}>Anchorage (GMT-9)</MenuItem>
                    </Select>
                  </FormControl> */}
                </Grid>
                <Grid xs={12} sm={6} item>
                  {/* <Autocomplete
                    name="Country"
                    value=""
                    {...defaultProps}
                    id="debug"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{ shrink: true }}
                        style={{ width: "65%" }}
                        label="Country"
                        margin="normal"
                      />
                    )}
                  /> */}
                  <TextField
                    size="small"
                    placeholder="Country"
                    value={profile.address?profile.address.country : null}
                    label="Country1"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                  {console.log(profile, ' i am profile')}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Grid>
        
        <Grid
          item
          style={{
            display: "flex",
            flex: "0.3",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          
          <CardContent className="profile">
            <Avatar
              alt="profile-img"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
          </CardContent>
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "12px",
          backgroundColor: "#FCF2F4",
          paddingBottom: "15px",
        }}
      >
        <Grid item style={{ display: "flex", flex: "0.7" }}>
          <CardContent style={{ marginLeft: "110px" }}>
            <Grid item>
              <Typography 
              className="my-2"
                variant="h6"
                gutterBottom
                align="left"
                style={{ fontSize:"17px", fontWeight:"500" }}
              >
                Company Details
              </Typography>
            </Grid>
            <form>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Name"
                    value={profile.companyName}
                    label="Name"
                    value={profile.companyName}
                    onChange={(e)=>editProfile(e, "companyName")}
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Business Hours"
                    value={profile.workingHours}
                    label="Business Hours"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                {/* <Grid xs={12} sm={6} item>
                  <TextField
                    type="date"
                    size="small"
                    placeholder="Holidays Calendar"
                    label="Holidays Calendar"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid> */}
                {/* <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Website"
                    label="website"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid> */}
                <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="City"
                    value={profile.address?profile.address.city : null}
                    label="City"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  {/* <Autocomplete
                    name="Country"
                    {...defaultProps}
                    id="debug"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{ shrink: true }}
                        style={{ width: "65%" }}
                        label="Country"
                        margin="normal"
                      />
                    )}
                  /> */}
                   <TextField
                    size="small"
                    placeholder="Country"
                    value={profile.address?profile.address.country : null}
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid>
                {/* <Grid xs={12} sm={6} item>
                  <TextField
                    size="small"
                    placeholder="Address"
                    label="Adress"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: "65%" }}
                    fullWidth
                  />
                </Grid> */}
              </Grid>
            </form>
          </CardContent>
        </Grid>
        <Grid item style={{ display: "flex", flex: "0.3", margin: "auto" }}>
          <CardContent className="profile">
            <img
              style={{
                borderRadius: "5px",
                border: "1px solid grey",
                marginLeft: "40px",
              }}
              src={logo}
              alt="profile-img"
              className="personal_profile"
            />
          </CardContent>
        </Grid>
      </div>
      <CardContent style={{ marginLeft: "110px" }}>
        <Grid item className="pe-md-5">
          <Typography variant="h6" gutterBottom align="left" style={{ fontSize:"17px", fontWeight:"500"}}>
            Email Setting
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="emailSetting"
          style={{ marginTop: "30px" }}
        >
          <Grid item className="email1">
            <span style={{ fontWeight: "250", color: "white" }}>
              Configure Mail
            </span>
          </Grid>
          <Grid item className="email2">
            <span style={{ fontWeight: "250", color: "white" }}>
              Add Available Apllication
            </span>
          </Grid>
          <Grid item className="email3">
            <span style={{ fontWeight: "250", color: "white" }}>
              Email from Available Server
            </span>
          </Grid>
        </Grid>
      </CardContent>
      <div
        style={{
          backgroundColor: "#E7F8FF",
          paddingBottom: "20px",
          marginTop: "25px",
        }}
      >
        <CardContent style={{ marginLeft: "110px" }}>
          <Grid item>
            <Typography variant="h6" gutterBottom align="left" style={{fontSize:"17px", fontWeight:"500"}}>
              Notifications
            </Typography>
          </Grid>
        </CardContent>
        <Grid Container style={{ display: "flex" }}>
          <div style={{ display: "flex", flex: "0.5" }}>
            <Grid
              style={{ marginLeft: "55px" }}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              className=""
            >
              <Grid item className="" style={{ marginBottom: "9px"}}>
                <span className="alertHeading" style={{fontSize:"17px", fontWeight:"500"}}>Job Opening Notification</span>
                <div style={{ marginTop: "12px" }}>
                  <span>Add to Job</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Online Apply to Carrersite</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Status Change</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Job Posting</span>
                </div>
              </Grid>
              <Grid item className="">
                <span className="alertHeading"  style={{fontSize:"17px", fontWeight:"500"}}>Alert</span>
                <div style={{ marginTop: "8px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA16}
                      onChange={handleChange}
                      name="checkedA16"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA15}
                      onChange={handleChange}
                      name="checkedA15"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA14}
                      onChange={handleChange}
                      name="checkedA14"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA13}
                      onChange={handleChange}
                      name="checkedA13"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
              </Grid>
              <Grid item className="">
                <span className="alertHeading"  style={{fontSize:"17px", fontWeight:"500"}}>Email</span>
                <div style={{ marginTop: "8px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA12}
                      onChange={handleChange}
                      name="checkedA12"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA11}
                      onChange={handleChange}
                      name="checkedA11"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA10}
                      onChange={handleChange}
                      name="checkedA10"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA9}
                      onChange={handleChange}
                      name="checkedA9"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
          <div style={{ display: "flex", flex: "0.5" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              className=""
            >
              <Grid item className="" style={{ marginBottom: "8px" }}>
                <span className="alertHeading"  style={{fontSize:"17px", fontWeight:"500"}}>Candidate Notification</span>
                <div style={{ marginTop: "12px" }}>
                  <span>Candidate Added </span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Associated to Candidate</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span> Status Change</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Submit to Client</span>
                </div>
              </Grid>
              <Grid item className="">
                <span className="alertHeading"  style={{fontSize:"17px", fontWeight:"500"}}>Alert</span>
                <div style={{ marginTop: "8px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA8}
                      onChange={handleChange}
                      name="checkedA8"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA7}
                      onChange={handleChange}
                      name="checkedA7"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA6}
                      onChange={handleChange}
                      name="checkedA6"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA5}
                      onChange={handleChange}
                      name="checkedA5"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
              </Grid>
              <Grid item className="">
                <span className="alertHeading"  style={{fontSize:"17px", fontWeight:"500"}}>Email</span>
                <div style={{ marginTop: "12px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA4}
                      onChange={handleChange}
                      name="checkedA4"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA3}
                      onChange={handleChange}
                      name="checkedA3"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA2}
                      onChange={handleChange}
                      name="checkedA2"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={state.checkedA1}
                      onChange={handleChange}
                      name="checkedA1"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>

      <div style={{ margin: "25px 0px", marginLeft: "110px" }}>
        <CardContent>
          <Grid item>
            <span className="alertHeading">General Notifications</span>
            <span>
              <Switch
                color="primary"
                checked={state.checkedA17}
                onChange={handleChange}
                name="checkedA17"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </span>
          </Grid>
        </CardContent>
      </div>
    </>
  );
}
const skills100 = [
  // { title: "India" },
  { title: "USA" },
  { title: "France" },
  { title: "Spain " },
  { title: "Germany " },
  { title: "Italy" },
  { title: "Greece" },
];
function mapStateToProps(state) {
  const { usersList } = state.auth;
  const { user } = state.auth;
  const { profile } = state.profile;
  return {
    usersList,
    user,
    profile
  };
}

export default connect(mapStateToProps)(SettingPage);