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
  withStyles,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

import { ArrowBack, Edit } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { connect, useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUsers } from "../../actions/auth";
import { updateVendor } from "../../actions/vendor";

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 12,
    marginTop: "1.6rem",
  },
}))(Tooltip);

function App(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { usersList = [] } = props;

  const [edit, setEditMode] = useState(false);

  const {
    id,
    name,
    status,
    contact,
    phoneNumber,
    email,
    website,
    emailOpt,
    einNumber,
    skills,
    address,
    ownedByFirstName,
    ownedByLastName,
  } = location?.state?.data;

  const [state, setState] = useState({
    id,
    name,
    status,
    contact,
    phoneNumber,
    email,
    website,
    owner: ownedByFirstName + " " + ownedByLastName,
    emailOpt,
    einNumber,
    skills,
    address,
    state: location?.state.data.state,
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const [chosenAddress, setChosenAddress] = useState({
    city: address.city,
    state: address.state,
    country: address.country,
    zipCode: address.zipCode,
  });

  const handleSkillsChange = (event) => {
    const { name, value } = event.target;
    setChosenSkills({
      ...chosenSkills,
      [name]: value,
    });
  };

  const [chosenSkills, setChosenSkills] = useState({
    skill1: skills[0],
    skill2: skills[1],
    skill3: skills[2],
  });

  const handeAddressChange = (event) => {
    const { name, value } = event.target;
    setChosenAddress({
      ...chosenAddress,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (usersList.length)
      setState({
        ...state,
        owner: usersList?.filter(
          (item) => item.fullName === ownedByFirstName + " " + ownedByLastName
        )[0],
      });
  }, [usersList]);

  const handleSaveClient = () => {
    const payload = {
      ...state,
      skills: [chosenSkills.skill1, chosenSkills.skill2, chosenSkills.skill3],
      address: chosenAddress,
      owner: state.owner.id,
    };

    dispatch(updateVendor(state.id, payload)).then(() => {
      history.push("/vendors");
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
                              <span className="btn  border rounded-3 d-flex align-items-center me-2 back-button">
                                <a href="/vendors">
                                  <ArrowBack className="text-white" />
                                </a>
                              </span>
                            </div>
                            <span className="ps-2">{state.name}</span>
                            {edit ? (
                              <></>
                            ) : (
                              <div
                                className="d-flex flex-column justify-content-start align-items-start mt-1  ms-2 "
                                onClick={() =>
                                  edit ? setEditMode(false) : setEditMode(true)
                                }
                              >
                                <CustomTooltip
                                  title="Edit Vendor"
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
                    {!edit ? (
                      <></>
                    ) : (
                      <Box
                        p={0}
                        className="pe-md-3 ps-3 d-flex justify-content-center align-items-center flex-wrap"
                      >
                        <Button
                          variant="contained"
                          align="right"
                          size="small"
                          className="ms-2 bg-white"
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
                          onClick={handleSaveClient}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
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
                        disabled={!edit}
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
                          disabled={!edit}
                          
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                          disabled={!edit}
                          
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
                        disabled={!edit}
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
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill1"
                          value={chosenSkills.skill1}
                          onChange={handleSkillsChange}
                          disabled={!edit}
                          
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
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill2"
                          value={chosenSkills.skill2}
                          onChange={handleSkillsChange}
                          disabled={!edit}
                          
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
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Skills
                        </InputLabel>
                        <Select
                          native
                          name="skill3"
                          value={chosenSkills.skill3}
                          onChange={handleSkillsChange}
                          disabled={!edit}
                          
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
                  <Typography gutterBottom
                    align="left"
                    className="pb-3">
                  <span style={{fontSize:"17px",fontWeight:"500"}}> Address Information </span>
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
                        value={chosenAddress.city}
                        disabled={!edit}
                        onChange={handeAddressChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Zip Code"
                        name="zipCode"
                        value={chosenAddress.zipCode}
                        disabled={!edit}
                        onChange={handeAddressChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="State"
                        name="state"
                        value={chosenAddress.state}
                        disabled={!edit}
                        onChange={handeAddressChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Country"
                        name="country"
                        value={chosenAddress.country}
                        disabled={!edit}
                        onChange={setChosenAddress}
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
