import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import WhatshotIcon from "@material-ui/icons/Whatshot";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
import { JobColDefs } from "../Jobopening/JobColDefs";
import { associateCandidate, deSelectJobsGrid } from "../../actions/job";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AssociateJob = React.memo((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { openDialog, closeDialog, jobs, candidateSelectedRow } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedJobRow, setSelectedJobRow] = useState([]);
  const [associateJobDialog, setAssociateJobDialog] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState("New");
  const [candidateComments, setCandidateComments] = useState("");
  const [columns] = useState([
    {
      title: "Actions",
      field: "Actions",
      render: (rowData) => (
        <>
          <span style={{ display: "flex", margin: "0px 0px" }}>
            <span className="cursor-pointer">
              <VisibilityIcon
                className="me-3"
                style={{
                  color: "gray",
                  fontSize: "18px",
                }}
                //   onClick={(e) =>
                //     handleUpdateStatusOpen(
                //       e,
                //       rowData.id,
                //       rowData.jobOpeningStatus,
                //       rowData.jobTitle,
                //       rowData.jobDescription,
                //       rowData.updatedAt
                //     )
                //   }
              />
            </span>
            <Tooltip title="Click to set it HotJob" placement="bottom">
              <span className="cursor-pointer">
                <WhatshotIcon
                  style={{
                    color: `${rowData.isHots ? "#ff4802" : "grey"}`,
                    fontSize: "20px",
                  }}
                  // onClick={(e) =>
                  //   handleHotJobClick(e, rowData.id, !rowData.isHots)
                  // }
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
      title: "Job Title",
      field: "jobTitle",
      render: (rowData) => (
        <>
          <span className="fw-bold ">{rowData.jobTitle}</span>
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
      render: (rowData) => <span>{rowData.clientName}</span>,
      field: "clientName",
      initialEditValue: "initial edit value",
    },

    ...JobColDefs,
  ]);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleClose = () => {
    setSelectedJobRow([]);
    setOpen(false);
    closeDialog(false);
    dispatch(deSelectJobsGrid(true));
  };

  const handleAssociateJob = () => {
    const jobIds = [];
    selectedJobRow?.forEach((job) => jobIds.push(job.id));
    const payload = {
      jobIds,
      candidateIds: [candidateSelectedRow?.id],
      status: candidateStatus,
    };
    dispatch(associateCandidate(payload)).then(() => {
      history.push("/candidates");
    });
    setAssociateJobDialog(false);
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Job
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="candidate" style={{ padding: 30 }}>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            {!selectedJobRow.length ? (
              "Select the job from the list"
            ) : selectedJobRow.length === 1 ? (
              <Button
                variant="contained"
                align="right"
                size="small"
                color="primary"
                disabled={!selectedJobRow.length}
                onClick={() => setAssociateJobDialog(true)}
              >
                JOB ASSOCIATE NOW
              </Button>
            ) : (
              "Select any ONE of the Job"
            )}
          </div>
          <MaterialTable
            style={{ border: "1px solid #80808080" }}
            title=""
            columns={columns}
            onSelectionChange={(row) => setSelectedJobRow(row)}
            data={jobs}
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
        open={associateJobDialog}
        onClose={() => setAssociateJobDialog(false)}
        aria-labelledby="form-dialog-title"
        // style={{ width: 500 }}
      >
        <DialogTitle id="form-dialog-title">
          Associate Job for{" "}
          {candidateSelectedRow?.firstName +
            " " +
            candidateSelectedRow?.lastName}
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
            value={candidateComments}
            onChange={(e) => setCandidateComments(e.target.value)}
            name="candidateComments"
            placeholder="Enter notes here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssociateJobDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            align="right"
            size="small"
            color="primary"
            onClick={handleAssociateJob}
          >
            Associate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

function mapStateToProps(state) {
  const { jobs } = state.job;
  return {
    jobs,
  };
}

export default connect(mapStateToProps)(AssociateJob);
