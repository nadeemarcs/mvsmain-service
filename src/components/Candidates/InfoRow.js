/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import "./candidate.css";
import { connect, useDispatch, useSelector } from "react-redux";
import FilterListIcon from "@material-ui/icons/FilterList";
import FlagIcon from "@material-ui/icons/Flag";
import moment from "moment";
import { getUsers } from "../../actions/auth";
import {
  getCandidates,
  rowSelected,
  updateCandidate,
} from "../../actions/candidate";
import { getFile } from "../../actions/upload";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Nav,
  Offcanvas,
  FormGroup,
  FormSelect,
  Dropdown,
} from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { TablePagination } from "@material-ui/core";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import { CandidateColDefs } from "./CandidateColDefs";
import { AddBoxOutlined, Close, ExitToApp, SaveAlt } from "@material-ui/icons";
import DeleteDialog from "../common/DeleteDialog";
import { Autocomplete } from "@material-ui/lab";
import AssociateJob from "./AssociateJob";
import { updateCandidateStatus } from "../../actions/job";
import MultipleUpload from "./MultipleUpload";
import {
  addCandidateNotes,
  deleteCandidateNotes,
  getCandidateNotes,
  updateCandidateNotes,
} from "../../actions/notes";
import { hideLoader, showLoader } from "../../actions/pageloader";

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 10,
    marginTop: "1.6rem",
  },
}))(Tooltip);

