import {
  Close,
  ExitToApp,
  MoreHoriz,
  PrintOutlined,
  SaveAlt,
} from "@material-ui/icons";
import { AddBoxOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import {
  Grid,
  CardContent,
  Box,
  Card,
  FormControl,
  TextField,
} from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { getUsers } from "../../actions/auth";
import { updateCandidate } from "../../actions/candidate";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteDialog from "../common/DeleteDialog";

function Search(props) {
  const status= [  { title: 'Active', year: 1994 },
  { title: 'Active', year: 1994 },
];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const { candidateSelectedRow, usersList, candidateAssociated } = props;
  const [showChangeOwnerModal, setShowChangeOwnerModal] = React.useState(false);
  const [showChangeStatus, setShowChangeStatus] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [owner, setOwner] = React.useState({});
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
  };

  const handleUpdateOwnerClick = () => {
    dispatch(
      updateCandidate(candidateSelectedRow[0].id, { owner: owner.id })
    ).then(() => {
      setShowChangeOwnerModal(false);
      setShowChangeStatus(false);
      history.push("/candidates");
      window.location.reload();
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (candidateSelectedRow) {
      setOwner(
        usersList?.filter(
          (item) =>
            item.fullName ===
            candidateSelectedRow[0]?.ownedByFirstName + " " + candidateSelectedRow[0]?.ownedByLastName
        )[0]
      )
    }
  }, [candidateSelectedRow]);

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "rgb(128 128 128 / 0%)" }}>
        <div
          className="py-4"
          // className={`  ${jobSelectedRow?.length === 1 ? "pb-1 pt-4" : "py-4"}`}
        >
          <Grid container>
            <Grid item xs={12} md={6} className="d-flex align-items-center ">
              <h5 className=" text-uppercase fw-bold ">{candidateAssociated ? `Candidates associated to ${candidateAssociated.jobTitle}` : 'All candidate' }</h5>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="d-flex justify-content-md-end  ">
                <div className=" custom-card">
                  <Link
                    href="/addcandidate"
                    className="text-decoration-none text-black text-center"
                  >
                    <AddBoxOutlined
                      style={{ color: "black", fontSize: "22px" }}
                    />
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Add
                    </span>
                  </Link>
                </div>
                <div className="custom-card text-center">
                  <div
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className="text-center"
                    onClick={(e) => setAnchorEl3(e.currentTarget)}
                  >
                    <ExitToApp style={{ fontSize: "22px" }} />
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Export
                    </span>
                  </div>
                  <Menu
                    id="simple-menu"
                    name="el1"
                    anchorEl={anchorEl3}
                    keepMounted
                    open={Boolean(anchorEl3)}
                    onClose={() => setAnchorEl3(null)}
                  >
                    <MenuItem onClick={handleClose}>Export to XML</MenuItem>
                    <MenuItem onClick={handleClose}>Export as Pdf</MenuItem>
                  </Menu>
                </div>

                <div className="custom-card text-center">
                  <div
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className="text-center"
                  >
                    <SaveAlt style={{ fontSize: "22px" }} />
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Import
                    </span>
                  </div>
                  <Menu
                    id="simple-menu"
                    name="el1"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleClose}>Import from file</MenuItem>
                    <MenuItem onClick={handleClose}>
                      Import from spreadsheet
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Paste resume</MenuItem>
                  </Menu>
                </div>
                <div className="custom-card text-center">
                  <div
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                    className="text-center"
                  >
                    <PrintOutlined style={{ fontSize: "22px" }} />
                    <br />
                    <span
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Print
                    </span>
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={() => setAnchorEl2(null)}
                  >
                    <MenuItem onClick={handleClose}>Print</MenuItem>
                  </Menu>
                </div>
                <div
                  className=" custom-card ms-md-4"
                  style={{ marginRight: "0" }}
                >
                  <Link
                    href="/admindashboard"
                    className="text-black text-decoration-none "
                  >
                    <div className="text-center">
                      <Close
                        className=" fw-normal"
                        style={{ fontSize: "22px" }}
                      />
                      <br />
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Close
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {candidateSelectedRow?.length === 1 && (
        <Dropdown>
          <Dropdown.Toggle
            variant="Light"
            id="dropdown-basic"
            className="bg-temp-blue btn btn-primary"
          >
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <LinkRouter
                to={{
                  pathname: "/candidateview",
                  state: { data: candidateSelectedRow[0] },
                }}
              >
                Edit Candidate
              </LinkRouter>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">Send email</Dropdown.Item>
            <Dropdown.Item href="/jobopening">Associate to Job</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {
                e.preventDefault();
                setShowChangeStatus(true);
              }}>
              Change Status
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setShowChangeOwnerModal(true);
              }}
            >
              Change Owner
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">Print Preview</Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(true);
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Dialog
        open={showChangeOwnerModal}
        onClose={() => setShowChangeOwnerModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Owner"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Card
              style={{ maxWidth: 500, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Grid item></Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth size="small" style={{ width: 180 }}>
                    <Autocomplete
                      options={usersList}
                      style={{ width: "65%" }}
                      getOptionLabel={(option) => option?.firstName || ""}
                      id="controlled-demo"
                      name="owner"
                      value={owner}
                      onChange={(event, newValue) => {
                        setOwner(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Owner" margin="normal" />
                      )}
                    />
                  </FormControl>
                </Grid>
                <CardContent>
                  <Grid item>
                    <div style={{ width: "100%" }}>
                      <Box display="flex" p={0} bgcolor="background.paper">
                        <Box p={0}>
                          <Button
                            variant="contained"
                            align="left"
                            size="small"
                            onClick={handleUpdateOwnerClick}
                            style={{
                              margin: "0px 5px",
                              maxWidth: "140px",
                              minWidth: "126px",
                            }}
                          >
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                </CardContent>
              </CardContent>
            </Card>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showChangeStatus}
        onClose={() => setShowChangeStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Candidate Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Card
              style={{ maxWidth: 500, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Grid item></Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth size="small" style={{ width: 180 }}>
                    <Autocomplete
                      options={status}
                      style={{ width: "65%" }}
                      getOptionLabel={(option) => option?.status || "" }
                      id="controlled-demo"
                      name="owner"
                      value={owner}
                      onChange={(event, newValue) => {
                        setOwner(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Status" margin="normal" />
                      )}
                    />
                  </FormControl>
                </Grid>
                <CardContent>
                  <Grid item>
                    <div style={{ width: "100%" }}>
                      <Box display="flex" p={0} bgcolor="background.paper">
                        <Box p={0}>
                          <Button
                            variant="contained"
                            align="left"
                            size="small"
                            onClick={handleUpdateOwnerClick}
                            style={{
                              margin: "0px 5px",
                              maxWidth: "140px",
                              minWidth: "126px",
                            }}
                          >
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  </Grid>
                </CardContent>
              </CardContent>
            </Card>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <DeleteDialog
        openDialog={showDeleteModal}
        closeDialog={val => setShowDeleteModal(val)}
        data={candidateSelectedRow ? candidateSelectedRow[0] : {}}
        modalType="candidate"
      />
    </>
  );
}


function mapStateToProps(state) {
  const { candidateSelectedRow } = state.candidate;
  const { usersList } = state.auth;

  return {
    candidateSelectedRow,
    usersList,
  };
}

export default connect(mapStateToProps)(Search);
