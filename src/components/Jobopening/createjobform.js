/* eslint-disable react-hooks/exhaustive-deps */
import "../../App.css";
import "./Jobopening.css";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";

import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
  Button,
  Box,
  Link,
  Chip,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getClients } from "../../actions/client";
import { getUsers } from "../../actions/auth";
import { addJob } from "../../actions/job";
import { getFile, uploadFile } from "../../actions/upload";
import { AttachFile, AddCircleOutline } from "@material-ui/icons";
import AddClientDialog from "./AddClientDialog";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { clients, usersList = [], fileLink } = props;
  const [selectedDate, setSelectedDate] = useState({
    openingDate: new Date(),
    targetDate: new Date(),
    closingDate: new Date(),
  });
  const handleDateChange = (date, name) => {
    setSelectedDate({
      ...selectedDate,
      [name]: date,
    });
  };
  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });
  const defaultProps = {
    options: skills100,
    getOptionLabel: (option) => option.title,
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const updatedUser = {
    ...user,
    fullName: user.firstName + " " + user.lastName,
  };
  const [state, setState] = useState({
    jobTitle: "",
    jobType: "None",
    clientName: "",
    jobOpeningStatus: "None",
    endClient: "",
    jobCreatedBy: updatedUser,
    openingDate: "",
    accountManager: "",
    leadRecruiter: "",
    assignedRecruiter: "",
    positions: "",
    duration: "",
    education: 0,
    clientReqId: "",
    jobLocation: "",
    zipCode: "",
    state: "",
    country: "",
    jobModel: "",
    remoteJob: false,
    salary: null,
    expenses: "",
    hourlyRate: "",
    visaType: "",
    taxType: "",
    benefits: "",
    fileAttached: "",
    jobDescription: "",
  });

  const [clientContactName, setClientContactName] = useState("");
  const [clientId, setClientId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [addClientDialog, setAddClientDialog] = useState(false);
  const [workExp, setWorkExp] = useState({
    minWorkExp: null,
    maxWorkExp: null,
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (name === "minWorkExp" || name === "maxWorkExp") {
      setWorkExp({
        ...workExp,
        [name]: type === "number" ? parseInt(value) : value,
      });
    } else {
      setState({
        ...state,
        [name]: type === "number" ? parseInt(value) : value,
      });
    }
  };

  const getClientContactNames = (clients, selectedClient) => {
    const contactNames = [];
    let { contactPersons, id } = clients?.filter(
      (val) => val?.name === selectedClient?.name
    )[0];
    contactPersons?.forEach((item) => contactNames?.push(item?.name));
    setClientContactName(contactNames?.join(", "));
    setClientId(id);
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    dispatch(uploadFile(selectedFiles[0]));
  };

  const downloadFile = () => {
    dispatch(getFile(state.fileAttached));
  };

  useEffect(() => {
    setState({
      ...state,
      fileAttached: fileLink,
    });
  }, [fileLink]);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getUsers());
  }, []);

  const handleSaveJob = () => {
    const payload = {
      ...state,
      ...selectedDate,
      clientName: state.clientName.name,
      accountManager:
        state.accountManager.firstName + " " + state.accountManager.lastName,
      leadRecruiter:
        state.leadRecruiter.firstName + " " + state.leadRecruiter.lastName,
      assignedRecruiter:
        state.assignedRecruiter.firstName +
        " " +
        state.assignedRecruiter.lastName,
      jobCreatedBy: state.jobCreatedBy.id,
      prefferedSkills: [skills.skill1.title, skills.skill2.title, skills.skill3.title],
      clientContactName,
      clientId,
      workExp,
    };

    dispatch(addJob(payload)).then(() => {
      history.push("/jobopening");
    });
  };

  return (
    <>
      <div className="App">
        <Grid>
          <Card>
            <div
              className="px-md-4 pb-1"
              style={{ backgroundColor: "#E7F8FF" }}
            >
              <CardContent className="px-md-5 p-2 ">
                <Grid item>
                  <Box p={0} className="d-flex flex-wrap">
                    <Box p={0} flexGrow={1}>
                      <div style={{ width: "100%" }} className="py-2">
                        <Typography
                          className="px-3 text-temp-blue"
                         
                          gutterBottom
                          align="left"
                        >
                         <span className="rounded p-2" style={{fontWeight:"500",fontSize:"17px",border:"1px solid #5e729f"}}>  Create Job Opening </span>
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      p={0}
                      className="pe-md-3 ms-3 ms-md-0

                       d-flex justify-content-center align-items-center flex-wrap"
                    >
                      <Link href="/jobopening" className="text-decoration-none">
                        {/* <Button
                          variant="contained"
                          align="right"
                          size="small"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                          className="btn bg-white ms-2 "
                        >
                          Save and Post
                        </Button> */}
                      </Link>
                      <Button
                        variant="contained"
                        align="right"
                        size="small"
                        color="primary"
                        className="ms-2"
                        onClick={handleSaveJob}
                      >
                        Save
                      </Button>
                      <Link href="/jobopening" className="text-decoration-none">
                        <Button
                          variant="contained"
                          color="Secondary"
                          align="right"
                          size="small"
                          className="ms-2"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              </CardContent>
            </div>
            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid item>
                  <Typography
                   
                    gutterBottom
                    align="left"
                    className="pb-3"
                  >
                    <span style={{fontSize:"17px",fontWeight:"500"}}> Job Information </span>
                  </Typography>
                </Grid>
                <form
                  className=" border border-2 p-md-5 pt-md-4 p-2  "
                  style={{ borderRadius: "10px" }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="normal"
                        name="jobTitle"
                        value={state.jobTitle}
                        label="Job Title"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Job Type
                        </InputLabel>
                        <Select
                          native
                          value={state.jobType}
                          name="jobType"
                          onChange={handleChange}
                          label="Job Type"
                          inputProps={{
                            name: "jobType",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={"None"}>None</option>
                          <option value={"Contract"}>Contract</option>
                          <option value={"Full Time"}>Full Time</option>
                          <option value={"Part Time"}>Part Time</option>
                          <option value={"C2H"}>C2H</option>
                          <option value={"Freelance"}>Freelance</option>
                          <option value={"Others"}>Others</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5 d-flex">
                      <Autocomplete
                        options={clients}
                        getOptionLabel={(option) => option.name || ""}
                        id="controlled-demo"
                        name="clientName"
                        value={state.clientName}
                        style={{ width: "100%" }}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            clientName: newValue,
                          });
                          getClientContactNames(clients, newValue);
                          // setClientContactName()
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Client Name"
                            margin="normal"
                          />
                        )}
                      />
                      <Tooltip
                        title="Add New Client"
                        placement="bottom"
                        style={{ cursor: "pointer" }}
                      >
                        <AddCircleOutline
                          className="d-block mt-3 ml-5"
                          onClick={() => setAddClientDialog(true)}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Job Opening status
                        </InputLabel>
                        <Select
                          native
                          name="jobOpeningStatus"
                          onChange={handleChange}
                          value={state.jobOpeningStatus}
                          label="Job Opening status"
                          inputProps={{
                            name: "jobOpeningStatus",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={"None"}>None</option>
                          <option value={"In Progress"}>In Progress</option>
                          <option value={"Active"}>Active</option>
                          <option value={"On Hold"}>On Hold</option>
                          <option value={"Interviewing"}>Interviewing</option>
                          <option value={"Filed"}>Filled</option>
                          <option value={"Upcoming"}>Upcoming</option>
                          <option value={"Waiting for Approval"}>
                            Waiting for Approval
                          </option>
                          <option value={"Closed"}>Closed</option>
                          <option value={"Cancelled"}>Cancelled</option>
                          <option value={"Hired"}>Hired</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.endClient}
                        name="endClient"
                        label="End Client"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={clientContactName}
                        name="clientContactName"
                        label="Contact Name"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        disabled
                        // onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        name="jobCreatedBy"
                        value={state.jobCreatedBy}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            jobCreatedBy: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="standard-basic"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            {...params}
                            label="Created By"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        style={{ margin: "0px 0px" }}
                      >
                        <KeyboardDatePicker
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date Opened"
                          value={selectedDate.openingDate}
                          onChange={(e) => handleDateChange(e, "openingDate")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        style={{ margin: "0px 0px" }}
                      >
                        <KeyboardDatePicker
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Target Date"
                          value={selectedDate.targetDate}
                          onChange={(e) => handleDateChange(e, "targetDate")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        style={{ margin: "0px 0px" }}
                      >
                        <KeyboardDatePicker
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Closing Date"
                          value={selectedDate.closingDate}
                          onChange={(e) => handleDateChange(e, "closingDate")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        name="accountManager"
                        value={state.accountManager}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            accountManager: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Account Manager"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        name="leadRecruiter"
                        value={state.leadRecruiter}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            leadRecruiter: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Lead Recruiter"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        name="assignedRecruiter"
                        value={state.assignedRecruiter}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            assignedRecruiter: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Assigned Recruiter"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.positions}
                        name="positions"
                        label="No. of Positions"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.duration}
                        type="number"
                        name="duration"
                        label="Duration (months)"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Education
                        </InputLabel>
                        <Select
                          native
                          value={state.education}
                          name="education"
                          onChange={handleChange}
                          label="Education"
                          inputProps={{
                            name: "education",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"Bachelor Degree"}>
                            Bachelor Degree
                          </option>
                          <option value={"Master Degree"}>Master Degree</option>
                          <option value={"PHD"}>PHD</option>
                          <option value={"Others"}>Others</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.clientReqId}
                        name="clientReqId"
                        label="Client REQ No"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid item>
                  <Typography
                    
                    gutterBottom
                    align="left"
                    className="pb-3"
                  >
                    <span style={{fontSize:"17px",fontWeight:"500"}}> Skills </span>
                  </Typography>
                </Grid>
                <form
                  className=" border border-2 p-md-5 pt-md-4 p-2  "
                  style={{ borderRadius: "10px" }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill1"
                          value={skills.skill1}
                          {...defaultProps}
                          id="debug"
                          debug
                          onChange={(event, newValue) => {
                            setSkills({
                              ...skills,
                              skill1: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputLabelProps={{ shrink: true }}
                              label="Primary Skil"
                              margin="normal"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill2"
                          value={skills.skill2}
                          onChange={(event, newValue) => {
                            setSkills({
                              ...skills,
                              skill2: newValue,
                            });
                          }}
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputLabelProps={{ shrink: true }}
                              label="Secondary Skill"
                              margin="normal"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill3"
                          value={skills.skill3}
                          onChange={(event, newValue) => {
                            setSkills({
                              ...skills,
                              skill3: newValue,
                            });
                          }}
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputLabelProps={{ shrink: true }}
                              label="Other Skill"
                              margin="normal"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid item>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    className="pb-3"
                  >
                    <span style={{fontSize:"17px",fontWeight:"500"}}> Address </span>
                  </Typography>
                </Grid>
                <form
                  className=" border border-2 p-md-5 pt-md-4 p-2  "
                  style={{ borderRadius: "10px" }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        id="standard-basic"
                        size="small"
                        value={state.jobLocation}
                        name="jobLocation"
                        label="City"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.zipCode}
                        name="zipCode"
                        label="Zip Code"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.state}
                        name="state"
                        label="State"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.country}
                        name="country"
                        label="Country"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid item>
                  <Typography
                    
                    gutterBottom
                    align="left"
                    className="pb-3"
                  >
                     <span style={{fontSize:"17px",fontWeight:"500"}}>Job Budget</span>
                  </Typography>
                </Grid>
                <form
                  className=" border border-2 p-md-5 pt-md-4 p-2  "
                  style={{ borderRadius: "10px" }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Job Model
                        </InputLabel>
                        <Select
                          native
                          value={state.jobModel}
                          name="jobModel"
                          onChange={handleChange}
                          label="Job Model"
                          inputProps={{
                            name: "jobModel",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"Strategic Partner"}>
                            Strategic Partner
                          </option>
                          <option value={"Direct Client"}>Direct Client</option>
                          <option value={"Direct to Transfer"}>
                            Direct to Transfer
                          </option>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Remote/Onsite
                        </InputLabel>
                        <Select
                          native
                          value={state.remoteJob}
                          name="remoteJob"
                          onChange={handleChange}
                          label="Remote/Onsite"
                          inputProps={{
                            name: "remoteJob",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      {/* <FormControl
                    InputLabelProps={{ shrink: true }} 
fullWidth
                    size="small"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Work Experience
                    </InputLabel>
                    <Select
                      native
                      value={state.workExp}
                      name="workExp"
                      onChange={handleChange}
                      label="Work Experience"
                      inputProps={{
                        name: "workExp",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value={0} >None</option>
                      <option value={'0-1'}>0-1</option>
                      <option value={'1-3'}>1-3</option>
                      <option value={'3-5'}>3-5</option>
                      <option value={'5-7'}>5-7</option>
                      <option value={'7-9'}>7-9</option>
                      <option value={'10+'}>10+</option>
                    </Select>
                  </FormControl> */}
                      <TextField
                        size="small"
                        value={workExp.minWorkExp}
                        name="minWorkExp"
                        label="Min Work Exp"
                        type="number"
                        style={{ width: "50%" }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                      <TextField
                        size="small"
                        value={workExp.maxWorkExp}
                        name="maxWorkExp"
                        label="Max Work Exp"
                        type="number"
                        style={{ width: "50%" }}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.salary}
                        name="salary"
                        label="Annual Salary"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.expenses}
                        name="expenses"
                        label="Expenses"
                        s
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        value={state.hourlyRate}
                        name="hourlyRate"
                        type="number"
                        label="Hourly Rate"
                        s
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Visa Type
                        </InputLabel>
                        <Select
                          native
                          value={state.visaType}
                          name="visaType"
                          onChange={handleChange}
                          label="Visa Type"
                          inputProps={{
                            name: "visaType",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"Only USC"}>Only USC</option>
                          <option value={"USC,GC"}>USC,GC</option>
                          <option value={"USC,GC,EAD,TN"}>USC,GC,EAD,TN</option>
                          <option value={"H1B"}>H1B</option>
                          <option value={"ALL"}>ALL</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Tax Type
                        </InputLabel>
                        <Select
                          native
                          value={state.taxType}
                          name="taxType"
                          onChange={handleChange}
                          label="Tax Type"
                          inputProps={{
                            name: "taxType",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"W2"}>W2</option>
                          <option value={"1099C2C"}>1099C2C</option>
                          <option value={"C2C"}>C2C</option>
                          <option value={"ALL"}>ALL</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Benefits
                        </InputLabel>
                        <Select
                          native
                          value={state.benefits}
                          name="benefits"
                          onChange={handleChange}
                          label="Benefits"
                          inputProps={{
                            name: "benefits",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"Yes"}>Yes</option>
                          <option value={"No"}>No</option>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid item>
                  <div style={{ width: "100%" }}>
                    <Box display="flex" p={0} bgcolor="background.paper">
                      <Box p={0} flexGrow={1}>
                        <Typography
                         
                          gutterBottom
                          align="left"
                          className="py-2 ps-n2"
                        >
                           <span style={{fontSize:"17px",fontWeight:"500"}}>Job Description </span>
                        </Typography>
                      </Box>
                      <Box p={1}>
                        {!selectedFiles && (
                          <label htmlFor="btn-upload">
                            <input
                              id="btn-upload"
                              name="btn-upload"
                              style={{ display: "none" }}
                              type="file"
                              onChange={selectFile}
                            />
                            <Button
                              className="btn-choose"
                              variant="contained"
                              color="primary"
                              disabled={selectedFiles?.length}
                              component="span"
                            >
                              Choose File <AttachFile />
                            </Button>
                          </label>
                        )}
                        {selectedFiles && (
                          <Chip
                            label={selectedFiles ? selectedFiles[0]?.name : ""}
                            style={{ marginRight: 10 }}
                            onDelete={() => {
                              setSelectedFiles(null);
                              setState({ ...state, fileAttached: null });
                            }}
                          />
                        )}
                        {selectedFiles && !state.fileAttached && (
                          <Button
                            className="btn-choose"
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            disabled={!selectedFiles?.length}
                            component="span"
                          >
                            Upload
                          </Button>
                        )}
                        {state.fileAttached ? (
                          <Tooltip
                            title="Click to download Document"
                            placement="bottom"
                            style={{ cursor: "pointer" }}
                          >
                            <GetAppIcon onClick={downloadFile} />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </div>
                </Grid>
                <Card variant="outlined">
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    multiline
                    rows={7}
                    value={state.jobDescription}
                    onChange={handleChange}
                    name="jobDescription"
                    placeholder="Enter Job Description here"
                  />
                </Card>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <AddClientDialog
          openDialog={addClientDialog}
          closeDialog={(val) => setAddClientDialog(val)}
        />
      </div>
    </>
  );
}
const skills100 = [
  { title: "Application Testing " },
  { title: "Software " },
  { title: "QA Engineering " },
  { title: "Quality Assurance " },
  { title: "Quality Engineering " },
  { title: "Software Quality " },
  { title: "Software Quality Assurance " },
  { title: "Test Design " },
  { title: "Reporting " },
  { title: "Computer Networking  " },
  { title: "IP Networking  " },
  { title: "Leadership " },
  { title: "Project Development" },
  { title: "SEQUEL " },
  { title: "SQL" },
  { title: "Microsoft Office  " },
  { title: "Teachers " },
  { title: "Training Delivery  " },
  { title: "Application Support " },
  { title: "Desktop Support " },
  { title: "End User Support" },
  { title: "Hardware Support" },
  { title: "IT Support  " },
  { title: "Software Support" },
  { title: "Technical Support  " },
  { title: "1st Line Support " },
  { title: "Remediation" },
  { title: "Microsoft Operating Systems" },
  { title: "Microsoft windows" },
  { title: "Application Development  " },
  { title: "DatatBase Development  " },
  { title: "DataBase Design" },
  { title: "Database " },
  { title: "OLE DB" },
  { title: "Physical Design" },
  { title: "Physical Data Model" },
  { title: "Documentation " },
  { title: "Computer Hardware" },
  { title: "Desktop Hardware" },
  { title: "Client Services" },
  { title: "Customer Services" },
  { title: "BRD" },
  { title: "Bussiness Requirements" },
  { title: "Agile" },
  { title: "Management" },
  { title: "Security" },
  { title: "Contractions" },
  { title: "Java" },
  { title: "Devops" },
  { title: "Active  Directory" },
  { title: "Microsoft Excel" },
  { title: "Sales" },
  { title: "Business Analyst" },
  { title: "JavaScript" },
  { title: "HTML" },
  { title: "Integration" },
  { title: "Linux Server" },
  { title: "Buget Development" },
  { title: "Budget Managmnet" },
  { title: "Cost Accounting" },
  { title: "MS SQL" },
  { title: "Microsoft SQL Server" },
  { title: "SQL profiler" },
  { title: "Information Technology" },
  { title: "Python" },
  { title: "Implementations" },
  { title: "CM" },
  { title: "Change management" },
  { title: "Configuaration Management" },
  { title: "Cloud" },
  { title: "AWS" },
  { title: "Azure" },
  { title: "GCP" },
  { title: "Devops" },
  { title: "CICD" },
  { title: ".Net" },
  { title: "C#" },
  { title: "Splunk" },
  { title: "SharePoint" },
];

function mapStateToProps(state) {
  const { clients } = state.client;
  const { usersList } = state.auth;
  const { message } = state.message;
  const { fileLink } = state.upload;

  return {
    clients,
    usersList,
    message,
    fileLink,
  };
}

export default connect(mapStateToProps)(App);
