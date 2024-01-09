import {
  Close,
  ExitToApp,
  PrintOutlined,
  SaveAlt,
} from "@material-ui/icons";
import { AddBoxOutlined } from "@material-ui/icons";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Grid, CardContent, Box, TextField, Card, FormControl } from "@material-ui/core";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteDialog from "../common/DeleteDialog";


 function Search(props) {
  const handleUpdateOwnerClick = () => {
    // dispatch(
    //   updateCandidate(candidateSelectedRow[0].id, { owner: owner.id })
    // ).then(() => {
    //   setShowChangeOwnerModal(false);
    //   setShowChangeStatus(false);
    //   history.push("/candidates");
    //   window.location.reload();
    // });
  };
  const { vendorSelectedRow } = props;
  const [showChangeStatus, setShowChangeStatus] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [owner, setOwner] = React.useState({});

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "rgb(128 128 128 / 0%)" }}>
        <div
          className="py-4"
          // className={`  ${jobSelectedRow?.length === 1 ? "pb-1 pt-4" : "py-4"}`}
        >
          <Grid container>
            <Grid item xs={12} md={6} className="d-flex align-items-center ">
              <h5 className=" text-uppercase fw-bold ">All Vendors</h5>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="d-flex justify-content-md-end  ">
                <div className=" custom-card">
                  <Link
                    href="/createvendor"
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
                  <Dropdown>
                    <Dropdown.Toggle variant="Light" id="dropdown-basic">
                      <ExitToApp style={{ fontSize: "22px" }} />
                      <br />
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Export
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Export to XML</Dropdown.Item>
                      <Dropdown.Item>Export as Pdf</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="custom-card text-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="Light" id="dropdown-basic">
                      <SaveAlt style={{ fontSize: "22px" }} />
                      <br />
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Import
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item> Import from file</Dropdown.Item>
                      <Dropdown.Item>Import from spreadsheet</Dropdown.Item>
                      <Dropdown.Item>Paste resume</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="custom-card text-center">
                  <div className="text-center">
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
                </div>
                <div className=" custom-card ms-md-4">
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
      {vendorSelectedRow?.length === 1 && (
      <Dropdown>
        <Dropdown.Toggle
          variant="Light"
          id="dropdown-basic"
          className="bg-temp-blue btn btn-primary"
        >
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/vendorview">Edit Vendor</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Send email</Dropdown.Item>
          <Dropdown.Item  onClick={(e) => {
                e.preventDefault();
                setShowChangeStatus(true);
              }}>Change Status</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Change Owner</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Print Preview</Dropdown.Item>
          <Dropdown.Item  onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      )}
      <Dialog
        open={showChangeStatus}
        onClose={() => setShowChangeStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Client Status"}</DialogTitle>
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
        closeDialog={(val) => setShowDeleteModal(val)}
        data={vendorSelectedRow ? vendorSelectedRow[0] : {}}
        modalType="vendor"
      />
    </>
  );
}
const status= [  { title: 'Active', year: 1994 },
{ title: 'Active', year: 1994 },
];
function mapStateToProps(state) {
  const { vendorSelectedRow} = state.client;

  return {
    vendorSelectedRow,
  };
}

export default connect(mapStateToProps)(Search);
