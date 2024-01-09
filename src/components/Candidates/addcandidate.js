/* eslint-disable react-hooks/exhaustive-deps */
import "../../App.css";
import React, { useState, useEffect } from "react";
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
  Link,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import { addCandidate } from "../../actions/candidate";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Chip from "@material-ui/core/Chip";
import { uploadFile, getFile } from "../../actions/upload";
import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import { AddCircleOutline } from "@material-ui/icons";
import { getVendors } from "../../actions/vendor";
import AddVendorDialog from "./AddVendorDialog";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { usersList = [], fileLink, vendors } = props;
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    telNumber: "",
    email: "",
    secondaryEmail: "",
    recruiter: "", //dropdown
    visaStatus: "", //dropdown
    reLocation: "", //dropdown
    candidateType: "", //dropdown
    noticePeriod: "", //dropdown
    status: "",
    city: "",
    street: "",
    zipCode: null,
    state: "",
    country: "",
    education: "", //dropdown
    experience: null,
    hourlyRate: null,
    currentSalary: null,
    expectedSalary: null,
    desiredPay: "",
    currentJobTitle: "",
    source: "", //dropdown
    owner: "",
    allowEmailNotification: false, //dropdown
    resume: "",
    employerOrVendor: ""
  });

  useEffect(() => {
    setState({
      ...state,
      resume: fileLink,
    });
  }, [fileLink]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getVendors());
  }, [dispatch]);

  const [social, setSocial] = useState({
    linkedIn: "",
    website: "",
    skype: "",
    facebook: "",
  });

  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });
  const defaultProps = {
    options: skills100,
    getOptionLabel: (option) => option.title,
  };


  const [selectedFiles, setSelectedFiles] = useState(null);
  const [addVendorDialog, setAddVendorDialog] = useState(false);
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setSocial({
      ...social,
      [name]: value,
    });
  };

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    dispatch(uploadFile(selectedFiles[0]));
  };

  const downloadFile = () => {
    dispatch(getFile(state.resume));
  };

  const handleSaveCandidate = () => {
    const payload = {
      ...state,
      social,
      recruiter: state.recruiter.firstName + " " + state.recruiter.lastName,
      owner: state.owner.id,
      skills: [skills.skill1.title, skills.skill2.title, skills.skill3.title],
      employerOrVendor: state.employerOrVendor.name
    };

    dispatch(addCandidate(payload)).then(() => {
      history.push("/candidates");
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
                          variant="h6"
                          gutterBottom
                          align="left"
                        >
                          <span className="rounded p-2" style={{fontWeight:"500",fontSize:"17px",border:"1px solid #5e729f"}}>  Create Candidate </span>
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      p={0}
                      className="pe-md-3 ms-3 ms-md-0

                       d-flex justify-content-center align-items-center flex-wrap "
                    >
                      
                      <Button
                        variant="contained"
                        align="right"
                        size="small"
                        color="primary"
                        onClick={handleSaveCandidate}
                      >
                        Save
                      </Button>

                      <Link href="/candidates" className="text-decoration-none">
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
                <Grid container>
                  <Grid xs={12} sm={6} md={4} className="pe-md-5">
                    <Typography
                      
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                      <span style={{fontSize:"17px",fontWeight:"500"}}> Basic Information </span>
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
                        label="First Name"
                        name="firstName"
                        value={state.firstName}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Last Name"
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
                        label="Mobile Number"
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
                        label="Phone Number"
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
                        label="Emai Id"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Secondary Email Id"
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
                        label="LinkedIn"
                        name="linkedIn"
                        onChange={handleSocialChange}
                        value={social.linkedIn}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Website"
                        name="website"
                        value={social.website}
                        onChange={handleSocialChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Skype Id"
                        name="skype"
                        value={social.skype}
                        onChange={handleSocialChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Github Link"
                        name="facebook"
                        value={social.facebook}
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
                  <Typography gutterBottom align="left" className="pb-3">
                  <span style={{fontSize:"17px",fontWeight:"500"}}>Address </span>
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
                        label="City"
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
                        label="Street"
                        name="street"
                        value={state.street}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="State"
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
                        label="Zip Code"
                        name="zipCode"
                        type={"number"}
                        value={state.zipCode}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Country"
                        name="country"
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
                  <Typography variant="h6" gutterBottom align="left" className="pb-3">
                  <span style={{fontSize:"17px",fontWeight:"500"}}>Professional Details </span>
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
                        label="Years of Experience"
                        name="experience"
                        type="number"
                        value={state.experience}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Hourly rate"
                        type="number"
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
                        label="Current Salary"
                        type="number"
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
                        label="Expected Salary"
                        onChange={handleChange}
                        type="number"
                        name="expectedSalary"
                        value={state.expectedSalary}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Desired Pay"
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
                        label="Current Job Title"
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
                              label="Primary Skills"
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
                              label="Secondary Skills"
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
                              label="Other Skills"
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
              <CardContent className="px-md-5 mx-md-3  mb-5">
                <Grid item>
                  <Typography gutterBottom align="left" className="pb-3">
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
                          <option value={"Carrer Site"}>Career Site</option>
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
                    { state.source === 'Vendor' && 
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5 d-flex">
                      <Autocomplete
                        options={vendors}
                        getOptionLabel={(option) => option.name || ""}
                        id="controlled-demo"
                        name="clientName"
                        value={state.employerOrVendor}
                        style={{ width: '100%' }}
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
                      <Tooltip
                            title="Add New Vendor"
                            placement="bottom"
                            style={{ cursor: "pointer" }}
                          >
                       <AddCircleOutline className="d-block mt-3 ml-5" onClick={() => setAddVendorDialog(true)}/>
                      </Tooltip>

                    </Grid> }
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <Autocomplete
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="controlled-demo"
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
                          onChange={handleChange}
                          label="Email Opt Out"
                          inputProps={{
                            name: "allowEmailNotification",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
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
                          Upload Resume <AttachFileIcon />
                        </Button>
                      </label>
                    )}
                    {selectedFiles && (
                      <Chip
                        label={selectedFiles ? selectedFiles[0]?.name : ""}
                        style={{ marginRight: 10 }}
                        onDelete={() => {
                          setSelectedFiles(null);
                          setState({ ...state, resume: null });
                        }}
                      />
                    )}
                    {selectedFiles && !state.resume && (
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
      </div>
      <AddVendorDialog 
        openDialog={addVendorDialog}
        closeDialog={(val) => setAddVendorDialog(val)}
      />
      {/* <ToastContainer /> */}
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
    vendors
  };
}

export default connect(mapStateToProps)(App);
