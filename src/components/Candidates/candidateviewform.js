/* eslint-disable react-hooks/exhaustive-deps */
import "../../App.css";
import React, { useState, useEffect } from "react";
import "../../socialicons.css";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Chip,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import {
  Edit,
  PersonAdd,
  ArrowBack,
} from "@material-ui/icons";

import { connect, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateCandidate } from "../../actions/candidate";
import GetAppIcon from "@material-ui/icons/GetApp";
import { getFile, uploadFile } from "../../actions/upload";
import { getVendors } from "../../actions/vendor";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AssociateJob from "./AssociateJob";

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

  const { usersList = [], fileLink, vendors } = props;

  const {
    id,
    firstName,
    lastName,
    email,
    secondaryEmail,
    visaStatus,
    city,
    street,
    country,
    phoneNumber,
    telNumber,
    reLocation,
    recruiter,
    zipCode,
    social,
    candidateType,
    noticePeriod,
    education,
    experience,
    expectedSalary,
    currentSalary,
    desiredPay,
    hourlyRate,
    currentJobTitle,
    resume,
    source,
    skills,
    status,
    jobCandidateMappings,
    employerOrVendor,
    allowEmailNotification,
    ownedByFirstName,
    ownedByLastName,
  } = location?.state.data;

  const [state, setState] = useState({
    id,
    firstName,
    lastName,
    telNumber,
    phoneNumber,
    email,
    secondaryEmail,
    social,
    recruiter,
    status,
    visaStatus,
    reLocation,
    candidateType,
    noticePeriod,
    city,
    street,
    zipCode,
    state: location?.state.data.state,
    country,
    education,
    resume,
    experience,
    hourlyRate,
    currentSalary,
    expectedSalary,
    desiredPay,
    currentJobTitle,
    skills,
    employerOrVendor,
    owner: ownedByFirstName + " " + ownedByLastName,
    allowEmailNotification,
    source,
    jobCandidateMappings,
    // addResume,
  });

  const [edit, setEditMode] = useState(false);
  const [showAssociateJob, setShowAssociateJob] = useState(false);
  useEffect(() => {
    if (usersList.length)
      setState({
        ...state,
        recruiter: usersList?.filter((item) => item.fullName === recruiter)[0],
        owner: usersList?.filter(
          (item) => item.fullName === ownedByFirstName + " " + ownedByLastName
        )[0],
      });
  }, [usersList]);

  useEffect(() => {
    dispatch(getVendors());
  }, []);
  const [chosenSkills, setChosenSkills] = useState({
    skill1: { title: skills && skills[0] },
    skill2: { title: skills && skills[1] },
    skill3: { title: skills && skills[2] },
  });

  const defaultProps = {
    options: skills100,
    getOptionLabel: (option) => option.title,
  };

  const [selectedFiles, setSelectedFiles] = useState([
    { name: state?.resume?.split("-bezkoder-")[1] },
  ]);

  const [candidateStatus, ] = useState(
    jobCandidateMappings[0]
  );

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      social: {
        ...social,
        [name]: value,
      },
    });
  };

  const downloadFile = () => {
    dispatch(getFile(state.resume));
  };

  const handleSaveCandidate = () => {
    const payload = {
      ...state,
      recruiter: state.recruiter?.firstName + " " + state.recruiter?.lastName,
      owner: state.owner.id,
      skills: [
        chosenSkills.skill1.title,
        chosenSkills.skill2.title,
        chosenSkills.skill3.title,
      ],
      jobCandidateMappings: [candidateStatus, ...jobCandidateMappings],
    };

    dispatch(updateCandidate(state.id, payload)).then(() => {
      setEditMode(false);
      history.push("/candidates");
    });
  };

  useEffect(() => {
    if (fileLink) {
      setState({
        ...state,
        resume: fileLink,
      });
    }
  }, [fileLink]);

  return (
    <>
      <div className="App">
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
                          <div style={{ fontSize: "20px" }} className="d-flex ">
                            <div className="">
                              <span className="btn back-button border rounded-3 d-flex align-items-center me-2">
                                <a href="/candidates">
                                  <ArrowBack className="text-white" />
                                </a>
                              </span>
                            </div>
                            <span className="ps-2">
                              {state.firstName} {state.lastName} -{" "}
                              <span> </span>
                              <span className="text-temp-blue">
                                {state.jobCandidateMappings[0]?.job?.jobTitle}
                              </span>
                              <br />
                              <div>
                                <span
                                  hidden={state.social?.linkedIn ? false: true}
                                  className="p-1 pt-1  border border-dark rounded-start padding" 
                                >
                                  <a  target="_blank" href={state.social?.linkedIn ? state.social.linkedIn : null}>
                                    <i
                                      className="fa fa-linkedin-square"
                                      style={{
                                        fontSize: "17px",
                                        background: "#007bb5",
                                        color: "white",
                                        margin:"-4px"
                                      }}
                                    ></i>
                                  </a>
                                </span>
                                <span hidden={state.social?.skypeId ? false: true} className="p-1  mt-1 pt-1  border border-dark border-start-0 border-end-0 padding" >
                                  <a  target="_blank" href={state.social?.skypeId ? state.social.skypeId : null}>
                                  <i
                                      className="fa fa-skype"
                                      style={{
                                        fontSize: "17px",
                                        background: "#00aff0",
                                        color: "white",
                                        margin:"-4px"
                                      }}
                                    ></i>
                                  </a>
                                </span>
                                <span hidden={state.social?.github ? false: true} className="p-1 pt-1  border border-dark rounded-end padding" >
                                  <a target="_blank" href={state.social?.github ? state.social.github : null}>
                                  <i
                                      className="fa fa-github-square"
                                      style={{
                                        fontSize: "17px",
                                        background: "white",
                                        color: "black",
                                        margin:"-4px"
                                      }}
                                    ></i>
                                  </a>
                                </span>
                              </div>
                            </span>

                            <span className="d-flex flex-column justify-content-start align-items-start mt-2  ms-2 " >
                              <span
                                style={{ fontSize: "12px" }}
                                className="badge rounded-pill bg-temp-blue "
                              >
                                {state.status}
                              </span>
                            </span>
                            {edit ? (
                              <></>
                            ) : (
                              <div
                                className="d-flex flex-column justify-content-start align-items-start  mt-1 ms-2 "
                                onClick={() =>
                                  edit ? setEditMode(false) : setEditMode(true)
                                }
                              >
                                <CustomTooltip
                                  title="Edit Candidate"
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
                      className="pe-md-3 ps-3 d-flex justify-content-center align-items-center flex-wrap"
                    >
                      {!edit ? (
                        <> </>
                      ) : (
                        <div>
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
                          <Button
                            variant="contained"
                            color="Secondary"
                            align="right"
                            size="small"
                            className="ms-2"
                            onClick={handleSaveCandidate}
                          >
                            Save
                          </Button>
                        </div>
                      )}
                      <div className="ms-2 btn bg-white ">
                        <CustomTooltip
                          title="Add to Job"
                          placement="bottom"
                          className="cursor-pointer"
                          onClick={() => setShowAssociateJob(true)}
                        >
                          <PersonAdd />
                        </CustomTooltip>
                      </div>
                    </Box>
                  </Box>
                </Grid>
              </CardContent>
            </div>
            {/* <CardContent>
              <Grid container spacing={0} style={{ marginBottom: "20px" }}>
                <Grid item xs={12} md>
                  <span
                    style={{
                      border: "1px solid #8080800f",
                      padding: "18px 42px",
                      backgroundColor: "#ffab008f",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Added To Job</span>
                    <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                      (10)
                    </span>
                  </span>
                </Grid>
                <Grid item xs={12} md>
                  <span
                    style={{
                      border: "1px solid #8080800f",
                      padding: "18px 25px",
                      backgroundColor: "rgb(50 229 12 / 64%)",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Client Submission</span>
                    <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                      (10)
                    </span>
                  </span>
                </Grid>
                <Grid item xs={12} md>
                  <span
                    style={{
                      border: "1px solid #8080800f",
                      padding: "18px 55px",
                      backgroundColor: "#00f8ffe6",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Interview</span>
                    <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                      (10)
                    </span>
                  </span>
                </Grid>
                <Grid item xs={12} md>
                  <span
                    style={{
                      border: "1px solid #8080800f",
                      padding: "18px 60px",
                      backgroundColor: "rgb(255 0 0 / 47%)",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Offered</span>
                    <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                      (10)
                    </span>
                  </span>
                </Grid>
                <Grid item xs={12} md>
                  <span
                    style={{
                      border: "1px solid #8080800f",
                      padding: "18px 52px",
                      backgroundColor: "rgb(222 0 255 / 44%)",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Placement</span>
                    <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                      (10)
                    </span>
                  </span>
                </Grid>
              </Grid>
            </CardContent> */}

            <div className="px-md-4 p-2 ">
              <CardContent className="px-md-5 mx-md-3 ">
                <Grid container>
                  <Grid xs={12} sm={6} md={4} className="pe-md-5">
                    <Typography
                      
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                       <span style={{fontSize:"17px",fontWeight:"500"}}>Basic Information</span>
                    </Typography>
                  </Grid>
                </Grid>
                <form
                  className=" border border-2 p-md-5 pt-md-4 p-2  "
                  style={{ borderRadius: "10px" }}
                >
                  <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="First Name"
                        label="First Name"
                        name="firstName"
                        disabled={!edit}
                        value={state.firstName}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true}}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Last Name"
                        label="Last Name"
                        disabled={!edit}
                        name="lastName"
                        value={state.lastName}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Mobile Number"
                        label="Mobile Number"
                        disabled={!edit}
                        name="phoneNumber"
                        value={state.phoneNumber}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Phone Number"
                        label="Phone Number"
                        disabled={!edit}
                        name="telNumber"
                        value={state.telNumber}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Email Id"
                        label="Email Id"
                        name="email"
                        disabled={!edit}
                        value={state.email}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Secondary Email Id"
                        label="Secondary Email Id"
                        disabled={!edit}
                        name="secondaryEmail"
                        value={state.secondaryEmail}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
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
                          Visa Status
                        </InputLabel>
                        <Select
                          native
                          name="visaStatus"
                          value={state.visaStatus}
                          disabled={!edit}
                          onChange={handleChange}
                          label="Visa Status"
                          inputProps={{
                            name: "visaStatus",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"USC"}>USC</option>
                          <option value={"Green Card"}>Green Card</option>
                          <option value={"EAD-GC"}>EAD-GC</option>
                          <option value={"H1B"}>H1B</option>
                          <option value={"TN/E3"}>TN/E3</option>
                          <option value={"EAD-Others"}>EAD-Others</option>
                          <option value={"Indian"}>Indian</option>
                          <option value={"Others"}>Others</option>
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
                          Relocation
                        </InputLabel>
                        <Select
                          native
                          name="reLocation"
                          value={state.reLocation}
                          disabled={!edit}
                          onChange={handleChange}
                          label="Relocation"
                          inputProps={{
                            name: "reLocation",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value={0}>
                            None
                          </option>
                          <option value={"Yes"}>Yes</option>
                          <option value={"No"}>No</option>
                          <option value={"Remote"}>Remote</option>
                          <option value={"Travel/Telecommute"}>
                            Travel/Telecommute
                          </option>
                          <option value={"Full Remote"}>Full Remote</option>
                          <option value={"Work From Client Location"}>
                            Work From Client Location
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
                          Candidate Type
                        </InputLabel>
                        <Select
                          native
                          name="candidateType"
                          value={state.candidateType}
                          onChange={handleChange}
                          label="Candidate Type"
                          disabled={!edit}
                          inputProps={{
                            name: "candidateType",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Contract"}>Contract</option>
                          <option value={"Full Time"}>Full Time</option>
                          <option value={"C2H"}>C2H</option>
                          <option value={"Freelance"}>Freelance</option>
                          <option value={"Fulltime Salary"}>
                            Fulltime Salary
                          </option>
                          <option value={"India Candidate"}>
                            India Candidate
                          </option>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        name="recruiter"
                        disabled={!edit}
                        value={state.recruiter}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            recruiter: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Recruiter"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="LinkedIn"
                        disabled={!edit}
                        label="LinkedIn"
                        name="linkedIn"
                        onChange={handleSocialChange}
                        value={state.social?.linkedIn}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Website"
                        label="Website"
                        disabled={!edit}
                        name="website"
                        value={state.social?.website}
                        onChange={handleSocialChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Skype Id"
                        disabled={!edit}
                        label="Skype Id"
                        name="skypeId"
                        value={state.social?.skypeId}
                        onChange={handleSocialChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Github Link"
                        label="Github Link"
                        disabled={!edit}
                        name="github"
                        value={state.social?.github}
                        onChange={handleSocialChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
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
                        Notice Period
                        </InputLabel>
                        <Select
                          native
                          name="noticePeriod"
                          value={state.noticePeriod}
                          onChange={handleChange}
                          label="Notice Period"
                          disabled={!edit}
                          inputProps={{
                            name: "noticePeriod",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Immediate"}>Immediate</option>
                          <option value={"7 Days"}>7 Days</option>
                          <option value={"15 Days"}>15 Days</option>
                          <option value={"30 Days"}>30 Days</option>
                          <option value={"45 Days"}>
                           45 Days
                          </option>
                          <option value={"60 Days"}>
                            60 Days
                          </option>
                          <option value={"90 Days"}>
                           90 Days
                          </option>
                          
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
                        placeholder="City"
                        label="City"
                        disabled={!edit}
                        name="city"
                        value={state.city}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Street"
                        label="Street"
                        name="street"
                        disabled={!edit}
                        value={state.street}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="State"
                        label="State"
                        disabled={!edit}
                        name="state"
                        value={state.state}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Zip Code"
                        label="Zip Code"
                        disabled={!edit}
                        name="zipCode"
                        value={state.zipCode}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Country"
                        label="Country"
                        name="country"
                        disabled={!edit}
                        value={state.country}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
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
                    <span style={{fontSize:"17px",fontWeight:"500"}}> Professional Details </span>
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
                          Education
                        </InputLabel>
                        <Select
                          native
                          name="education"
                          disabled={!edit}
                          value={state.education}
                          onChange={handleChange}
                          label="Education"
                          inputProps={{
                            name: "education",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"High School"}>High School</option>
                          <option value={"Associate Degree"}>
                            Associate Degree
                          </option>
                          <option value={"Bachelor Degree"}>
                            Bachelor Degree
                          </option>
                          <option value={"Master"}>Master</option>
                          <option value={"PHD"}>PHD</option>
                          <option value={"Others"}>Others</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Years of Experience"
                        label="Years of Experience"
                        disabled={!edit}
                        name="experience"
                        value={state.experience}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Hourly Rate"
                        label="Hourly rate"
                        disabled={!edit}
                        name="hourlyRate"
                        value={state.hourlyRate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Current Salary"
                        label="Current Salary"
                        disabled={!edit}
                        name="currentSalary"
                        value={state.currentSalary}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Expected Slary"
                        label="Expected Salary"
                        onChange={handleChange}
                        disabled={!edit}
                        name="expectedSalary"
                        value={state.expectedSalary}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Desired Pay"
                        label="Desired Pay"
                        disabled={!edit}
                        name="desiredPay"
                        value={state.desiredPay}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        placeholder="Current Job Title"
                        label="Current Job Title"
                        disabled={!edit}
                        name="currentJobTitle"
                        value={state.currentJobTitle}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill1"
                          value={chosenSkills.skill1}
                          onChange={(event, newValue) => {
                            setChosenSkills({
                              ...chosenSkills,
                              skill1: newValue,
                            });
                          }}
                          disabled={!edit}
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Primary Skills"
                              placeholder="Primary Skills"
                              InputLabelProps={{ shrink: true }}
                              margin="normal"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill2"
                          value={chosenSkills.skill2}
                          onChange={(event, newValue) => {
                            setChosenSkills({
                              ...chosenSkills,
                              skill2: newValue,
                            });
                          }}
                          disabled={!edit}
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Secondary Skills"
                              placeholder="Secondary Skills"
                              InputLabelProps={{ shrink: true }}
                              margin="normal"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        className={classes.formControl}
                      >
                        <Autocomplete
                          name="skill3"
                          value={chosenSkills.skill3}
                          onChange={(event, newValue) => {
                            setChosenSkills({
                              ...chosenSkills,
                              skill3: newValue,
                            });
                          }}
                          disabled={!edit}
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Other Skills"
                              placeholder="Other Skills"
                              InputLabelProps={{ shrink: true }}
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
                    <span style={{fontSize:"17px",fontWeight:"500"}}> Other Information </span>
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
                          Source
                        </InputLabel>
                        <Select
                          native
                          disabled={!edit}
                          
                          name="source"
                          value={state.source}
                          onChange={handleChange}
                          label="Source"
                          inputProps={{
                            name: "source",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Monster"}>Monster</option>
                          <option value={"Dice"}>Dice</option>
                          <option value={"Carrer Builder"}>
                            Carrer Builder
                          </option>
                          <option value={"Indeed"}>Indeed</option>
                          <option value={"Linkedin"}>Linkedin</option>
                          <option value={"Career Site"}>Career Site</option>
                          <option value={"Referral"}>Employee Referral</option>
                          <option value={"Campus"}>Campus</option>
                          <option value={"Naukri"}>Naukri</option>
                          <option value={"Shine Jobs"}>Shine Jobs</option>
                          <option value={"Timesjob"}>Timesjob</option>
                          <option value={"Hirist"}>Hirist</option>
                          <option value={"FSS DB"}>FSS DB</option>
                          <option value={"Campus Interview"}>Campus Interview</option>
                          <option value={"Walk-In"}>Walk-In</option>
                          <option value={"Digital Marketing Campaign"}>Digital Marketing Campaign</option>
                          <option value={"Vendor"}>Vendor</option>
                          <option value={"Social Sites"}>Social Sites</option>
                          <option value={"Others"}>Others</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    {state.source === "Vendor" && (
                      <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                        <Autocomplete
                          options={vendors}
                          getOptionLabel={(option) => option.name || ""}
                          id="controlled-demo"
                          name="clientName"
                          value={state.employerOrVendor}
                          style={{ width: "100%" }}
                          onChange={(event, newValue) => {
                            setState({
                              ...state,
                              employerOrVendor: newValue,
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              InputLabelProps={{ shrink: true }}
                              label="Employer/Vendor"
                              margin="normal"
                            />
                          )}
                        />
                      </Grid>
                    )}
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
                        disabled={!edit}
                        name="owner"
                        value={state.owner}
                        onChange={(event, newValue) => {
                          setState({
                            ...state,
                            owner: newValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Reporting Manager"
                            margin="normal"
                          />
                        )}
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
                          Email Opt Out
                        </InputLabel>
                        <Select
                          native
                          name="allowEmailNotification"
                          value={state.allowEmailNotification}
                          disabled={!edit}
                          onChange={handleChange}
                          label="Email Opt Out"
                          inputProps={{
                            name: "allowEmailNotification",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Yes"}>Yes</option>
                          <option value={"No"}>No</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      {(!selectedFiles || !selectedFiles[0]?.name) && (
                        <label htmlFor="btn-upload">
                          <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => setSelectedFiles(e.target.files)}
                          />
                          <Button
                            className="btn-choose"
                            variant="contained"
                            color="primary"
                            // disabled={selectedFiles?.length}
                            component="span"
                          >
                            Choose File <AttachFileIcon />
                          </Button>
                        </label>
                      )}
                      {selectedFiles && selectedFiles[0]?.name && (
                        <Chip
                          label={selectedFiles ? selectedFiles[0]?.name : ""}
                          style={{ marginRight: 10 }}
                          onDelete={() => {
                            setSelectedFiles(null);
                            setState({ ...state, resume: null });
                          }}
                        />
                      )}
                      {selectedFiles &&
                        selectedFiles[0]?.name &&
                        !state.resume && (
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
                      {state.resume ? (
                        <Tooltip
                          title="Click to download Resume"
                          placement="bottom"
                          style={{ cursor: "pointer" }}
                        >
                          <GetAppIcon onClick={downloadFile} />
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <AssociateJob
          openDialog={showAssociateJob}
          candidateSelectedRow={location?.state?.data}
          closeDialog={(val) => setShowAssociateJob(val)}
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
  const { usersList } = state.auth;
  const { message } = state.message;
  const { fileLink } = state.upload;
  const { vendors } = state.vendor;

  return {
    usersList,
    message,
    fileLink,
    vendors,
  };
}

export default connect(mapStateToProps)(App);
