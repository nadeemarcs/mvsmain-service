/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link as LinkRouter } from "react-router-dom";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CandidateColDefs } from "../Candidates/CandidateColDefs";
import { getFile } from "../../actions/upload";
import {
  associateCandidate,
  deSelectJobsGrid,
  getJobs,
} from "../../actions/job";
import { hideLoader, showLoader } from "../../actions/pageloader";
import {
  addCandidateNotes,
  getCandidateNotes,
} from "../../actions/notes";
import { getUsers } from "../../actions/auth";
import { getCandidates } from "../../actions/candidate";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#0e2c66",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function AssociateCandidate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openDialog, closeDialog, candidates, jobSelectedRow, jobIds } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedCandidateRow, setSelectedCandidateRow] = useState([]);
  const [associateCandidateDialog, setAssociateCandidateDialog] =
    useState(false);
  const [candidateStatus, setCandidateStatus] = useState("Associated");
  const [note, setNote] = useState("");

  const [resume, setResume] = useState();
  const [user, setUser] = useState({});

  const [showResume, setShowResume] = useState(false);
  const handleShowResume = (resume) => {
    dispatch(getFile(resume, true)).then((res) => {
      setDownloadUrl(res);
    });
    setResume(resume);
    setShowResume(true);
  };
  useEffect(() => {
    dispatch(getUsers());
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const [downloadUrl, setDownloadUrl] = useState("");

  const [columns] = useState([
    {
      title: "Actions",
      field: "Actions",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <>
          <div className="d-flex justify-content-start">
            <div className="me-3">
              <Tooltip title="Click to View Resume" placement="bottom">
                <VisibilityIcon
                  style={{
                    fontSize: "large",
                    color: "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => handleShowResume(rowData.resume)}
                />
              </Tooltip>
            </div>

            {rowData?.resume && rowData?.resume?.startsWith("storage") && (
              <div>
                <Tooltip title="Click to download Resume" placement="bottom">
                  <GetAppIcon
                    onClick={() => handleDownloadFile(rowData.resume)}
                    style={{
                      fontSize: "large",
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
      render: (rowData) => (
        <>
          <span>
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
    },

    ...CandidateColDefs,
  ]);

  const handleDownloadFile = (data) => {
    dispatch(getFile(data));
  };

  useEffect(() => {
    if (openDialog) setOpen(openDialog);
  }, [openDialog]);

  const handleClose = (e) => {
    e?.preventDefault();
    setSelectedCandidateRow([]);
    setOpen(false);
    closeDialog(false);
    dispatch(deSelectJobsGrid(true));
  };
  const handleCloseResume = (e) => {
    e?.preventDefault();
    setShowResume(false);
    setResume();
  };
  const handleAssociateCandidates = () => {
    const candidateIds = [];
    selectedCandidateRow?.forEach((candidate) =>
      candidateIds.push(candidate.id)
    );
    const payload = {
      jobIds: !jobIds ? [jobSelectedRow[0]?.id] : [jobIds],
      candidateIds,
      status: candidateStatus,
    };
    const addPayload = {
      noteType: "candidateNotes",
      entityId: selectedCandidateRow[0].id,
      createdBy: user.id,
      note,
    };

    dispatch(showLoader());

    dispatch(addCandidateNotes(addPayload))
      .then(() => {
        setNote("");
        dispatch(getCandidateNotes(selectedCandidateRow[0].id)).then(() => {
          dispatch(hideLoader());
        });
      })
      .catch((err) => {
        dispatch(hideLoader());
      });

    dispatch(associateCandidate(payload)).then((res) => dispatch(getJobs()));
    setAssociateCandidateDialog(false);
    handleClose();
  };

  return (
    <div>
      {showResume === false ? (
        <>
          <Dialog
            fullScreen
            open={open}
            style={{ marginTop: 72 }}
            onClose={handleClose}
            TransitionComponent={Transition}
            // BackdropProps={{ style: { backgroundColor: "transparent" } }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar style={{ background: "#0e2c66" }}>
                <IconButton
                  edge="start"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon className="text-white" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Add Candidate
                </Typography>
              </Toolbar>
            </AppBar>
            <div className="candidate" style={{ padding: 30 }}>
              <div style={{ marginTop: 20, marginBottom: 10 }}>
                {!selectedCandidateRow.length ? (
                  "Select the candidate from the list"
                ) : (
                  <Button
                    variant="contained"
                    align="right"
                    size="small"
                    color="primary"
                    disabled={!selectedCandidateRow.length}
                    onClick={() => setAssociateCandidateDialog(true)}
                  >
                    ASSOCIATE NOW
                  </Button>
                )}
              </div>

              <MaterialTable
                style={{ border: "1px solid #80808080" }}
                title=""
                columns={columns}
                onSelectionChange={(row) => setSelectedCandidateRow(row)}
                data={query => 
                  new Promise((resolve, reject) => {
                    dispatch(getCandidates(query.page+1, query.pageSize)).then((res) => {
                      resolve({
                        data: res.rows,
                        page: query.page,
                        totalCount: res.count
                      })
                    })
                  })
                }
                options={{
                  selection: true,
                  columnsButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20],
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
          </Dialog>
          <Dialog
            open={associateCandidateDialog}
            onClose={() => setAssociateCandidateDialog(false)}
            aria-labelledby="form-dialog-title"
            // style={{ width: 500 }}
          >
            <DialogTitle id="form-dialog-title">
              Associate Candidates for {jobSelectedRow[0]?.jobTitle}
            </DialogTitle>
            <DialogContent>
              <FormControl
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                className={classes.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Candidate Status
                </InputLabel>
                <Select
                  native
                  name="candidateStatus"
                  value={candidateStatus}
                  onChange={(e) => setCandidateStatus(e.target.value)}
                  label="Candidate Status"
                  inputProps={{
                    name: "candidateStatus",
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
                </Select>
              </FormControl>
              <Typography
                //   variant="h6"
                gutterBottom
                align="left"
                className="py-2 ps-n2"
              >
                Notes
              </Typography>
              <TextField
                variant="outlined"
                size="large"
                fullWidth
                multiline
                rows={7}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                name="candidateComments"
                placeholder="Enter notes here"
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => setAssociateCandidateDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                align="right"
                size="small"
                color="primary"
                onClick={handleAssociateCandidates}
              >
                Associate
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            fullScreen
            open={showResume}
            onClose={handleCloseResume}
            TransitionComponent={Transition}
            style={{ backgroundColor: "transparent" }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar style={{ background: "#0e2c66" }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleCloseResume}
                  aria-label="close"
                >
                  <CloseIcon className="text-white" />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <div className="p-2 h-100 w-100">
                {resume ? (
                  <iframe
                    width="100%"
                    title="file-viewer"
                    height="600"
                    frameBorder="0"
                    src={`https://docs.google.com/gview?url=${downloadUrl}&embedded=true`}
                  ></iframe>
                ) : (
                  "No Resume found"
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { candidates } = state.candidate;
  const { jobSelectedRow } = state.job;
  return {
    candidates,
    jobSelectedRow,
  };
}

export default connect(mapStateToProps)(AssociateCandidate);