function InfoRow(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { jobAssociated, jobTitle } = props;
  const [showAssociateCandidate, setShowAssociateCandidate] = useState(false);
  const [showChangeOwnerModal, setShowChangeOwnerModal] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const [showMultipleUploadModal, setShowMultipleUploadModal] = useState(false);
  const [owner, setOwner] = useState({});
  const [status, setStatus] = useState("");
  const [filtering, setFiltering] = React.useState();

  const [note, setNote] = useState("");
  const [notesUpdate, setNotesUpdate] = useState({
    status: false,
    noteId: 0,
  });

  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState({
    id: "",
    firstName: "",
    lastName: "",
    modal: false,
    status: "",
    resume: "",
    updatedAt: "",
    jobCandidateMappings: [],
  });
  const [showNotesIcon, setShowNotesIcon] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [page, setPage] = useState(1);

  const candidates = useSelector((state) => state.candidate.candidates);
  const pressSearchEnter = useSelector(
    (state) => state.candidate.pressSearchEnter
  );
  const candidatesById = useSelector((state) => state.candidate.candidatesById);
  const candidateSelectedRow = useSelector(
    (state) => state.candidate.candidateSelectedRow
  );
  const candidateNotes = useSelector((state) => state.notes.candidateNotes);
  const usersList = useSelector((state) => state.auth.usersList);
  const loading = useSelector((state) => state.pageloader.loading);

  useEffect(() => {
    if (candidateSelectedRow && candidateSelectedRow.length) {
      setStatus(candidateSelectedRow[0]?.jobCandidateMappings[0]?.status);
    }
  }, [candidateSelectedRow]);
  useEffect(() => {
    dispatch(getUsers());
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      dispatch(getFile(openUpdateStatusModal.resume, true)).then((res) => {
        setDownloadUrl(res);
      });
    }
  }, [activeTab]);

  useEffect(() => {
    dispatch(rowSelected(selectedRow));
  }, [selectedRow]);

  const handleUpdateStatusOpen = (
    e,
    id,
    firstName,
    lastName,
    status,
    resume,
    updatedAt,
    jobCandidateMappings
  ) => {
    e.preventDefault();
    setOpenUpdateStatusModal({
      id,
      firstName,
      lastName,
      modal: true,
      status: jobCandidateMappings ? jobCandidateMappings[0]?.status : "",
      resume,
      updatedAt,
      jobCandidateMappings,
    });
  };

  const handleUpdateStatusClose = () => {
    setOpenUpdateStatusModal({
      ...openUpdateStatusModal,
      modal: false,
    });
    setActiveTab(0);
  };

  const handleDownloadFile = (resume) => {
    dispatch(getFile(resume));
  };

  const handleUpdateStatus = () => {
    const payload = {
      jobId: !jobAssociated?.id
        ? candidateSelectedRow[0]?.jobCandidateMappings[0]?.job?.id
        : jobAssociated?.id,
      candidateId: candidateSelectedRow[0].id,
      status: status,
    };
    dispatch(showLoader());
    dispatch(updateCandidateStatus(payload)).then(() => {
      setShowChangeStatus(false);
      dispatch(getCandidates(1, 20)).then(() => {
        dispatch(hideLoader());
        window.location.reload();
      });
    });
  };

  const handleUpdateClick = (jobCandidateMappings) => {
    const payload = {
      jobId: jobCandidateMappings[0]?.job.id,
      candidateId: openUpdateStatusModal.id,
      status: openUpdateStatusModal.status,
    };
    dispatch(showLoader());
    dispatch(updateCandidateStatus(payload)).then(() => {
      dispatch(getCandidates(1, 20)).then(() => {
        dispatch(hideLoader());
        window.location.reload();
      });
    });
  };

  const handleRating = (id, rating) => {
    dispatch(
      updateCandidate(id, {
        review: rating,
      })
    ).then(() => {
      window.location.reload();
    });
  };
  //Counteroffer
  const handleCounterOffer = (e, id, isCounterOffer) => {
    e.preventDefault();
    dispatch(showLoader());
    dispatch(updateCandidate(id, { isCounterOffer })).then(() => {
      dispatch(getCandidates(1, 20)).then((res) => {
        window.location.reload();
      });
      dispatch(hideLoader());
    });
  };

  const [columns] = useState(() => {
    return [
      {
        title: "Actions",
        field: "Actions",
        filtering: false,
        cellStyle: {
          whiteSpace: "nowrap",
        },
        width: "auto",
        render: (rowData) => (
          <>
            <div className=" d-flex flex-row ">
              <Tooltip title="Click To View Resume" placement="bottom">
                <div
                  // className=" cursor-pointer border border-dark rounded-start"
                  style={{ height: "18px" }}
                >
                  <VisibilityIcon
                    className="mb-1"
                    style={{
                      fontSize: "18px",
                      color: "gray",
                    }}
                    onClick={(e) => {
                      dispatch(showLoader());
                      handleUpdateStatusOpen(
                        e,
                        rowData.id,
                        rowData.firstName,
                        rowData.lastName,
                        rowData.status,
                        rowData.resume,
                        rowData.updatedAt,
                        rowData.jobCandidateMappings
                      );
                      dispatch(getCandidateNotes(rowData.id)).then(() => {
                        dispatch(hideLoader());
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <div style={{ height: "18px" }} className="">
                {rowData.isCounterOffer ? (
                  <Tooltip
                    title="Candidate has Counter Offer "
                    placement="bottom"
                  >
                    <span className="cursor-pointer">
                      <FlagIcon
                        className="mb-0 ms-1"
                        style={{
                          color: `${
                            rowData.isCounterOffer ? " green" : "#80808085"
                          }`,
                          fontSize: "22px",
                          marginTop: "-5px",
                        }}
                        onClick={(e) =>
                          handleCounterOffer(
                            e,
                            rowData.id,
                            !rowData.isCounterOffer
                          )
                        }
                      />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Click to set Candidate has Counter Offer "
                    placement="bottom"
                  >
                    <span className="cursor-pointer">
                      <FlagIcon
                        className="mb-0 ms-1"
                        style={{
                          color: `${
                            rowData.isCounterOffer ? " green" : "#80808085"
                          }`,
                          fontSize: "22px",
                          marginTop: "-5px",
                        }}
                        onClick={(e) =>
                          handleCounterOffer(
                            e,
                            rowData.id,
                            !rowData.isCounterOffer
                          )
                        }
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
              <Tooltip title="Select To Rate Candidate" placement="bottom">
                <div
                  // className={`   border border-dark border-start-0  ${
                  //   rowData?.resume && rowData?.resume?.startsWith("storage")
                  //     ? "border-end-0"
                  //     : "rounded-end"
                  // }`}
                  style={{ height: "18px" }}
                >
                  {rowData.review > 0 ? (
                    <StarIcon
                      className="mb-2 ms-1"
                      onClick={() => handleRating(rowData.id, 0)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#f7d20d",
                      }}
                    />
                  ) : (
                    // <Tooltip title="Under Notice Period" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/cute-clipart/64/000000/u.png"
                    //     onClick={() => handleRating(rowData.id, 0)}
                    //     className="mb-1 ms-1 border  border-primary"
                    //     style={{ height: "16px", width: "19px", padding: "1px" }}
                    //   />pagination
                    // </Tooltip>
                    <StarOutlineIcon
                      className="mb-2 ms-1"
                      onClick={() => handleRating(rowData.id, 1)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#74a2c3fc",
                      }}
                    />
                    // <Tooltip title="Under Notice Period" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/ios/50/000000/circled-u.png"
                    //     onClick={() => handleRating(rowData.id, 1)}
                    //     className="mb-1 ms-1"
                    //     style={{ height: "12px", width: "15px" }}
                    //   />
                    // </Tooltip>
                  )}
                  {rowData.review > 1 ? (
                    <StarIcon
                      className="mb-2"
                      onClick={() => handleRating(rowData.id, 1)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#f7d20d",
                      }}
                    />
                  ) : (
                    // <Tooltip title="Immediate" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/cute-clipart/64/000000/i.png"
                    //     onClick={() => handleRating(rowData.id, 1)}
                    //     className="mb-1 ms-1  border  border-primary "
                    //     style={{ height: "16px", width: "19px", padding: "1px" }}
                    //   />
                    // </Tooltip>
                    <StarOutlineIcon
                      className="mb-2"
                      onClick={() => handleRating(rowData.id, 2)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#74a2c3fc",
                      }}
                    />
                    // <Tooltip title="Immediate" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/ios/50/000000/circled-i.png"
                    //     onClick={() => handleRating(rowData.id, 2)}
                    //     className="mb-1 ms-1"
                    //     style={{ height: "12px", width: "15px" }}
                    //   />
                    // </Tooltip>
                  )}
                  {rowData.review > 2 ? (
                    <StarIcon
                      className="mb-2"
                      onClick={() => handleRating(rowData.id, 2)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#f7d20d",
                      }}
                    />
                  ) : (
                    // <Tooltip title="Need to serve Notice Period" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/cute-clipart/64/000000/n.png"
                    //     onClick={() => handleRating(rowData.id, 2)}
                    //     className="mb-1 ms-1 me-1 border  border-primary"
                    //     style={{ height: "16px", width: "19px", padding: "1px" }}
                    //   />
                    // </Tooltip>
                    <StarOutlineIcon
                      className="mb-2"
                      onClick={() => handleRating(rowData.id, 3)}
                      style={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#74a2c3fc",
                      }}
                    />
                    // <Tooltip title="Need to serve Notice Period" placement="bottom">
                    //   <img
                    //     src="https://img.icons8.com/ios/50/000000/circled-n.png"
                    //     onClick={() => handleRating(rowData.id, 3)}
                    //     className="mb-1 ms-1 me-1"
                    //     style={{ height: "12px", width: "15px" }}
                    //   />
                    // </Tooltip>
                  )}
                </div>
              </Tooltip>

              {rowData?.resume && rowData?.resume?.startsWith("storage") && (
                <div
                  // className="  border border-dark rounded-end"
                  style={{ height: "18px" }}
                >
                  <Tooltip title="Click to download Resume" placement="bottom">
                    <GetAppIcon
                      className="mb-1 ms-1"
                      onClick={() => handleDownloadFile(rowData.resume)}
                      style={{
                        fontSize: "medium",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </>
        ),
      },
      {
        cellStyle: {
          whiteSpace: "nowrap",
        },
        title: "Candidate Name",
        field: "candidatename",
        width: "auto",
        render: (rowData) => (
          <>
            <span className=" ">
              <LinkRouter
                style={{ color: "#0e2c66" }}
                to={{
                  pathname: "/candidateview",
                  state: { data: rowData },
                }}
              >
                {rowData.firstName} {rowData.lastName}
              </LinkRouter>
            </span>
          </>
        ),
        customFilterAndSearch: (term, rowData) =>
          rowData.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1,
      },

      ...CandidateColDefs,
    ];
  });

  const handleUpdateOwnerClick = () => {
    dispatch(
      updateCandidate(candidateSelectedRow[0].id, { owner: owner.id })
    ).then(() => {
      setShowChangeOwnerModal(false);
      history.push("/candidates");
      window.location.reload();
    });
  };

  const handleDeleteNote = (noteId, candId) => {
    dispatch(deleteCandidateNotes(noteId)).then(() =>
      dispatch(getCandidateNotes(candId))
    );
  };

  const handleNoteSave = (id) => {
    const addPayload = {
      noteType: "candidateNotes",
      entityId: id,
      createdBy: user.id,
      note,
    };
    const updatePayload = {
      noteType: "candidateNotes",
      note,
    };
    dispatch(showLoader());
    if (notesUpdate.status) {
      dispatch(updateCandidateNotes(notesUpdate.noteId, updatePayload)).then(
        () => {
          setNote("");
          setNotesUpdate({
            ...notesUpdate,
            status: false,
          });
          dispatch(getCandidateNotes(id)).then(() => {
            dispatch(hideLoader());
          });
        }
      );
    } else {
      dispatch(addCandidateNotes(addPayload))
        .then(() => {
          setNote("");
          dispatch(getCandidateNotes(id)).then(() => {
            dispatch(hideLoader());
          });
        })
        .catch((err) => {
          dispatch(hideLoader());
        });
    }
  };
  useEffect(() => {
    if (candidateSelectedRow && candidateSelectedRow.length) {
      setOwner(
        usersList?.filter(
          (item) =>
            item.fullName ===
            candidateSelectedRow[0]?.ownedByFirstName +
              " " +
              candidateSelectedRow[0]?.ownedByLastName
        )[0]
      );
    }
  }, [candidateSelectedRow]);
  const handleBack = () => {
    setPage(page - 1);
    dispatch(getCandidates(page - 1, 20));
  };
  const handleNext = () => {
    setPage(page + 1);
    dispatch(getCandidates(page + 1, 20));
  };

  return (
    <>
      <div className="candidate">
        <MaterialTable
          style={{ border: "1px solid #80808080" }}
          isLoading={props.isCandidatesLoading}
          title={
            jobAssociated
              ? `Candidates associated to ${jobAssociated.jobTitle}`
              : jobTitle
              ? `Candidates matching with ${jobTitle}`
              : "Candidates"
          }
          columns={columns.map((c) => ({ ...c, tableData: undefined }))}
          onSelectionChange={(row) => setSelectedRow(row)}
          data={!jobAssociated ? candidates && candidates.rows : candidatesById}
          components={{
            Toolbar: (props) => (
              <div className="toolbar">
                <MTableToolbar {...props} />
                {pressSearchEnter ? (
                  <p className="searchpara">
                    {candidates.count} Search Result(s)
                  </p>
                ) : null}
              </div>
            ),
            Pagination: (props) => (
              <TablePagination
                component="div"
                count={candidates.count}
                page={page - 1}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                  onClick: handleBack,
                  disabled: page > 1 ? false : true,
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                  onClick: handleNext,
                }}
                rowsPerPage={20}
                rowsPerPageOptions={[0, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />
            ),
          }}
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
            search: true,
            pageSize: 20,
            pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
            filtering,
            showTextRowsSelected: false,
            toolbar: true,
            headerStyle: {
              color: "grey",
              textTransform: "uppercase",
              fontSize: "15px",
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
              tooltip: "Add Candidate",
              isFreeAction: true,
              onClick: (event) => history.push("/addcandidate"),
            },

            {
              icon: () => (
                <FilterListIcon
                  onClick={() => {
                    setFiltering ? setFiltering(true) : filtering(true);
                  }}
                />
              ),
              isFreeAction: true,
              tooltip: "Filter",
            },
            {
              icon: () => (
                <>
                  <CustomTooltip
                    title="Import"
                    placement="bottom"
                    className="cursor-pointer text-temp-blue"
                    onClick={() => setShowMultipleUploadModal(true)}
                  >
                    <SaveAlt />
                  </CustomTooltip>
                </>
              ),
              isFreeAction: true,
            },
            {
              icon: () => (
                <>
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
                        <Dropdown.Item href="#/action-3">
                          Send email
                        </Dropdown.Item>
                        {candidateSelectedRow &&
                        candidateSelectedRow[0]?.jobCandidateMappings
                          ?.length ? (
                          <Dropdown.Item
                            onClick={(e) => {
                              e.preventDefault();
                              setShowChangeStatus(true);
                            }}
                          >
                            Change Status
                          </Dropdown.Item>
                        ) : (
                          ""
                        )}

                        <Dropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAssociateCandidate(true);
                          }}
                        >
                          Associate to Job
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
                  {openUpdateStatusModal.firstName}{" "}
                  {openUpdateStatusModal.lastName}
                </span>
                <h6 className="fw-normal d-flex align-items-center mb-0">
                  {moment(openUpdateStatusModal.updatedAt).format("DD/MM/YYYY")}
                </h6>
              </div>
              {openUpdateStatusModal.jobCandidateMappings.length ? (
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
                      label="Candidate status"
                      inputProps={{
                        name: "status",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value={"Associated"}>Associated</option>
                      <option value={"Screening"}>Screening</option>
                      <option value={"Client Review"}>Client Review</option>
                      <option value={"Interviewing"}>Interviewing</option>
                      <option value={"On-Hold"}>On-Hold</option>
                      <option value={"Offered"}>Offered</option>
                      <option value={"Hired"}>Hired</option>
                    </FormSelect>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      align="left"
                      size="small"
                      onClick={() =>
                        handleUpdateClick(
                          openUpdateStatusModal.jobCandidateMappings
                        )
                      }
                      disabled={
                        !openUpdateStatusModal.jobCandidateMappings.length
                      }
                      className="btn btn-primary"
                    >
                      Update
                    </Button>
                    {/* <span style={{ fontSize: 15, paddingLeft: 15, color: "red" }}>
                    {!openUpdateStatusModal.jobCandidateMappings.length
                      ? `**Status can't be changed unless the candidate is associated to a job`
                      : ""}
                  </span> */}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item style={{ width: "0px" }}>
              <Nav.Link
                eventKey="link-2"
                onClick={() => setActiveTab(1)}
                style={{ border: "1px solid #2f3950", height: "85%" }}
              >
                Resume
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ width: "0px" }}>
              <Nav.Link
                eventKey="link-1"
                onClick={() => setActiveTab(0)}
                style={{
                  border: "1px solid #2f3950",
                  borderLeft: "0px",
                  height: "85%",
                }}
              >
                Notes
              </Nav.Link>
            </Nav.Item>

            <Nav.Item></Nav.Item>
          </Nav>
          {activeTab === 1 ? (
            <div className="p-2 h-100 w-100">
              {openUpdateStatusModal.resume ? (
                <iframe
                  width="100%"
                  title="file-viewer"
                  height="600"
                  frameborder="0"
                  src={`https://docs.google.com/gview?url=${downloadUrl}&embedded=true`}
                ></iframe>
              ) : (
                "No Resume found"
              )}
            </div>
          ) : (
            <div
              className="rounded-10"
              style={{ border: "1px solid rgb(94, 114, 159)" }}
            >
              <div
                className="d-flex"
                style={{ borderBottom: "1px solid rgb(94, 114, 159)" }}
              >
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
                  <button
                    style={{ background: "#808080a6" }}
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
              </div>
              <div style={{ padding: 20 }}>
                {candidateNotes &&
                  candidateNotes.map((note, key) => {
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
          onClose={() => setShowChangeOwnerModal(false)}
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
                  name="owner"
                  value={owner}
                  onChange={(event, newValue) => {
                    setOwner(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Owner"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item className="text-center m-2 mt-4 ">
              <div style={{ width: "100%" }}>
                <div
                  className="btn btn-primary text-nowrap"
                  onClick={handleUpdateOwnerClick}
                >
                  Update
                </div>
              </div>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showChangeStatus}
        onClose={() => setShowChangeStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ minWidth: "350px" }}
          className="bg-secondary text-white text-uppercase"
        >
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>{"Change Status"}</Box>
            <Box>
              <Close
                onClick={() => setShowChangeStatus(false)}
                className="text-white cursor-pointer"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Status
                </InputLabel>
                <Select
                  native
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value={"Associated"}>Associated</option>
                  <option value={"Screening"}>Screening</option>
                  <option value={"Client Review"}>Client Review</option>
                  <option value={"Interviewing"}>Interviewing</option>
                  <option value={"On-Hold"}>On-Hold</option>
                  <option value={"Offered"}>Offered</option>
                  <option value={"Hired"}>Hired</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className="text-center m-2 mt-4 ">
              <div style={{ width: "100%" }}>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={
                    candidateSelectedRow &&
                    !candidateSelectedRow[0]?.jobCandidateMappings.length
                  }
                  className="btn btn-primary "
                >
                  Update
                </Button>
                <div style={{ fontSize: 15, paddingTop: 15, color: "red" }}>
                  {candidateSelectedRow &&
                  !candidateSelectedRow[0]?.jobCandidateMappings.length
                    ? `**Status can't be changed unless the candidate is associated to a job`
                    : ""}
                </div>
              </div>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <DeleteDialog
        openDialog={showDeleteModal}
        closeDialog={(val) => setShowDeleteModal(val)}
        data={candidateSelectedRow ? candidateSelectedRow[0] : {}}
        modalType="candidate"
      />
      {showAssociateCandidate && (
        <AssociateJob
          openDialog={showAssociateCandidate}
          candidateSelectedRow={
            candidateSelectedRow ? candidateSelectedRow[0] : {}
          }
          closeDialog={(val) => setShowAssociateCandidate(val)}
        />
      )}
      <MultipleUpload
        openDialog={showMultipleUploadModal}
        closeDialog={(val) => setShowMultipleUploadModal(val)}
        // data={jobSelectedRow ? jobSelectedRow[0] : {}}
        // modalType="job"
      />
    </>
  );
}

function mapStateToProps(state) {
  const { candidates, candidateSelectedRow, candidatesById } = state.candidate;
  const { candidateNotes } = state.notes;
  const { usersList } = state.auth;
  const { loading } = state.pageloader;
  return {
    candidates,
    usersList,
    candidateSelectedRow,
    candidateNotes,
    loading,
    candidatesById,
  };
}

//export default connect(mapStateToProps)(React.memo(InfoRow));
export default InfoRow;
