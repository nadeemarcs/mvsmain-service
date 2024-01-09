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
  Link,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import { addVendor, getVendors } from "../../actions/vendor";
import { Autocomplete } from "@material-ui/lab";

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { usersList = [], handleCreateVendorClose } = props;
  const [state, setState] = useState({
    name: "",
    status: "Active",
    contact: "",
    phoneNumber: "",
    email: "",
    website: "",
    owner: "",
    emailOpt: "",
    einNumber: "",
    skills: "",
  });
  const [address, setAddress] = useState({
    city: "",
    zipCode: "",
    state: "",
    country: "",
  });

  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleAddress = (event) => {
    const { name, value, type } = event.target;
    setAddress({
      ...address,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSkillsChange = (event) => {
    const { name, value } = event.target;
    setSkills({
      ...skills,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  const handleSaveVendor = (e) => {
    e.preventDefault();
    const payload = {
      ...state,
      skills: [skills.skill1, skills.skill2, skills.skill3],
      address,
      owner: state.owner.id,
    };

    dispatch(addVendor(payload)).then(() => {
      if (handleCreateVendorClose) {
        dispatch(getVendors());
        handleCreateVendorClose();
      } else {
        history.push("/vendors");
      }
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
                           <span className="rounded p-2" style={{fontWeight:"500",fontSize:"17px",border:"1px solid #5e729f"}}> Create Vendor </span>
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      p={0}
                      className="pe-md-3 ms-3 ms-md-0

                       d-flex justify-content-center align-items-center flex-wrap "
                    >
                      <Link href="/vendors" className="text-decoration-none">
                        <Button
                          variant="contained"
                          align="right"
                          size="small"
                          color="primary"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                          className="btn  ms-2 "
                          onClick={(e) => handleSaveVendor(e)}
                        >
                          Save
                        </Button>
                      </Link>
                      <Link href="/vendors" className="text-decoration-none">
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
                   <span style={{fontSize:"17px",fontWeight:"500"}}> Vendor Information </span>
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
                        label="Vendor Name"
                        name="name"
                        value={state.name}
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
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Vendor status
                        </InputLabel>
                        <Select
                          native
                          value={state.status}
                          name="status"
                          onChange={handleChange}
                          label="Vendor Status"
                          inputProps={{
                            name: "status",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={"Active"}>Active</option>
                          <option value={"In-Active"}>In-Active</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Vendor Contact"
                        name="contact"
                        value={state.contact}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Phone"
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
                        label="Email"
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
                        label="Website"
                        name="website"
                        value={state.website}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
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
                            label="Vendor Owner"
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
                        // className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Email Opt Out
                        </InputLabel>
                        <Select
                          native
                          name="emailOpt"
                          value={state.emailOpt}
                          onChange={handleChange}
                          label="Email Opt Out"
                          inputProps={{
                            name: "emailOpt",
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
                      <TextField
                        size="small"
                        label="Vendor EIN Number"
                        name="einNumber"
                        value={state.einNumber}
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
                        // className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill1"
                          value={skills.skill1}
                          onChange={handleSkillsChange}
                          label="Skills"
                          inputProps={{
                            name: "skill1",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Java"}>Java</option>
                          <option value={"AWS"}>AWS</option>
                          <option value={"JavaScript"}>JavaScript</option>
                          <option value={"DevOps"}>DevOps</option>
                          <option value={"Angular"}>Angular</option>
                          <option value={"Spring"}>Spring</option>
                          <option value={"Microservices"}>Microservices</option>
                          <option value={"React"}>React</option>
                          <option value={"Big Data"}>Big Data</option>
                          <option value={"SAP"}>SAP</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        // className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill2"
                          value={skills.skill2}
                          onChange={handleSkillsChange}
                          label="Skills"
                          inputProps={{
                            name: "skill2",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Java"}>Java</option>
                          <option value={"AWS"}>AWS</option>
                          <option value={"JavaScript"}>JavaScript</option>
                          <option value={"DevOps"}>DevOps</option>
                          <option value={"Angular"}>Angular</option>
                          <option value={"Spring"}>Spring</option>
                          <option value={"Microservices"}>Microservices</option>
                          <option value={"React"}>React</option>
                          <option value={"Big Data"}>Big Data</option>
                          <option value={"SAP"}>SAP</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <FormControl
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        size="small"
                        // className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill3"
                          value={skills.skill3}
                          onChange={handleSkillsChange}
                          label="Skills"
                          inputProps={{
                            name: "skill3",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Java"}>Java</option>
                          <option value={"AWS"}>AWS</option>
                          <option value={"JavaScript"}>JavaScript</option>
                          <option value={"DevOps"}>DevOps</option>
                          <option value={"Angular"}>Angular</option>
                          <option value={"Spring"}>Spring</option>
                          <option value={"Microservices"}>Microservices</option>
                          <option value={"React"}>React</option>
                          <option value={"Big Data"}>Big Data</option>
                          <option value={"SAP"}>SAP</option>
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
                    <span style={{fontSize:"17px",fontWeight:"500"}}>Address Information </span>
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
                        value={address.city}
                        onChange={handleAddress}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Zip Code"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddress}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="State"
                        name="state"
                        value={address.state}
                        onChange={handleAddress}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Country"
                        name="country"
                        value={address.country}
                        onChange={handleAddress}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { usersList } = state.auth;
  const { message } = state.message;

  return {
    usersList,
    message,
  };
}
export default connect(mapStateToProps)(App);
