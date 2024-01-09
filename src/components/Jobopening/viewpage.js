/* eslint-disable react-hooks/exhaustive-deps */
import "../../App.css";
import React, { useState, useEffect } from "react";
import {
  ArrowBack,
  Assessment,
  AssignmentTurnedIn,
  Close,
  Edit,
  LibraryBooks,
  PersonAdd,
  Work,
} from "@material-ui/icons";
import RateReviewIcon from "@material-ui/icons/RateReview";
import "./Jobopening.css";
import { Chip, Tooltip } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AssociateCandidate from "./AssociateCandidate";

import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Button,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getClients } from "../../actions/client";
import { getUsers } from "../../actions/auth";
import { getPrefferedCandidate, updateJob } from "../../actions/job";
import { withStyles } from "@material-ui/styles";
import { getFile, uploadFile } from "../../actions/upload";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import GetAppIcon from "@material-ui/icons/GetApp";
import Candidates from "../Candidates";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 12,
    marginTop: "1.6rem",
  },
}))(Tooltip);

function App(props) {
  const classes = useStyles();
  const location = useLocation();

  const dispatch = useDispatch();
  const history = useHistory();
  const [showAssociateCandidate, setShowAssociateCandidate] = useState(false);
  const { clients, usersList = [], fileLink } = props;
  const [showCandidates, setShowCandidates] = useState(false);

  const {
    id,
    jobTitle,
    jobType,
    clientName,
    jobOpeningStatus,
    endClient,
    openingDate,
    targetDate,
    closingDate,
    accountManager,
    leadRecruiter,
    assignedRecruiter,
    positions,
    duration,
    education,
    clientReqId,
    jobLocation,
    jobId,
    zipCode,
    country,
    remoteJob,
    jobModel,
    salary,
    expenses,
    hourlyRate,
    visaType,
    taxType,
    benefits,
    jobDescription,
    fileAttached,
    createdByFirstName,
    createdByLastName,
    isHots,
    prefferedSkills,
    jobCandidateMappings,
  } = location?.state?.data;

  const [selectedDate, setSelectedDate] = useState({
    openingDate,
    targetDate,
    closingDate,
  });

  const [statsCount, setStatsCount] = useState({
    screening: 0,
    clientReview: 0,
    interviewing: 0,
    offered: 0,
    placements: 0,
  });

  const [state, setState] = useState({
    id,
    jobTitle,
    jobType,
    clientName: "",
    jobOpeningStatus,
    endClient,
    jobId,
    jobCreatedBy: createdByFirstName + " " + createdByLastName,
    openingDate,
    accountManager: "",
    leadRecruiter: "",
    assignedRecruiter: "",
    positions,
    duration,
    education,
    clientReqId,
    jobLocation,
    zipCode,
    state: location?.state?.data?.state,
    country,
    jobModel,
    remoteJob,
    salary,
    expenses,
    hourlyRate,
    visaType,
    taxType,
    benefits,
    fileAttached,
    jobDescription,
    jobCandidateMappings,
    isHots,
    prefferedSkills
  });

  useEffect(() => {
    if (clients.length) {
      setState({
        ...state,
        clientName: clients?.filter((item) => item.name === clientName)[0],
      });
    }
  }, [clients]);

  const [skills, setSkills] = useState({
    skill1: {title: prefferedSkills && prefferedSkills[0]},
    skill2: {title: prefferedSkills && prefferedSkills[1]},
    skill3: {title: prefferedSkills && prefferedSkills[2]},
  });
  const defaultProps = {
    options: skills100,
    getOptionLabel: (option) => option.title,
  };

  useEffect(() => {
    if (jobCandidateMappings.length) {
      let screening = 0;
      let clientReview = 0;
      let interviewing = 0;
      let offered = 0;
      let placements = 0;
      jobCandidateMappings.forEach((mapping) => {
        if (mapping.status === "Screening") {
          screening++;
        }
        if (mapping.status === "Client Review") {
          clientReview++;
        }
        if (mapping.status === "Interviewing") {
          interviewing++;
        }
        if (mapping.status === "Offered") {
          offered++;
        }
        if (mapping.status === "Hired") {
          placements++;
        }
      });
      setStatsCount({
        screening,
        clientReview,
        interviewing,
        offered,
        placements,
      });
    }
  }, [jobCandidateMappings]);

  useEffect(() => {
    if (fileLink) {
      setState({
        ...state,
        fileAttached: fileLink,
      });
      dispatch(updateJob(state.id, { fileAttached: fileLink }));
    }
  }, [fileLink]);

  useEffect(() => {
    if (usersList.length) {
      setState({
        ...state,
        accountManager: usersList?.filter(
          (item) => item.fullName === accountManager
        )[0],
        leadRecruiter: usersList?.filter(
          (item) => item.fullName === leadRecruiter
        )[0],
        assignedRecruiter: usersList?.filter(
          (item) => item.fullName === assignedRecruiter
        )[0],
      });
    }
  }, [usersList]);

  const [edit, setEditMode] = React.useState(false);

  const [clientContactName, setClientContactName] = React.useState(
    location?.state?.data?.clientContactName
  );
  const [clientId, setClientId] = React.useState(
    location?.state?.data?.clientId
  );
  const [workExp, ] = React.useState({
    minWorkExp: location?.state?.data?.workExp.minWorkExp,
    maxWorkExp: location?.state?.data?.workExp.maxWorkExp,
  });

  const handleDateChange = (date, name) => {
    setSelectedDate({
      ...selectedDate,
      [name]: date,
    });
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

  useEffect(() => {
    dispatch(getClients());
    dispatch(getUsers());
  }, []);

  const [selectedFiles, setSelectedFiles] = useState([
    { name: state.fileAttached?.split("-bezkoder-")[1] },
  ]);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleFindMatchingCandidates = () => {
    dispatch(getPrefferedCandidate(state.id)).then(res => {
      history.push({
        pathname: '/candidates',
        search: `?jobTitle=${state.jobTitle}`,
      })
    })
  }
  const handleSaveJob = () => {
    const payload = {
      ...state,
      ...selectedDate,
      clientName: state?.clientName?.name,
      accountManager:
        state.accountManager?.firstName + " " + state.accountManager?.lastName,
      leadRecruiter:
        state.leadRecruiter?.firstName + " " + state.leadRecruiter?.lastName,
      assignedRecruiter:
        state.assignedRecruiter?.firstName +
        " " +
        state.assignedRecruiter?.lastName,
      jobCreatedBy: state.jobCreatedBy?.id,
      prefferedSkills: [skills?.skill1?.title, skills?.skill2?.title, skills?.skill3?.title],
      clientContactName,
      clientId,
      workExp,
    };

    dispatch(updateJob(state.id, payload)).then(() => {
      setEditMode(false);
    });
  };

  return (
    <>
      {showCandidates === false ? (
        <>
          <div className="viewpage">
            <Grid>
              <Card>
                <div
                  className="px-md-4 pb-1"
                  style={{ backgroundColor: "#E7F8FF" }}
                >
                  <CardContent className="px-md-5 p-2 ps-md-0 ">
                    <Grid item>
                      <Box p={0} className="d-flex flex-wrap">
                        <Box p={0} flexGrow={1}>
                          <div style={{ width: "100%" }} className="py-2">
                            <Typography
                              className="px-3 ps-0"
                              variant="h6"
                              align="left"
                            >
                              <div
                                style={{ fontSize: "20px" }}
                                className="d-flex "
                              >
                                <div className="">
                                  <span className="btn back-button border rounded-3 d-flex align-items-center me-2">
                                    <a href="/jobopening">
                                      <ArrowBack className="text-white" />
                                    </a>
                                  </span>
                                </div>
                                <span className="text-capitalize ps-2">
                                  {state.jobTitle} -{" "}
                                  <span className="text-temp-blue">
                                    {state.clientName.name}
                                  </span>
                                  {/* <br /> */}
                                  {/* <span> {state.duration} Months</span> */}
                                </span>
                                <span className="d-flex flex-column justify-content-center align-items-center ms-2 ">
                                  <span
                                    style={{ fontSize: "12px" }}
                                    className="badge rounded-pill bg-temp-blue "
                                  >
                                    {state.jobOpeningStatus}
                                  </span>
                                </span>
                                {edit ? (
                                  <></>
                                ) : (
                                  <div
                                    className="d-flex flex-column justify-content-center align-items-center ms-2 cursor-pointer "
                                    onClick={() =>
                                      edit
                                        ? setEditMode(false)
                                        : setEditMode(true)
                                    }
                                  >
                                    <CustomTooltip
                                      title="Edit Job"
                                      placement="bottom"
                                      className="cursor-pointer"
                                    >
                                      <Edit />
                                    </CustomTooltip>
                                  </div>
                                )}
                              </div>
                            </Typography>
                          </div>
                        </Box>

                        <Box
                          p={0}
                          className="pe-md-3 ms-3 ms-md-0

                       d-flex justify-content-center align-items-center flex-wrap "
                        >
                          {!edit ? (
                            <> </>
                          ) : (
                            <div>
                              <Button
                                variant="contained"
                                color="Secondary"
                                align="right"
                                size="small"
                                className="ms-2"
                                onClick={handleSaveJob}
                              >
                                Save
                              </Button>

                              <Button
                                variant="contained"
                                color="white"
                                align="right"
                                size="small"
                                className="ms-2"
                                onClick={() =>
                                  edit ? setEditMode(false) : setEditMode(true)
                                }
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                          <div className="ms-2 btn bg-white border ">
                            <CustomTooltip
                              title="Associate Candidate"
                              placement="bottom"
                              className="cursor-pointer"
                            >
                              <PersonAdd
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowAssociateCandidate(true);
                                }}
                              />
                            </CustomTooltip>
                          </div>
                          <div className="ms-2 btn bg-white border ">
                          
                            <CustomTooltip
                              title="Find Matching Candidates"
                              placement="bottom"
                              className="cursor-pointer"
                              onClick={handleFindMatchingCandidates}
                            >
                              <svg
                                className="MuiSvgIcon-root  cursor-pointer"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z"
                                />
                              </svg>
                            </CustomTooltip>
                          </div>
                        </Box>
                      </Box>
                    </Grid>
                  </CardContent>

                  {/* <CardContent
                className="px-md-5 p-4 pb-4 pt-2"
                style={{ backgroundColor: "#E7F8FF" }}
              >
                <div className="   pb-3 d-flex justify-content-center flex-row flex-wrap ">
                  <div className="pe-sm-2 pb-2 ">
                    <span className="pipeline">
                      <span style={{ fontWeight: "400" }}>Pipeline</span>
                      <span style={{ fontWeight: "600" }}>
                        <a
                          className="text-black"
                          href="/pipeline"
                          target="_self"
                        >
                          (4)
                        </a>
                      </span>
                    </span>
                  </div>
                  <div className="pe-sm-2 pb-2 ">
                    <div className="clientSubmission ">
                      <span style={{ fontWeight: "400" }}>
                        Client Submission
                      </span>
                      <span style={{ fontWeight: "600" }}>
                        <a
                          className="text-black"
                          href="/pipeline"
                          target="_self"
                        >
                          (4)
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="pe-sm-2 pb-2 ">
                    <span className="interview">
                      <span style={{ fontWeight: "400" }}>Interview</span>
                      <span style={{ fontWeight: "600" }}>
                        <a
                          className="text-black"
                          href="/pipeline"
                          target="_self"
                        >
                          (4)
                        </a>
                      </span>
                    </span>
                  </div>
                  <div className="pe-sm-2 pb-2 ">
                    <span className="offered">
                      <span style={{ fontWeight: "400" }}>Offered</span>
                      <span style={{ fontWeight: "600" }}>
                        <a
                          className="text-black"
                          href="/pipeline"
                          target="_self"
                        >
                          (4)
                        </a>
                      </span>
                    </span>
                  </div>
                  <div className="pe-sm-2 pb-2">
                    <span className="placement">
                      <span style={{ fontWeight: "400" }}>Placement</span>
                      <span style={{ fontWeight: "600" }}>
                        <a
                          className="text-black"
                          href="/pipeline"
                          target="_self"
                        >
                          (4)
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent> */}
                </div>
                <div className="px-md-4 p-2 ">
                  <CardContent className="px-md-5 mx-md-3 ">
                    <Grid item>
                      <div className="row g-0 col-12 justify-content-lg-between cursor-pointer">
                        <div className=" col-md-4 col-lg-2 col-sm-6 col-xs-6 ">
                          <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                            <div
                              className="card-body 
                          "   style={{width:"85%", marginBottom:'-4%', marginTop:"-4%"}}
                            >
                              <div
                                className="row g-0 d-flex flex-row justify-content-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowCandidates(true);
                                }}
                              >
                                <div className="col-4 d-flex align-items-center justify-content-center rounded-10 text-center bg-info bg-gradient ">
                                  <Work className="text-white" />
                                </div>
                                <div className="  col-8  ">
                                  <div className="ms-2 d-flex flex-column ">
                                    <h5
                                      className="text-nowrap text-muted text-uppercase"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight:"400"
                                      }}
                                    >
                                      Screening
                                    </h5>
                                    <p className="card-text text-black">
                                      {statsCount.screening}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6  ">
                          <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                            <div
                              className="card-body 
                          "  style={{width:"85%", marginBottom:'-4%', marginTop:"-4%"}}
                            >
                              <div className="row g-0 d-flex flex-row justify-content-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowCandidates(true);
                                }}
                              >
                                <div className="col-4 d-flex align-items-center justify-content-center rounded-10 text-center  bg-primary bg-gradient ">
                                  <RateReviewIcon className="text-white" />
                                </div>
                                <div className=" col-8  ">
                                  <div className="ms-2 d-flex flex-column">
                                    <h5
                                      className="text-nowrap text-muted text-uppercase"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight:"400"
                                      }}
                                    >
                                      Client Review
                                    </h5>
                                    <p className="card-text text-black">
                                      {statsCount.clientReview}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" col-md-4 col-lg-2 col-sm-6 col-xs-6 ">
                          <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                            <div
                              className="card-body 
                          "  style={{width:"85%", marginBottom:'-4%', marginTop:"-4%"}}
                            >
                              <div className="row g-0 d-flex flex-row justify-content-center"
                               onClick={(e) => {
                                e.preventDefault();
                                setShowCandidates(true);
                              }}
                              >
                                <div className="col-4 d-flex align-items-center justify-content-center rounded-10 text-center bg-warning bg-gradient  ">
                                  <LibraryBooks className="text-white" />
                                </div>
                                <div className=" col-8  ">
                                  <div className="ms-2 d-flex flex-column">
                                    <h5
                                      className="text-nowrap text-muted text-uppercase"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight:"400"
                                      }}
                                    >
                                      Interviewing
                                    </h5>
                                    <p className="card-text">
                                      {statsCount.interviewing}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" col-md-4 col-lg-2 col-sm-6 col-xs-6 ">
                          <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                            <div
                              className="card-body 
                          "  style={{width:"85%", marginBottom:'-4%', marginTop:"-4%"}}
                            >
                              <div className="row g-0 d-flex flex-row justify-content-center"
                               onClick={(e) => {
                                e.preventDefault();
                                setShowCandidates(true);
                              }}
                              >
                                <div className="col-4 d-flex align-items-center justify-content-center rounded-10 text-center  bg-primary bg-gradient ">
                                  <Assessment className="text-white" />
                                </div>
                                <div className=" col-8  ">
                                  <div className="ms-2 d-flex flex-column">
                                    <h5
                                      className="text-nowrap text-muted text-uppercase"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight:"400"
                                      }}
                                    >
                                      Offered
                                    </h5>
                                    <p className="card-text">
                                      {statsCount.offered}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 ">
                          <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                            <div
                              className="card-body 
                          "  style={{width:"85%", marginBottom:'-4%', marginTop:"-4%"}}
                            >
                              <div className="row g-0 d-flex flex-row justify-content-center"
                               onClick={(e) => {
                                e.preventDefault();
                                setShowCandidates(true);
                              }}
                              >
                                <div className="col-4 d-flex align-items-center justify-content-center rounded-10 text-center bg-success bg-gradient ">
                                  <AssignmentTurnedIn className="text-white" />
                                </div>
                                <div className=" col-8 ">
                                  <div className=" ms-2 d-flex flex-column">
                                    <h5
                                      className="text-nowrap text-muted text-uppercase"
                                      style={{
                                        fontSize: "15px",
                                        fontWeight:"400"
                                      }}
                                    >
                                      Placements
                                    </h5>
                                    <p className="card-text">
                                      {statsCount.placements}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item>
                      <Box display="flex" p={0}>
                        <Box p={0} flexGrow={1}>
                          <Typography
                          
                            gutterBottom
                            align="left"
                            className="pb-3"
                          >
                             <span style={{fontSize:"17px",fontWeight:"500"}}>Job Information</span>
                          </Typography>
                        </Box>
                        <Box p={1}></Box>
                      </Box>
                    </Grid>
                    <form
                      className=" border border-2 p-md-5 pt-md-4 p-2  "
                      style={{ borderRadius: "10px" }}
                    >
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            name="jobTitle"
                            value={state.jobTitle}
                            label="Job Title"
                            fullWidth
                            InputLabelProps={{ shrink: true}}
                            
                            disabled={!edit}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            
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
                              disabled={!edit}
                              
                              inputProps={{
                                name: "jobType",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option value={0}>None</option>
                              <option value={"Contract"}>Contract</option>
                              <option value={"Full Time"}>Full Time</option>
                              <option value={"Part Time"}>Part Time</option>
                              <option value={"C2H"}>C2H</option>
                              <option value={"Freelance"}>Freelance</option>
                              <option value={"Others"}>Others</option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <Autocomplete
                            options={clients}
                            getOptionLabel={(option) => option.name || ""}
                            id="controlled-demo"
                            name="clientName"
                            value={state.clientName}
                            disabled={!edit}
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
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
                              label="Job Opening status"
                              inputProps={{
                                name: "jobOpeningStatus",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option value={0}>None</option>
                              <option value={"In Progress"}>In Progress</option>
                              <option value={"Active"}>Active</option>
                              <option value={"On Hold"}>On Hold</option>
                              <option value={"Interviewing"}>
                                Interviewing
                              </option>
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
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            disabled={!edit}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={clientContactName}
                            name="clientContactName"
                            label="Contact Name"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            disabled={!edit}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.jobCreatedBy}
                            name="jobCreatedBy"
                            label="Created By"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            disabled={!edit}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            style={{ margin: "0px 0px" }}
                          >
                            <KeyboardDatePicker
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Date Opened"
                              value={selectedDate.openingDate}
                              onChange={(e) =>
                                handleDateChange(e, "openingDate")
                              }
                              disabled={!edit}
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
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Target Date"
                              disabled={!edit}
                              value={selectedDate.targetDate}
                              onChange={(e) =>
                                handleDateChange(e, "targetDate")
                              }
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
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Closing Date"
                              value={selectedDate.closingDate}
                              onChange={(e) =>
                                handleDateChange(e, "closingDate")
                              }
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              disabled={!edit}
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
                            disabled={!edit}
                            onChange={(event, newValue) => {
                              setState({
                                ...state,
                                accountManager: newValue,
                              });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                InputProps={{ disableUnderline: true }}
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
                            disabled={!edit}
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
                            disabled={!edit}
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
                            disabled={!edit}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.duration}
                            name="duration"
                            type="number"
                            disabled={!edit}
                            label="Duration (months)"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                              <option value={"Master Degree"}>
                                Master Degree
                              </option>
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
                            disabled={!edit}
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
                              disabled={!edit}
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
                                  label="Primary Skill"
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
                              disabled={!edit}
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
                              disabled={!edit}
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
                            size="small"
                            value={state.jobLocation}
                            name="jobLocation"
                            label="City"
                            disabled={!edit}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.zipCode}
                            name="zipCode"
                            label="Zip Code"
                            disabled={!edit}
                            type="number"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.state}
                            name="state"
                            disabled={!edit}
                            label="State"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.country}
                            name="country"
                            disabled={!edit}
                            label="Country"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                        <span style={{fontSize:"17px",fontWeight:"500"}}> Job Budget </span>
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
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                              <option value={"Direct Client"}>
                                Direct Client
                              </option>
                              <option value={"Direct to Transfer"}>
                                Direct to Transfer
                              </option>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                          <TextField
                            size="small"
                            value={workExp.minWorkExp}
                            name="minWorkExp"
                            label="Min Work Exp"
                            disabled={!edit}
                            type="number"
                            style={{ width: "50%" }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                          <TextField
                            size="small"
                            value={workExp.maxWorkExp}
                            name="maxWorkExp"
                            label="Max Work Exp"
                            disabled={!edit}
                            type="number"
                            style={{ width: "50%" }}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.salary}
                            name="salary"
                            label="Annual Salary"
                            disabled={!edit}
                            type="number"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <TextField
                            size="small"
                            value={state.expenses}
                            name="expenses"
                            label="Expenses"
                            disabled={!edit}
                            s
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                            disabled={!edit}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                              <option value={"USC,GC,EAD,TN"}>
                                USC,GC,EAD,TN
                              </option>
                              <option value={"H1B"}>H1B</option>
                              <option value={"ALL"}>ALL</option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                          <FormControl
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                            fullWidth
                            InputLabelProps={{ shrink: true }}
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
                              disabled={!edit}
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
                            {(!selectedFiles || !selectedFiles[0]?.name) && (
                              <label htmlFor="btn-upload">
                                <input
                                  id="btn-upload"
                                  name="btn-upload"
                                  style={{ display: "none" }}
                                  type="file"
                                  onChange={(e) =>
                                    setSelectedFiles(e.target.files)
                                  }
                                />
                                <Button
                                  className="btn-choose"
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Choose File <AttachFileIcon />
                                </Button>
                              </label>
                            )}
                            {selectedFiles && selectedFiles[0]?.name && (
                              <Chip
                                label={
                                  selectedFiles ? selectedFiles[0]?.name : ""
                                }
                                style={{ marginRight: 10 }}
                                onDelete={() => {
                                  setSelectedFiles(null);
                                  setState({ ...state, fileAttached: null });
                                }}
                              />
                            )}
                            {selectedFiles &&
                              selectedFiles[0]?.name &&
                              !state.fileAttached && (
                                <Button
                                  className="btn-choose"
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    dispatch(uploadFile(selectedFiles[0]))
                                  }
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
                                <GetAppIcon
                                  onClick={() =>
                                    dispatch(getFile(state.fileAttached))
                                  }
                                />
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
          </div>
          <AssociateCandidate
            openDialog={showAssociateCandidate}
            closeDialog={(val) => setShowAssociateCandidate(val)}
            jobIds={state.id}
          />
        </>
      ) : (
        <>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}></Box>
                <Box>
                  <div className="btn btn-light border me-2">
                    <Close
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCandidates(false);
                      }}
                      className="text-black cursor-pointer"
                    />
                  </div>
                </Box>
              </Box>

              <div className="m-2">
                <Candidates data={state} />
              </div>
            </CardContent>
          </Card>
        </>
      )}
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
