import React, {useState,useEffect} from "react";
import { getUsers } from "../src/actions/auth";
import { getUserProfile } from '../src/actions/profile';
import { updateUserProfile } from '../src/actions/profile';
import {toast} from 'react-toastify';
import logo from "./resumrlogo.jpg";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import countries from './assets/countries';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField as NewTextField } from '@mui/material/'
// import Box from '@material-ui/material/Box';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from 'react-places-autocomplete';

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
  Box,
} from "@material-ui/core";

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/userService/';

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
  const [edit, setEditMode] = useState(false);
  // const [edit1, setEditMode1] = useState(false);
  // const [edit2, setEditMode2] = useState(false);
  // const [edit3, setEditMode3] = useState(false);
  // const [edit4, setEditMode4] = useState(false);
  // const [edit5, setEditMode5] = useState(false);
  // const [edit6, setEditMode6] = useState(false);
  // const [edit7, setEditMode7] = useState(false);
  // const [edit8, setEditMode8] = useState(false);
  // const [edit9, setEditMode9] = useState(false);
  // const [edit10, setEditMode10] = useState(false);
  // const [edit11, setEditMode11] = useState(false);
  // const [edit12, setEditMode12] = useState(false);
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const { profile=[] } = props;
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserProfile(userDetails.id));
  }, []);

  const { user: currentUser, } = props;
  const classes = useStyles();
  
  const [stateData, setStateData] = useState({
   
  });
  const [newProfile, setNewProfile] = useState({});
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setStateData({
      ...stateData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  const editProfile = (value, detail, addressDetail=null) => {
    if(addressDetail){
      newProfile[detail] = {...newProfile[detail], ...profile[detail]}
      newProfile[detail][addressDetail] = value;
      if(!profile[detail]){
        profile[detail] = {}
      }
      profile[detail][addressDetail] = value;
      setIsUpdated(!isUpdated);
    }else{
      newProfile[detail] = value;
      profile[detail] = value;
      setIsUpdated(!isUpdated);
    }
    console.log(newProfile);

  }
  const getSelectedCountry = () =>{
   
    console.log( profile.address?profile.address.country : null);
    return countries[0].label;
  }
  return (
    <div>
      <Grid>
        <Card style={{ padding: "20px 5px", margin: "0 auto" }}>
          <CardContent className="px-md-5 px-5">
            <CardContent className="px-md-5 px-5">
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
                            
                            <span className="ps-2" style={{fontSize:"18px", fontWeight:"500"}}>Profile Details</span>
                            {edit ? (
                              <></>
                            ) : (
                              <div
                                className="d-flex flex-column justify-content-start align-items-start mt-1  ms-2 "
                                onClick={() =>
                                  edit ? setEditMode(false) : setEditMode(true)
                                }
                              >
                                  <EditIcon style={{height:"20px"}} />
                                
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
                            className="ms-2 "
                            size="small"
                            onClick={() =>
                              edit ? setEditMode(false) : setEditMode(true)
                            }
                          >
                            Cancel
                          </Button>
                          <Button 
                        className="btn bg-temp-blue text-center ms-2 " 
                        variant="contained"
                        size="small"
                        onClick={()=>{
                            // delete profile.password;
  
                            dispatch(updateUserProfile(profile.id, {...newProfile}));
                            toast.success("Profile updated successfully");
                        }}
                        >Save & update</Button>
                        </div>
                      )}
                    </Box>
                  </Box>
                </Grid>
              
              <form>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item>
                  <img style={{width:"119px",height:"108px", borderRadius:"50%"}}
                        src={logo} 
                        alt="profile-img"
                        className=""
                    />
                    <CardContent
                      style={{
                        border: "1px solid grey",
                        borderRadius:"10px",
                        width: "420px",
                        padding: "10px",
                        margin: "50px 0px",
                      }}
                    >
                      <div style={{ marginLeft: "55px" }}>
                        <div>
                          <FormControl
                            fullWidth
                            size="small"
                            className={classes.formControl}
                            InputLabelProps={{ shrink: true }}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple">
                              Profile Type
                            </InputLabel>
                            <Select
                              style={{ width: "80%" }}
                              native
                              value={stateData.age}
                                                    label="  Profile Type"  
                                                    
                              inputProps={{
                                name: "age",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option aria-label="None" value="" />
                              <option value={1}>Admin</option>
                              <option value={2}>Super Admin</option>
                              <option value={3}>User/Recruiter</option>
                              <option value={4}>Recruit Admin</option>
                            </Select>
                          </FormControl>
                          <div className="mt-3">
                            <TextField
                              size="small"
                              value={profile.language}
                              label="Language"
                              disabled={!edit}
                              onChange={(e)=>editProfile(e.target.value, "language")}
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit ? setEditMode(false) : setEditMode(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3">
                            <TextField
                              size="small"
                              value={profile.address?profile.address.country : null}
                              label="Country"
                              disabled={!edit}
                              onChange={(e)=>editProfile(e.target.value, "address", "country")}
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit1 ? setEditMode1(false) : setEditMode1(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3">
                            <TextField
                              size="small"
                              value={profile.timeZone}
                             onChange={(e)=>editProfile(e.target.value, "timeZone")}
                              label="Time Zone"
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              disabled={!edit}
                              fullWidth
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit2 ? setEditMode2(false) : setEditMode2(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3">
                            <TextField
                              size="small"
                              value={profile.timeFormat}
                             onChange={(e)=>editProfile(e.target.value, "timeFormat")}
                              label="Time Format"
                              disabled={!edit}
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit3 ? setEditMode3(false) : setEditMode3(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3" style={{ paddingBottom: "20px" }}>
                            <TextField
                              size="small"
                              value={profile.workingHours}
                             onChange={(e)=>editProfile(e.target.value, "workingHours")}
                              label="Working Hours"
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                              disabled={!edit}
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit4 ? setEditMode4(false) : setEditMode4(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3" style={{ paddingBottom: "20px" }}>
                            <TextField
                              size="small"
                              value={profile.companyName}
                             onChange={(e)=>editProfile(e.target.value, "companyName")}
                              label="Company Name"
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                              disabled={!edit}
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit4 ? setEditMode4(false) : setEditMode4(true)
                            // } />
                            //   }}
                            />
                          </div>
                          <div className="mt-3" style={{ paddingBottom: "20px" }}>
                            <TextField
                              size="small"
                              value={profile.department}
                             onChange={(e)=>editProfile(e.target.value, "department")}
                              label="Department"
                              InputLabelProps={{ shrink: true }}
                              style={{ width: "80%" }}
                              fullWidth
                              disabled={!edit}
                            //   InputProps={{
                            //     endAdornment: <EditIcon onClick={() =>
                            //   edit4 ? setEditMode4(false) : setEditMode4(true)
                            // } />
                            //   }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Grid>
        
                  <Grid
                    xs={12}
                    sm={6}
                    item
                   
                   style={{border:"1px solid grey",borderRadius:"10px",height:"550px",marginTop:"161px"}}
                  >
                    <div className="mt-3" style={{marginLeft:"100px"}}>
                      <div>
                      
                        <TextField
                         name="name"
                         value= {profile.firstName + ' ' + profile.lastName}
                        //  onChange={(e)=>editProfile(e, "language")}
                         
                         InputLabelProps={{ shrink: true }}
                          label="Name"
                          style={{ width: "80%" }}
                          fullWidth
                          disabled={!edit}
                        //   InputProps={{
                        //     endAdornment: <EditIcon onClick={() =>
                        //   edit5 ? setEditMode5(false) : setEditMode5(true)
                        // } />
                        //   }}
                        />
                       
                      </div>
                      <div className="mt-3" >
                      
                        <TextField
                           name="title"
                           value={profile.title}
                           onChange={(e)=>editProfile(e.target.value, "title")}
                           disabled={!edit}
                           InputLabelProps={{ shrink: true }}
                            label="Title"
                            style={{ width: "80%" }}
                            fullWidth
                          //   InputProps={{
                          //     endAdornment: <EditIcon onClick={() =>
                          //   edit6 ? setEditMode6(false) : setEditMode6(true)
                          // } />
                          //   }}
                        />
                       
                      </div>
                      {/* <div className="mt-3" >
                        <TextField
                          name="startDate"
                          value={profile.startDate}
                         onChange={(e)=>editProfile(e, "uage")}
                          
                          InputLabelProps={{ shrink: true }}
                           label="Start Date"
                           style={{ width: "80%" }}
                           fullWidth
                        />
                      </div> */}
                      <div className="mt-3" >
                        <TextField
                           name="email"
                           value={currentUser.email}
                          //  onChange={(e)=>editProfile(e, "email")}
                           
                           InputLabelProps={{ shrink: true }}
                            label="Email"
                            style={{ width: "80%" }}
                            disabled={!edit}
                            fullWidth
                          //   InputProps={{
                          //     endAdornment: <EditIcon onClick={() =>
                          //   edit7 ? setEditMode7(false) : setEditMode7(true)
                          // } />
                          //   }}
                        />
                      </div>
                      <div className="mt-3" >
                        <TextField
                           name="uin"
                           value={profile.eid}
                           onChange={(e)=>editProfile(e.target.value, "eid")}
                           disabled={!edit}
                           InputLabelProps={{ shrink: true }}
                            label="Employee ID"
                            style={{ width: "80%" }}
                            fullWidth
                          //   InputProps={{
                          //     endAdornment: <EditIcon onClick={() =>
                          //   edit8 ? setEditMode8(false) : setEditMode8(true)
                          // } />
                          //   }}
                        />
                      </div>
                     
                      <div className="mt-3" >
                        <TextField
                           name="phoneNumber"
                           value={profile.phoneNumber}
                           onChange={(e)=>editProfile(e.target.value, "phoneNumber")}
                           disabled={!edit}
                           InputLabelProps={{ shrink: true }}
                        //    InputProps={{
                        //     endAdornment: <EditIcon onClick={() =>
                        //   edit9 ? setEditMode9(false) : setEditMode9(true)
                        // } />
                        //   }}
                            label="Phone Number"
                            style={{ width: "80%" }}
                            fullWidth
                        />
                      </div>
                      
                      <div className="mt-3" >
                        <TextField
                           name="city"
                           disabled={!edit}
                           value={profile.address?profile.address.city : null}
                           onChange={(e)=>editProfile(e.target.value, "address", "city")}
                           InputLabelProps={{ shrink: true }}
                        //    InputProps={{
                        //     endAdornment: <EditIcon onClick={() =>
                        //   edit10 ? setEditMode10(false) : setEditMode10(true)
                        // } />
                        //   }}
                            label="City"
                            style={{ width: "80%" }}
                            fullWidth
                        />
                      </div>
                      <div className="mt-3" >
                        <TextField
                         name="state"
                         value={profile.address?profile.address.state : null}
                         onChange={(e)=>editProfile(e.target.value,"address", "state")}
                         disabled={!edit}
                         InputLabelProps={{ shrink: true }}
                          label="State"
                          style={{ width: "80%" }}
                        //   InputProps={{
                        //     endAdornment: <EditIcon onClick={() =>
                        //   edit11 ? setEditMode11(false) : setEditMode11(true)
                        // } />
                        //   }}
                          fullWidth
                        />
                      </div>
                      <div className="mt-3" >
                        <TextField
                           name="country"
                           value={profile.address?profile.address.country : null}
                           onChange={(e)=>editProfile(e.target.value,"address", "country")}
                           InputLabelProps={{ shrink: true }}
                            label="Country"
                            style={{ width: "80%" }}
                            fullWidth
                            disabled={!edit}
                          //   InputProps={{
                          //     endAdornment: <EditIcon onClick={() =>
                          //   edit12 ? setEditMode12(false) : setEditMode12(true)
                          // } />
                          //   }}
                        />
                          
                      </div>
                      {/* <div className="mt-3" >
                      <Autocomplete
                            id="country-select-demo"
                            value={getSelectedCountry}
                            defaultValue="India"
                            // sx={{ width: 300 }}
                            options={countries}
                            onChange={(e, val)=>{console.log(e,'i am val', val);editProfile(val && val.label?val.label:"","address", "country");}}

                            disabled={!edit}
                            autoHighlight
                            getOptionLabel={(option) => option.label || ""}
                            renderOption={(props, option) => (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt=""
                                />
                                {option.label} ({option.code}) +{option.phone}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="country"
                               
                                // value={profile.address?profile.address.country : null}
                                InputLabelProps={{ shrink: true }}
                                  label="Country"
                                  
                                  style={{ width: "80%" }}
                                  fullWidth
                                  
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          </div> */}
                      
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
     
          </CardContent>
        
        </Card>
       
      </Grid>
                                {/* <div><h1>Hello world</h1></div> */}
    </div>
  );
}
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

export default connect(mapStateToProps)(App);
