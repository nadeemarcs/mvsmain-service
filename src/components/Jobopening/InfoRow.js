/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import "./Jobopening.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from '@material-ui/icons/FilterList';
// import PDF from 'react-pdf-scroll';
import moment from "moment";
import {
  updateJob,
  rowSelected,
  getPrefferedCandidate,
  getJobs,
} from "../../actions/job";

import {
  Grid,
  FormControl,
  Button,
  Box,
  TextField,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import {
  Dropdown,
  FormGroup,
  FormSelect,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { JobColDefs } from "./JobColDefs";
import { AddBoxOutlined, Close, ExitToApp } from "@material-ui/icons";
import AssociateCandidate from "./AssociateCandidate";
import DeleteDialog from "../common/DeleteDialog";
import { Autocomplete } from "@material-ui/lab";
import { getUsers } from "../../actions/auth";
import { getFile } from "../../actions/upload";
import {
  addJobNotes,
  getJobNotes,
  deleteJobNotes,
  updateJobNotes,
} from "../../actions/notes";
import { hideLoader, showLoader } from "../../actions/pageloader";

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 10,
    marginTop: "1.6rem",
  },
}))(Tooltip);

function InfoRow(props) {
  const { jobs, deSelectJobsGrid, jobNotes, loading } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [gridData, setGridData] = useState(jobs);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState({
    id: "",
    modal: false,
    status: "",
    jobTitle: "",
    jobDescription: "",
    fileAttached: "",
  });
  const [showNotesIcon, setShowNotesIcon] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState({});
  const [filtering, setFiltering] = React.useState();
  const [note, setNote] = useState("");

  const [notesUpdate, setNotesUpdate] = useState({
    status: false,
    noteId: 0,
  });

  useEffect(() => {
    dispatch(getUsers());
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    dispatch(rowSelected(selectedRow));
  }, [dispatch, selectedRow]);

  const handleUpdateStatusOpen = (
    e,
    id,
    status,
    jobTitle,
    jobDescription,
    updatedAt,
    fileAttached
  ) => {
    e.preventDefault();
    setOpenUpdateStatusModal({
      modal: true,
      status,
      jobTitle,
      id,
      jobDescription,
      updatedAt,
      fileAttached,
    });
  };

  const handleHotJobClick = (e, id, isHots) => {
    e.preventDefault();
    dispatch(showLoader());
    dispatch(updateJob(id, { isHots })).then(() => {
      dispatch(getJobs());
      dispatch(hideLoader());
    });
  };

  const handleUpdateStatusClose = () => {
    setOpenUpdateStatusModal({
      ...openUpdateStatusModal,
      modal: false,
    });
    setActiveTab(0);
  };

  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    if (activeTab === 2) {
      dispatch(getFile(openUpdateStatusModal.fileAttached, true)).then(
        (res) => {
          setDownloadUrl(res);
        }
      );
    }
  }, [activeTab]);

  const [columns] = useState([
    {
      title: "Actions",
      field: "Actions",
      filtering: false,
      export: false,
      render: (rowData) => (
        <>
          <span style={{ display: "flex", margin: "0px 0px" }}>
          <Tooltip title="Click To View Resume" placement="bottom">
            <span className="cursor-pointer">
              <VisibilityIcon
                className="me-3"
                style={{
                  color: "gray",
                  fontSize: "18px",
                }}
                onClick={(e) => {
                  dispatch(showLoader());
                  handleUpdateStatusOpen(
                    e,
                    rowData.id,
                    rowData.jobOpeningStatus,
                    rowData.jobTitle,
                    rowData.jobDescription,
                    rowData.updatedAt,
                    rowData.fileAttached
                  );
                  dispatch(getJobNotes(rowData.id)).then(() => {
                    dispatch(hideLoader());
                  });
                }}
              />
            </span>
            </Tooltip >
            <Tooltip title="Click to set it HotJob" placement="bottom">
              <span className="cursor-pointer">
                <WhatshotIcon
                  style={{
                    color: `${rowData.isHots ? "#ff4802" : "grey"}`,
                    fontSize: "20px",
                  }}
                  onClick={(e) =>
                    handleHotJobClick(e, rowData.id, !rowData.isHots)
                  }
                />
              </span>
            </Tooltip>
          </span>
        </>
      ),
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Job Id",
      field: "jobId",
      initialEditValue: "initial edit value",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Job Title",
      field: "jobTitle",
      render: (rowData) => (
        <>
          <span className=" ">
            <LinkRouter
              style={{ color: "#0e2c66" }}
              to={{
                pathname: "/view",
                state: { data: rowData },
              }}
            >
              {rowData.jobTitle}
            </LinkRouter>
          </span>
        </>
      ),
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Job Opening Status",
      field: "jobOpeningStatus",
      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Client Name",
      render: (rowData) => (
        <LinkRouter
          style={{ color: "#0e2c66" }}
          to={{
            pathname: "/clientview",
            state: { data: rowData },
          }}
        >
          {rowData.clientName}
        </LinkRouter>
      ),
      field: "clientName",
      initialEditValue: "initial edit value",
    },
    ...JobColDefs,
  ]);

  useEffect(() => {
    setGridData(jobs);
  }, [jobs]);
  const [showChangeOwnerModal, setShowChangeOwnerModal] = useState(false);
  const { jobSelectedRow, usersList } = props;
  const [accountManager, setAccountManager] = useState({});

  const handleUpdateClick = () => {
    dispatch(
      updateJob(openUpdateStatusModal.id, {
        jobOpeningStatus: openUpdateStatusModal.status,
      })
    ).then(() => {
      setOpenUpdateStatusModal({
        ...openUpdateStatusModal,
      });
      history.push("/jobopening");
      window.location.reload();
    });
  };

  const tableRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssociateCandidate, setShowAssociateCandidate] = useState(false);
  const handleFindMatchingCandidates = () => {
    dispatch(getPrefferedCandidate(jobSelectedRow[0].id)).then((res) => {
      history.push({
        pathname: "/candidates",
        search: `?jobTitle=${jobSelectedRow[0].jobTitle}`,
      });
    });
  };
  const handleUpdateOwnerClick = () => {
    const accountManagerJoin =
      accountManager.firstName + " " + accountManager.lastName;

    dispatch(
      updateJob(jobSelectedRow[0].id, { accountManager: accountManagerJoin })
    ).then(() => {
      setShowChangeOwnerModal(false);
      history.push("/jobopening");
      window.location.reload();
    });
  };

  const handleDeleteNote = (noteId, jobId) => {
    dispatch(deleteJobNotes(noteId)).then(() => dispatch(getJobNotes(jobId)));
  };

  useEffect(() => {
    setAccountManager(
      usersList?.filter(
        (item) => item.fullName === jobSelectedRow[0]?.accountManager
      )[0]
    );
  }, [jobSelectedRow]);

  useEffect(() => {
    if (deSelectJobsGrid) tableRef.current.onAllSelected(false);
  }, [deSelectJobsGrid]);

  const handleNoteSave = (id) => {
    const addPayload = {
      noteType: "jobNotes",
      entityId: id,
      createdBy: user.id,
      note,
    };
    const updatePayload = {
      noteType: "jobNotes",
      note,
    };
    dispatch(showLoader());
    if (notesUpdate.status) {
      dispatch(updateJobNotes(notesUpdate.noteId, updatePayload)).then(() => {
        setNote("");
        setNotesUpdate({
          ...notesUpdate,
          status: false,
        });
        dispatch(getJobNotes(id)).then(() => {
          dispatch(hideLoader());
        });
      });
    } else {
      dispatch(addJobNotes(addPayload))
        .then(() => {
          setNote("");
          dispatch(getJobNotes(id)).then(() => {
            dispatch(hideLoader());
          });
        })
        .catch((err) => {
          dispatch(hideLoader());
        });
    }
  };

  return (
    <>
      <div className="job-opening ">
        <MaterialTable
          components={{
            Toolbar: (toolbarProps) => (
              <>
                <MTableToolbar {...toolbarProps} />
              </>
            ),
          }}
          tableRef={tableRef}
          // style={{ border: "1px solid #80808080" }}
          title="Job Opening"
          isLoading={props.isJobsLoading}
          columns={columns}
          data={gridData}
          key={10}
          onSelectionChange={(row) => setSelectedRow(row)}
          icons={{
            Export: forwardRef((props, ref) => (
              <ExitToApp {...props} ref={ref} />
            )),
          }}
          options={{
            exportButton: true,
            selection: true,
            columnsButton: true,
            toolbarButtonAlignment: "left",
            // actionsColumnIndex: -1,
            pageSize: 20,
            pageSizeOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            filtering,
            showTextRowsSelected: false,
            toolbar: true,
            headerStyle: {
              color: "grey",
              textTransform: "uppercase",
              fontSize: "15px !important",
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              whiteSpace: "nowrap",
            },
            rowStyle: {
              textTransform: "capitalize",
            },
          }}
          actions={[
            {
              icon: () => <AddBoxOutlined className="text-temp-blue" />,
              tooltip: "Add Job",
              isFreeAction: true,
              onClick: (event) => history.push("/createjob"),
            },
            {
              icon: () => (
                <>
                 <FilterListIcon onClick={() =>  {setFiltering ? setFiltering(true) : filtering(true)} }></FilterListIcon>
                </>
              ),
              isFreeAction: true,
              tooltip: "Filter",
            },
            // {
            //   icon: () => (
            //     <>
            //       <Dropdown>
            //         <Dropdown.Toggle
            //           variant="transparent"
            //           className="px-0 btn pt-0"
            //         >
            //           <CustomTooltip
            //             title="Import"
            //             placement="bottom"
            //             className="cursor-pointer text-temp-blue"
            //           >
            //             <SaveAlt />
            //           </CustomTooltip>
            //         </Dropdown.Toggle>
            //         <Dropdown.Menu>
            //           <Dropdown.Item> Import from file</Dropdown.Item>
            //           <Dropdown.Item>Import from spreadsheet</Dropdown.Item>
            //           <Dropdown.Item>Paste resume</Dropdown.Item>
            //         </Dropdown.Menu>
            //       </Dropdown>
            //     </>
            //   ),
            //   isFreeAction: true,
            // },
            // {
            //   icon: () => (
            //     <>
            //       <Dropdown>
            //         <Dropdown.Toggle
            //           variant="transparent"
            //           className="px-0 btn pt-0"
            //         >
            //           <CustomTooltip
            //             title="Export"
            //             placement="bottom"
            //             className="cursor-pointer text-temp-blue"
            //           >
            //             <ExitToApp />
            //           </CustomTooltip>
            //         </Dropdown.Toggle>
            //         <Dropdown.Menu>
            //           <Dropdown.Item>Export to XML</Dropdown.Item>
            //           <Dropdown.Item>Export as Pdf</Dropdown.Item>
            //         </Dropdown.Menu>
            //       </Dropdown>
            //     </>
            //   ),
            //   isFreeAction: true,
            // },

            {
              icon: () => (
                <>
                  {jobSelectedRow?.length === 1 && (
                    <Dropdown className="">
                      <Dropdown.Toggle
                        variant="Light"
                        id="dropdown-basic"
                        className="bg-temp-blue btn btn-primary "
                      >
                        Menu
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <LinkRouter
                            to={{
                              pathname: "/view",
                              state: { data: jobSelectedRow[0] },
                            }}
                          >
                            Edit Job
                          </LinkRouter>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAssociateCandidate(true);
                          }}
                        >
                          Associate Candidates
                        </Dropdown.Item>
                        <Dropdown.Item href="postJobs">
                          Publish or Post Job
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleFindMatchingCandidates}>
                          Find Matching Candidates
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            setShowChangeOwnerModal(true);
                          }}
                        >
                          Change Owner
                        </Dropdown.Item>

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
                </>
              ),

              isFreeAction: false,
            },
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <h1
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "22px",
                  }}
                >
                  No records to display
                </h1>
              ),
            },
          }}
        />
      </div>

      <Offcanvas
        show={openUpdateStatusModal.modal}
        onHide={handleUpdateStatusClose}
        placement="end"
        fullWidth
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">
            <div className="d-flex flex-column   ">
              <div className="d-flex flex-row pb-2">
                <span className="text-nowrap me-2 text-temp-blue">
                  {openUpdateStatusModal.jobTitle}
                </span>
                <h6 className="fw-normal d-flex align-items-center mb-0">
                  {moment(openUpdateStatusModal.updatedAt).format("DD/MM/YYYY")}
                </h6>
              </div>
              <div className="d-flex flex-row">
                <FormGroup size="large" className=" me-2 ">
                  <FormSelect
                    native
                    value={openUpdateStatusModal.status}
                    onChange={(e) => {
                      setOpenUpdateStatusModal({
                        ...openUpdateStatusModal,
                        status: e.target.value,
                      });
                    }}
                    label="Job Opening status"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value={0}>None</option>
                    <option value={"In Progress"}>In Progress</option>
                    <option value={"Active"}>Active</option>
                    <option value={"On Hold"}>On Hold</option>
                    <option value={"Interviewing"}>Interviewing</option>
                    <option value={"Filed"}>Filed</option>
                    <option value={"Upcoming"}>Upcoming</option>
                    <option value={"Waiting for Approval"}>
                      Waiting for Approval
                    </option>
                    <option value={"Closed"}>Closed</option>
                    <option value={"Cancelled"}>Cancelled</option>
                    <option value={"Hired"}>Hired</option>
                  </FormSelect>
                </FormGroup>
                <div className="text-center">
                <Button
                    variant="contained"
                    align="left"
                    size="small"
                    onClick={handleUpdateClick}
                    className="btn btn-primary"
                    style={{backgroundColor: "#0d6efd"}}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            
            <Nav.Item style={{width:"0px"}}>

              <Nav.Link eventKey="link-1" onClick={() => setActiveTab(0)}  style={{border:"1px solid #2f3950", height:"85%"}}>
                Job Description
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{width:"0px"}}>
              <Nav.Link eventKey="link-2" onClick={() => setActiveTab(1)} style={{border:"1px solid #2f3950",borderLeft:"0px", height:"85%"}}>
                Notes
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="link-3" onClick={() => setActiveTab(2)}>
                Attachment
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item></Nav.Item>
          </Nav>
          {activeTab === 0 ? (
            <div className="p-2 mt-2 border rounded-10">
              {openUpdateStatusModal.jobDescription}
            </div>
          ) : activeTab === 1 ? (
            <div className="rounded-10" style={{border:"1px solid rgb(94, 114, 159)"}}>
              <div className=" d-flex" style={{borderBottom:"1px solid rgb(94, 114, 159)"}}>
                <div className="pt-2 ps-2 fw-normal">Notes Section</div>
                <div className="ms-auto pb-2 pt-1 pe-2">
                  <button 
                    type="button"
                    disabled={note === ""}
                    onClick={() => handleNoteSave(openUpdateStatusModal.id)}
                    className="btn btn-primary btn-sm"
                  >
                    {notesUpdate.status ? "Update" : "Save"}
                  </button>
                  {/* <button type="button" className="btn btn-danger btn-sm ms-2">
                    Edit
                  </button> */}
                  <button style={{background:"#808080a6"}}
                    type="button"
                    onClick={() => setNote("")}
                    className="btn btn-light btn-sm ms-2"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="ps-2 pe-4 py-2">
                <div className="mt-2">
                  <TextField
                    name="note"
                    value={note}
                    id="standard-full-width"
                    style={{ margin: 8, width: "60%" }}
                    placeholder="Add your Notes Here"
                    onChange={(e) => setNote(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div style={{ padding: 20 }}>
                  {jobNotes &&
                    jobNotes.map((note, key) => {
                      return (
                        <li
                          onMouseEnter={() => setShowNotesIcon(true)}
                          onMouseLeave={() => setShowNotesIcon(false)}
                        >
                          <b>{note.note}</b>
                          <i> - added by </i> {note.createdByFirstName}{" "}
                          {note.createdByLastName} <i> at </i>{" "}
                          {note.createdAt === note.updatedAt
                            ? moment(note.createdAt).format(
                                "Do MMM YYYY, hh:mm:ss A"
                              )
                            : moment(note.updatedAt).format(
                                "Do MMM YYYY, hh:mm:ss A"
                              )}
                          {user.id === note.createdBy && showNotesIcon && (
                            <>
                              <CustomTooltip
                                title="Edit Note"
                                placement="bottom"
                                className="cursor-pointer"
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                  setNotesUpdate({
                                    noteId: note.id,
                                    status: true,
                                  });
                                  setNote(note.note);
                                }}
                              >
                                <EditIcon />
                              </CustomTooltip>
                              <CustomTooltip
                                title="Delete Note"
                                placement="bottom"
                                className="cursor-pointer"
                                style={{ marginLeft: 10 }}
                                onClick={() =>
                                  handleDeleteNote(
                                    note.id,
                                    openUpdateStatusModal.id
                                  )
                                }
                              >
                                <DeleteIcon />
                              </CustomTooltip>
                            </>
                          )}
                        </li>
                      );
                    })}
                </div>
                <div className="mt-4 mb-2"></div>
              </div>
            </div>
          ) : (
            <div className="p-2 h-100 w-100">
              {openUpdateStatusModal.fileAttached ? (
                <iframe
                  width="100%"
                  title="file-viewer"
                  height="600"
                  frameBorder="0"
                  src={`https://docs.google.com/gview?url=${downloadUrl}&embedded=true`}
                ></iframe>
              ) : (
                "No Attachment found"
              )}
              {/* {/* <FileViewer
        fileType={downloadUrl}
        filePath={'pdf'}
        /> */}
            </div>
          )}
          {loading ? (
            <div class="loader-container">
              <div className="loader">
                <CircularProgress disableShrink />
              </div>
            </div>
          ) : (
            ""
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Dialog
        open={showChangeOwnerModal}
        onClose={() => setShowChangeOwnerModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ width: "350px" }}
          className="bg-secondary text-white text-uppercase"
        >
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>{"Change Owner"}</Box>
            <Box>
              <Close
                onClick={() => setShowChangeOwnerModal(false)}
                className="text-white cursor-pointer"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid item>
              <FormControl fullWidth>
                <Autocomplete
                  options={usersList}
                  getOptionLabel={(option) => option?.firstName || ""}
                  id="controlled-demo"
                  name="accountManager"
                  value={accountManager}
                  onChange={(event, newValue) => {
                    setAccountManager(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Owner"
                      margin="normal"
                      inputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item className="text-center m-2 mt-4 ">
              <div style={{ width: "100%" }}>
                <div
                  className="btn btn-primary "
                  onClick={handleUpdateOwnerClick}
                >
                  Update
                </div>
              </div>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <DeleteDialog
        openDialog={showDeleteModal}
        closeDialog={(val) => setShowDeleteModal(val)}
        data={jobSelectedRow ? jobSelectedRow[0] : {}}
        modalType="job"
      />
      <AssociateCandidate
        openDialog={showAssociateCandidate}
        closeDialog={(val) => setShowAssociateCandidate(val)}
      />
    </>
  );
}

function mapStateToProps(state) {
  const { jobs, deSelectJobsGrid } = state.job;
  const { jobSelectedRow } = state.job;
  const { usersList } = state.auth;
  const { jobNotes } = state.notes;
  const { loading } = state.pageloader;
  return {
    jobs,
    deSelectJobsGrid,
    jobSelectedRow,
    usersList,
    jobNotes,
    loading,
  };
}

export default connect(mapStateToProps)(InfoRow);
