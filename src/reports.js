import React,{ useEffect, useState } from "react";
import { connect,useDispatch } from "react-redux";
import html2pdf from 'html2pdf.js';
import { getUsers } from "./actions/auth";
import "./reports.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {FormControl, InputLabel, Select, TextField}  from "@material-ui/core";
import { Details } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {getReports} from './actions/reports';

function Reports(props) {
  const dispatch = useDispatch();
  const {  usersList = [], } = props;
  const { reports= [], } = props;
  var body = document.getElementById("toPrint");
  var worker = html2pdf();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getReports({createdBy:null, startDate:null, endDate:null}));
    
  }, []);
  const [state, setState] = React.useState({
    firstName:"",
    accountManager:"",
  });

  const [details, setDetails] = useState({createdBy: null, startDate:null, endDate:null});
  const [filter, setFilter] = useState(true);

  const rows = reports.map(row=>{
    return(
      <tr>    
      <th style={{fontSize:"15px",  width: "426px",
    background: "rgba(0, 0, 0, 0.03)",
    fontFamily: "sans-serif",
    fontWeight: "500"}} scope="row" >{row.jobTitle}</th>
      <td>{row.reports.Screening?row.reports.Screening:0}</td>
      <td>{row.reports.Associated?row.reports.Associated:0}</td>
      <td>{row.reports['Client Review']? row.reports['Client Review']: 0}</td>
      <td>{row.reports.Interviewing? row.reports.Interviewing: 0}</td>
      <td>{row.reports.Offered? row.reports.Offered:0}</td>
      <td>{row.reports.hired? row.reports.hired:0}</td>
      <td style={{ background:"rgb(0 0 0 / 7%)"}} className="fw-bold" >{row.reports.totalCandidate?row.reports.totalCandidate:0}</td>
    </tr>
    )
  })

  return (
    <div>
      <div className="row g-0 col-12 px-2">
        <div className="card rounded-10 bg-white shadow-sm border m-0 my-2 p-0  ">
          <div className="card-body ">
            <div className="row">
              <div className="col-md-12 me-auto text-center">
                <div className="row g-0  ">
                  <div className="d-flex flex-row ">
                    <div
                      className="btn btn-primary text-center my-auto me-2"
                      disabled
                      style={{ cursor: "initial" }}
                    >
                      Users
                    </div>
                    <div className="">
                    <Autocomplete style={{width:"150px"}}
                        options={usersList}
                        getOptionLabel={(option) => option.fullName || ""}
                        id="combo-box-demo"
                        name="accountManager"
                        
                        value={state.accountManager}
                        onChange={(event, newValue)=>{
                          if(newValue){
                            dispatch(getReports({...details, createdBy: newValue.id}));
                            setDetails({...details, createdBy: newValue.id});
                            setState({
                              ...state,
                              accountManager: newValue,
                            });
                          }else{
                            dispatch(getReports({...details, createdBy:null}));
                            setDetails({...details, createdBy: null});
                          }

                        }}
                        renderInput={(params) => (
                          <TextField style={{fontSize:"15px"}}
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label="Select User"
                            margin="normal"
                            size="small"
                          />
                        )}
                      />
                      {/* <select
                        class="form-select cursor-pointer"
                        aria-label="Default select example"
                      >
                         
                         <option
                           options={usersList}
                           value={state.firstName}
                          ></option>
                         {/* label={(option) => option.fullName || ""} */}
                         {/* key={option.id} */}
                        {/* {candidates.map((option) => (
                          <option
                            key={option.id}
                            value={option.firstName}
                            label={option.firstName}
                          ></option>
                        ))} */}
                      {/* </select> */} 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0 col-12">
          <div className="card rounded-10 bg-white shadow-sm border m-0 mb-2 p-0  ">
            <div className="card-body ">
              <div className="row">
                <div className="col-md-12 me-auto text-center">
                  <div className="row g-0  ">
                    <div className="d-flex flex-row ">
                      <div  
                      className="btn btn-secondary bg-temp-blue  text-center my-auto "
                      disabled
                      style={{ cursor: "initial",height:"45px",marginTop:"5px",paddingTop:"10px" }}
                      > 
                      Status of Jobs
                      </div>

                      <div class=" ms-2 me-2">
                        <div className="input-group" style={{height:"45px"}}>
                          <label
                            className="btn bg-light border text-center"
                            disabled
                            style={{ cursor: "initial",fontSize:"15px",paddingTop:"10px"}}
                          >
                            From
                          </label>
                          <input style={{ fontSize:"15px",paddingTop:"10px" }}
                            type="date"
                            class="form-control"
                            placeholder=""
                            onChange={(event, newVal)=>{
                              setDetails({...details, startDate:event.target.value});
                            }}
                          />
                        </div>
                      </div>
                      <div className="me-md-4">
                        <div className="input-group" style={{height:"45px"}}>
                          <label
                            className="btn bg-light border text-center"
                            disabled
                            style={{ cursor: "initial" ,fontSize:"15px",paddingTop:"10px" }}
                          >
                            To
                          </label>
                          <input
                          style={{ fontSize:"15px",paddingTop:"10px" }}
                            type="date"
                            class="form-control"
                            placeholder=""
                            onChange={(event)=>{
                              setDetails({...details, endDate:event.target.value});
                            }}
                          />
                        </div>
                      </div>
                      <div onClick={()=>{dispatch(getReports(details)); setFilter(!filter)}} className="btn  bg-temp-blue text-center my-auto   me-2" style={{height:"42px"}}>
                        <span>Apply Filter</span>
                      </div>
                      <Button 
                        className="btn bg-temp-blue text-center" 
                        variant="contained"
                        onClick={()=>{
                          worker.from(body).save();
                        }}
                        >Download</Button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0 col-12">
          <div className="card rounded-10 bg-white shadow-sm border m-0 mb-2 p-0  ">
            <div className="card-body " >
              <div className="row">
                <div className="col-md-12 me-auto text-center">
                  <div className="row g-0  ">
                    <table id="toPrint" className="table table-bordered table-hover report">
                     
  <thead style={{background:"rgb(0 0 0 / 4%)"}}>
    <tr>
      <th  style={{width:"430px", background:"rgb(0 0 0 / 3%)"}} scope="col">Posting Title</th>
      <th scope="col">Screening</th>
      <th scope="col">Associated</th>
      <th scope="col"style={{width:"160px"}}>Client Review</th>
      <th scope="col">Interview</th>
      <th scope="col">Offered</th>
      <th scope="col"style={{width:"120px"}}>Hired</th>
      <th scope="col" style={{width:"120px",  background:"rgb(0 0 0 / 3%)"}} >Total Count</th>
    </tr>
  </thead>
  <tbody>
    {rows}
  </tbody>
  
</table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { candidates } = state.candidate;
  const { usersList } = state.auth;
  const { reports } = state.reports;

  return {
    candidates,
    usersList,
    reports
  };
}

export default connect(mapStateToProps)(Reports);
