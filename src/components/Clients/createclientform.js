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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import { addClient, getClients } from "../../actions/client";

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { usersList = [], handleCreateClientClose } = props;

  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [state, setState] = useState({
    name: "",
    accountManager: "",
    PhoneNumber: "",
    createdBy: userId,
    email: "",
    type: "",
    website: "",
    status: "Active",
    source: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [contactPersons, setContactPersons] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setState({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleContactPersonChange = (event) => {
    const { name, value, type } = event.target;
    setContactPersons({
      ...contactPersons,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    const payload = {
      ...state,
      contactPersons: [contactPersons],
      accountManager: state.accountManager.id,
    };
    dispatch(addClient(payload)).then((res) => {
      if (handleCreateClientClose) {
        dispatch(getClients());
        handleCreateClientClose();
      } else {
        history.push("/clients");
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
                           <span className="rounded p-2" style={{fontWeight:"500",fontSize:"17px",border:"1px solid #5e729f"}}>  Create Client</span>
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      p={0}
                      className="pe-md-3 ms-3 ms-md-0

                       d-flex justify-content-center align-items-center flex-wrap "
                    >
                      <Link href="/clients" className="text-decoration-none">
                        <Button
                          onClick={(e) => handleSaveClient(e)}
                          variant="contained"
                          align="right"
                          size="small"
                          color="primary"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                          className="btn primary ms-2 "
                        >
                          Save
                        </Button>
                      </Link>
                      <Link href="/clients" className="text-decoration-none">
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
                        value={state.name}
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
                      <TextField
                        size="small"
                        label="Contact Number"
                        name="PhoneNumber"
                        value={state.PhoneNumber}
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
                          value={state.type}
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
                        name="website"
                        value={state.website}
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
                          value={state.status}
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
                        name="fax"
                        value={state.fax}
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
                          value={state.source}
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
                   <span style={{fontSize:"17px",fontWeight:"500"}}>  Client Contact Person </span>
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
                        label="Name"
                        name="name"
                        value={contactPersons.name}
                        onChange={handleContactPersonChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Email"
                        name="email"
                        value={contactPersons.email}
                        onChange={handleContactPersonChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item className="pe-md-5">
                      <TextField
                        size="small"
                        label="Phone Number"
                        name="phoneNumber"
                        value={contactPersons.phoneNumber}
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
                        label="Zip Code"
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
