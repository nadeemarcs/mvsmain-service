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
  Tooltip,
  withStyles,
} from "@material-ui/core";

import { ArrowBack, Edit } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { connect, useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUsers } from "../../actions/auth";
import { updateClient } from "../../actions/client";

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
    accountManager,
    PhoneNumber,
    email,
    type,
    website,
    status,
    source,
    city,
    fax,
    state,
    contactPersons,
    zipCode,
    country,
    managerFirstName,
    managerLastName,
  } = location?.state?.data;

  const [stateData, setStateData] = useState({
    id,
    name,
    accountManager,
    PhoneNumber,
    email,
    type,
    website,
    status,
    source,
    city,
    fax,
    state,
    contactPersons,
    zipCode,
    country,
    managerFirstName,
    managerLastName,
  });

  const [contactPerson, setContactPerson] = useState({
    name: contactPersons && contactPersons[0]?.name,
    email: contactPersons && contactPersons[0]?.email,
    phoneNumber: contactPersons && contactPersons[0]?.phoneNumber,
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setStateData({
      ...stateData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleContactPersonChange = (event) => {
    const { name, value, type } = event.target;
    setContactPerson({
      ...contactPersons,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setStateData({
      ...stateData,
      accountManager: usersList?.filter(
        (item) => item.fullName === managerFirstName + " " + managerLastName
      )[0],
    });
  }, [usersList]);

  const handleSaveClient = () => {
    const payload = {
      ...stateData,
      contactPersons: [contactPerson],
      accountManager: stateData.accountManager?.id,
    };

    dispatch(updateClient(stateData.id, payload)).then(() => {
      setEditMode(false);
      history.push("/clients");
    });
  };

  return (
    <>
      <div className="App">
        <Grid>
          <Card>
            <div
              className="px-md-4 pb-1 "
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
                                <a href="/clients">
                                  <ArrowBack className="text-white" />
                                </a>
                              </span>
                            </div>
                            <span className="ps-2">{stateData.name}</span>
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
                                  title="Edit Client"
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
                            onClick={handleSaveClient}
                          >
                            Save
                          </Button>
                        </div>
                      )}
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
                   <span style={{fontSize:"17px",fontWeight:"500"}}> Client Information </span>
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
                        label="Client Name"
                        name="name"
                        value={stateData.name}
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
                        disabled={!edit}
                        name="accountManager"
                        value={stateData.accountManager}
                        // disabled={!edit}
                        onChange={(event, newValue) => {
                          setStateData({
                            ...stateData,
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
                      <TextField
                        size="small"
                        label="Contact Number"
                        disabled={!edit}
                        name="PhoneNumber"
                        value={stateData.PhoneNumber}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Email"
                        disabled={!edit}
                        name="email"
                        value={stateData.email}
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
                          Type
                        </InputLabel>
                        <Select
                          native
                          value={stateData.type}
                          disabled={!edit}
                         
                          name="type"
                          onChange={handleChange}
                          label="Type"
                          inputProps={{
                            name: "type",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"IT services"}>{"IT services"}</option>
                          <option value={"Product & Developement"}>
                            {"Product & Developement"}
                          </option>
                          <option value={"Banking and Financial"}>
                            {"Banking and Financial"}
                          </option>
                          <option value={"Legal"}>{"Legal"}</option>
                          <option value={"Consulting and Recruiting"}>
                            {"Consulting and Recruiting"}
                          </option>
                          <option value={"Manufacturing and Engineering"}>
                            {"Manufacturing and Engineering"}
                          </option>
                          <option value={"Others"}>{"Others"}</option>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Website"
                        disabled={!edit}
                        name="website"
                        value={stateData.website}
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
                          Status
                        </InputLabel>
                        <Select
                          native
                          value={stateData.status}
                          disabled={!edit}
                         
                          name="status"
                          onChange={handleChange}
                          label="Status"
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
                        label="Fax"
                        disabled={!edit}
                        name="fax"
                        value={stateData.fax}
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
                          Source
                        </InputLabel>
                        <Select
                          native
                          value={stateData.source}
                          disabled={!edit}
                         
                          name="source"
                          onChange={handleChange}
                          label="Source"
                          inputProps={{
                            name: "source",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option value={0}>None</option>
                          <option value={"Added by User"}>Added by User</option>
                          <option value={"Referral"}>Referral</option>
                          <option value={"Internal"}>Internal</option>
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
                    <span style={{fontSize:"17px",fontWeight:"500"}}>Client Contact Person </span>
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
                        disabled={!edit}
                        label="Name"
                        name="name"
                        value={contactPerson.name}
                        onChange={handleContactPersonChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Email"
                        disabled={!edit}
                        name="email"
                        value={contactPerson.email}
                        onChange={handleContactPersonChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Phone Number"
                        disabled={!edit}
                        name="phoneNumber"
                        value={contactPerson.phoneNumber}
                        onChange={handleContactPersonChange}
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
                        disabled={!edit}
                        name="city"
                        value={stateData.city}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Zip Code"
                        disabled={!edit}
                        name="zipCode"
                        value={stateData.zipCode}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="State"
                        disabled={!edit}
                        name="state"
                        value={stateData.state}
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
                        value={stateData.country}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        
                        fullWidth
                        disabled={!edit}
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
