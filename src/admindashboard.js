/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Notification from "./notification.png";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DomainIcon from "@material-ui/icons/Domain";
import { Tooltip as MTooltip } from "@material-ui/core";
import Notifications from "react-notifications-menu";
//calcii
import Calcii from "./Calculator";
import {
  Divider,
  Grow,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { connect } from "react-redux";
import "./admindashboard.css";
import AddIcon from "@material-ui/icons/Add";
import { Calculator, PersonCircle } from "react-bootstrap-icons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { NavLink } from "react-bootstrap";
import {
  AccessTime,
  Assessment,
  AssignmentTurnedIn,
  Close,
  EmojiPeople,
  Group,
  LibraryBooks,
  Notifications as NotificationsIcon,
  PermContactCalendar,
  PersonAdd,
  Search,
  Settings,
  Today,
} from "@material-ui/icons";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Redirect, useLocation } from "react-router";
import { logout } from "./actions/auth";
import moment from "moment";
import avatar from "./avatar.png";
import { Work } from "@material-ui/icons";
import { getJobs } from "./actions/job";
import { getCandidates } from "./actions/candidate";
import { getClients } from "./actions/client";
import { getVendors } from "./actions/vendor";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";

//calendar dropdown
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { withStyles } from "@material-ui/styles";
import { getActivity, getNotification } from "./actions/log.js";
const CustomButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "0",
    lineHeight: 1.5,
    backgroundColor: "white",
    borderColor: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    whiteSpace: "nowrap",

    "&:hover": {
      backgroundColor: "white",
      borderColor: "white",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "white",
      borderColor: "white",
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
})(Button);
const BootstrapInput = withStyles((theme) => ({
  // root: {
  //   "label + &": {
  //     marginTop: theme.spacing(3),
  //   },
  // },
  input: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: "relative",
    backgroundColor: "white",
    border: "0",
    fontSize: 16,
    width: "auto",
    padding: "11px 12px",
    "&:focus": {
      boxShadow: "none",
      borderColor: "none",
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    left: "-92px",
    zIndex: 100,
    border: "1px solid",
    padding: theme.spacing(1),
    width: "300px",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Admindashboard(props) {
  const {
    user: currentUser,
    dispatch,
    jobs,
    candidates,
    clients,
    vendors,
    activity,
    notification,
  } = props;

  //calendar
  const [value, onChange] = React.useState(new Date());
  const [open1, setOpen1] = React.useState(false);
  const handleClick = () => {
    setOpen1((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen1(false);
  };

  //notification
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const anchoropen = Boolean(anchorEl);

  //calculator
  const [anchorElCalci, setAnchorElCalci] = React.useState(null);

  const handleClickCalci = (event) => {
    setAnchorElCalci(event.currentTarget);
  };

  const handleCloseCalci = () => {
    setAnchorElCalci(null);
  };

  const openCalci = Boolean(anchorElCalci);
  const id = openCalci ? "simple-popover" : undefined;

  const [stats, setStats] = useState({
    screening: 0,
    activeJobs: 0,
    clientReview: 0,
    interview: 0,
    onHold: 0,
    offered: 0,
    placements: 0,
  });

  const [count, setCount] = useState({
    job: 0,
    candidate: 0,
    vendor: 0,
    client: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = [
    { name: "Jobs", value: count.job },
    { name: "Candidates", value: count.candidate },
    { name: "Clients", value: count.client },
    { name: "Vendors", value: count.vendor },
  ];

  const barChartData = [
    {
      name: "Screening",
      count: stats.screening,
    },
    {
      name: "Client Review",
      count: stats.clientReview,
    },
    {
      name: "Interviewing",
      count: stats.interview,
    },
    {
      name: "On-Hold",
      count: stats.onHold,
    },
    {
      name: "Offered",
      count: stats.offered,
    },
    {
      name: "Hired",
      count: stats.placements,
    },
  ];

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getCandidates(1, 50000));
    dispatch(getClients());
    dispatch(getVendors());
    dispatch(getActivity());
    dispatch(getNotification());
  }, []);

  // useEffect(() => {
  //   if (notification.length) {
  //     const notificationResponse = [];
  //     notification.forEach((item) => {
  //       notificationResponse.push({
  //         image:
  //           "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  //         message: item.message,
  //         receivedTime: moment(item?.createdAt).format(
  //           "MMM DD, YYYY - hh:mm A"
  //         ),
  //         detailPage: "",
  //       });
  //     });
  //     setNotifications(notificationResponse);
  //   }
  // }, [notification]);
  useEffect(() => {
    if (jobs.length) {
      let activeJobs = 0;
      jobs.forEach((job) => {
        if (job.jobOpeningStatus === "Active") {
          activeJobs++;
        }
      });
      setStats({
        ...stats,
        activeJobs,
      });
      setCount({
        ...count,
        job: jobs.length,
      });
    }
  }, [jobs]);

  useEffect(() => {
    if (candidates.rows?.length) {
      let clientReview = 0;
      let interview = 0;
      let placements = 0;
      let screening = 0;
      let onHold = 0;
      let offered = 0;
      candidates.rows.forEach((candidate) => {
        if (candidate.jobCandidateMappings[0]?.status === "Client Review") {
          clientReview++;
        }
        if (candidate.jobCandidateMappings[0]?.status === "Interviewing") {
          interview++;
        }
        if (candidate.jobCandidateMappings[0]?.status === "Hired") {
          placements++;
        }
        if (candidate.jobCandidateMappings[0]?.status === "Screening") {
          screening++;
        }
        if (candidate.jobCandidateMappings[0]?.status === "On-Hold") {
          onHold++;
        }
        if (candidate.jobCandidateMappings[0]?.status === "Offered") {
          offered++;
        }
      });
      setStats({
        ...stats,
        clientReview,
        interview,
        placements,
        screening,
        onHold,
        offered,
      });
      setCount({
        ...count,
        candidate: candidates.rows.length,
      });
    }
  }, [candidates]);

  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (clients.length) {
      setCount({
        ...count,
        client: clients.length,
      });
    }
  }, [clients]);

  useEffect(() => {
    if (vendors.length) {
      setCount({
        ...count,
        vendor: vendors.length,
      });
    }
  }, [vendors]);

  const options = [
    "All Modules",
    "Job Openings",
    "Candidates",
    "Clients",
    "Vendors",
  ];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      {!currentUser ? (
        <Redirect to="/login" />
      ) : (
        <div className="App">
          <div>
            <header className="header">
              <div className="p-4 pt-3 px-3">
                <div className="container-fluid">
                  <div className="row align-items-center ">
                    <div
                      className="col-lg-6 col-md-3 col-sm-3 col-6"
                      style={{ marginTop: "-18px" }}
                    >
                      <div
                        className="logo my-0 my-sm-0"
                        style={{ height: "35px" }}
                      >
                        <span
                          className="text-white fw-bold "
                          style={{
                            fontSize: "33px",
                            marginLeft: "11px",
                          }}
                        >
                          REZUMR
                        </span>
                        <div
                          style={{
                            color: "white",
                            fontWeight: "500",
                            marginTop: "-12px",
                            marginLeft: "13px",
                            fontSize: "13px",
                          }}
                        >
                          <span>A </span>{" "}
                          <span style={{ marginLeft: "1px" }}>
                            GLOBAL DATABASE
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-9 col-sm-9 col-6 ">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="  d-flex flex-row align-items-center justify-content-end">
                              <div className="top-nav-search  d-none d-lg-block">
                                {/* {!showResults && (
                                  <Button
                                    onClick={() => setShowResults(true)}
                                    style={{
                                      marginRight: "-25px",
                                      marginTop: "2px",
                                    }}
                                  >
                                    <Search
                                      style={{
                                        fontSize: "28px",
                                        color: "white",
                                      }}
                                    ></Search>
                                  </Button>
                                )} */}
                                {showResults && (
                                  <form className="d-flex">
                                    <ButtonGroup
                                      variant="contained"
                                      ref={anchorRef}
                                      aria-label="outlined button group"
                                      className="p-0"
                                      style={{ boxShadow: "none" }}
                                    >
                                      <CustomButton
                                        aria-controls="split-button-menu"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                        endIcon={<ArrowDropDownIcon />}
                                      >
                                        {options[selectedIndex]}
                                      </CustomButton>

                                      <BootstrapInput
                                        defaultValue=""
                                        id="bootstrap-input"
                                      />
                                    </ButtonGroup>
                                    <a href="/">
                                      <Close
                                        style={{
                                          color: "white",
                                          fontSize: "30px",
                                          marginLeft: "6px",
                                          marginTop: "5px",
                                        }}
                                      />{" "}
                                    </a>
                                    <Popper
                                      style={{ zIndex: "9999" }}
                                      open={open}
                                      anchorEl={anchorRef.current}
                                      role={undefined}
                                      transition
                                      disablePortal
                                      placement="bottom-start"
                                    >
                                      {({ TransitionProps, placement }) => (
                                        <Grow
                                          {...TransitionProps}
                                          style={{
                                            transformOrigin:
                                              placement === "bottom "
                                                ? "center top"
                                                : "center bottom",
                                          }}
                                        >
                                          <Paper>
                                            <ClickAwayListener
                                              onClickAway={handleClose}
                                            >
                                              <MenuList id="split-button-menu">
                                                {options.map(
                                                  (option, index) => (
                                                    <MenuItem
                                                      key={option}
                                                      selected={
                                                        index === selectedIndex
                                                      }
                                                      onClick={(event) =>
                                                        handleMenuItemClick(
                                                          event,
                                                          index
                                                        )
                                                      }
                                                    >
                                                      {option}
                                                    </MenuItem>
                                                  )
                                                )}
                                              </MenuList>
                                            </ClickAwayListener>
                                          </Paper>
                                        </Grow>
                                      )}
                                    </Popper>
                                  </form>
                                )}
                              </div>
                              <div className="ms-2 me-0  d-none d-lg-block notifications">
                                <span>
                                  {/* <NavLink href="#" className="text-white">
                                    <Notifications
                                      data={notifications}
                                      header={{
                                        title: "Notifications",
                                        option: {
                                          text: "",
                                          onClick: () => console.log("Clicked"),
                                        },
                                      }}
                                      markAsRead={(data) => {
                                        console.log(data);
                                      }}
                                      icon={Notification}
                                      // notificationCard={<Sample />}
                                      // icon={DEFAULT_NOTIFICATION.image}
                                    />
                                  </NavLink> */}

                                  <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                      paper: classes.paper,
                                    }}
                                    open={anchoropen}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "right",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "right",
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography>
                                      You are Using ATS New Version.
                                    </Typography>
                                    <Divider />
                                    <Typography>
                                      Notification is shown on popover.
                                    </Typography>
                                    <Divider />
                                    <Typography>
                                      We can later add look and feel.
                                    </Typography>
                                  </Popover>
                                </span>
                              </div>
                              <div className=" ms-3 me-3  d-none d-lg-block ">
                                <span>
                                  <ClickAwayListener
                                    onClickAway={handleClickAway}
                                  >
                                    <div className={classes.root}>
                                      <div type="button" onClick={handleClick}>
                                        <span>
                                          <MTooltip
                                            title="Calendar"
                                            placement="bottom"
                                          >
                                            <Today
                                              style={{
                                                color: "white",
                                                fontSize: "26px",
                                                marginTop: "5px",
                                              }}
                                            />
                                          </MTooltip>
                                        </span>
                                      </div>
                                      {open1 ? (
                                        <div className={classes.dropdown}>
                                          <div>
                                            <Calendar
                                              onChange={onChange}
                                              value={value}
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </ClickAwayListener>
                                </span>
                              </div>
                              <div className=" me-2 d-none d-lg-block">
                                <NavLink href="#" className="text-white">
                                  <MTooltip
                                    title="Calculator"
                                    placement="bottom"
                                  >
                                    <Calculator
                                      onClick={handleClickCalci}
                                      className="icon "
                                      style={{
                                        fontSize: "24px",
                                        color: "white",
                                      }}
                                    />
                                  </MTooltip>
                                </NavLink>
                                <Popover
                                  id={id}
                                  open={openCalci}
                                  anchorEl={anchorElCalci}
                                  onClose={handleCloseCalci}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <div>
                                    <Calcii />
                                  </div>
                                </Popover>
                              </div>

                              <div className=" me-4  d-none d-lg-block">
                                <Dropdown className="dashAddSign" align="left">
                                  <Dropdown.Toggle
                                    variant="Light"
                                    id="dropdown-basic"
                                    style={{ color: "white" }}
                                    className="p-0"
                                  >
                                    <MTooltip title="Add" placement="bottom">
                                      <AddIcon
                                        style={{
                                          fontSize: "24px",
                                          color: "white",
                                        }}
                                      />
                                    </MTooltip>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item href="/createjob">
                                      Add Job
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/addcandidate">
                                      Add Candidate
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/createvendor">
                                      Add Vendor
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/createclient">
                                      Add Client
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                              <div className=" ">
                                <Dropdown
                                  className="dashProfileDrop"
                                  style={{ marginRight: "6px" }}
                                >
                                  <Dropdown.Toggle
                                    variant="Light"
                                    id="dropdown-basic"
                                    style={{ color: "white" }}
                                    className="p-0"
                                  >
                                    {" "}
                                    <MTooltip
                                      title="Profile"
                                      placement="bottom"
                                    >
                                      <PersonCircle
                                        style={{
                                          fontSize: "24px",
                                          color: "white",
                                        }}
                                      />
                                    </MTooltip>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item href="/profilepage">
                                      My Profile
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#/action-2">
                                      Support{" "}
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/setting">
                                      Setting
                                    </Dropdown.Item>
                                    <NavDropdown.Divider />
                                    <Dropdown.Item
                                      onClick={() => dispatch(logout())}
                                    >
                                      Log Out!
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="page-wrapper px-md-3 px-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-12 col-12">
                    <aside className="sidebar">
                      <div className="row">
                        <div className="col-12 ">
                          <div className="card rounded-10 bg-white shadow-sm border mt-2 p-0  ">
                            <div className="card-body ">
                              <div className="row">
                                <div className="col-md-12 me-auto text-left">
                                  <ol className="breadcrumb  d-inline-block p-0 m-0 mb-2">
                                    <li className="breadcrumb-item d-inline-block">
                                      <a className="text-dark" href="/">
                                        Home
                                      </a>
                                    </li>
                                    <li className="breadcrumb-item d-inline-block active">
                                      Dashboard
                                    </li>
                                  </ol>
                                  <h4
                                    className="text-dark fw-bold"
                                    style={{ fontSize: "18px" }}
                                  >
                                    Admin Dashboard
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="card rounded-10 bg-white shadow-sm border mt-1 p-0  ">
                            <div className="card-body ">
                              <div className="row">
                                <div className="col-md-12 me-auto text-center">
                                  <div>
                                    <img
                                      src={avatar}
                                      className="rounded-circle mb-2"
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                      }}
                                      alt="logo"
                                    />
                                    <h5>
                                      <span className="fw-bold">Welcome </span>
                                      <span className="fw-bold">
                                        {currentUser.firstName}{" "}
                                      </span>
                                      <span className="fw-bold">
                                        {currentUser.lastName}
                                      </span>
                                    </h5>
                                    <span className="">
                                      {moment().format("dddd, Do MMM YYYY")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="card rounded-10 bg-white shadow-sm border mt-1 p-0  ">
                            <div className="card-body ">
                              <div className="row">
                                <div className="col-md-12 me-auto text-center ">
                                  <div className="row g-0 border rounded-10 ">
                                    <div className="col-6 align-items-center text-center border-end border-bottom p-4 menu-hover ">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/jobopening"
                                      >
                                        <Work
                                          className="text-center "
                                          style={{
                                            color: "rgb(40, 208, 242)",
                                            fontSize: " 37px",
                                          }}
                                        />
                                        <span
                                          className="text-nowrap"
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Job Opening
                                        </span>
                                      </a>
                                    </div>
                                    <div className="col-6 align-items-center text-center menu-hover p-4    border-bottom">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/candidates"
                                      >
                                        <Group
                                          style={{
                                            color: "rgb(255, 128, 66)",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Candidates
                                        </span>
                                      </a>
                                    </div>

                                    <div className="col-6 align-items-center text-center menu-hover p-4 border-end border-bottom  border-bottom">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/clients"
                                      >
                                        <DomainIcon
                                          style={{
                                            color: "#0088fe",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Clients
                                        </span>
                                      </a>
                                    </div>

                                    <div className="col-6 align-items-center text-center menu-hover p-4   border-bottom">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/vendors"
                                      >
                                        <EmojiPeople
                                          style={{
                                            color: "#852185",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Vendors
                                        </span>
                                      </a>
                                    </div>
                                    <div className="col-6 align-items-center text-center menu-hover p-4 border-end   border-bottom">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/calendar"
                                      >
                                        <PermContactCalendar
                                          style={{
                                            color: "#cbc504",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Calendar
                                        </span>
                                      </a>
                                    </div>
                                    <div className="col-6 align-items-center text-center menu-hover p-4  border-bottom ">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark "
                                        href="/reports"
                                      >
                                        <Assessment
                                          style={{
                                            color: "#36a929",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Reports
                                        </span>
                                      </a>
                                    </div>

                                    <div className="col-6 align-items-center text-center menu-hover p-4  border-end ">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/setting"
                                      >
                                        <Settings
                                          style={{
                                            color: "black",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Settings
                                        </span>
                                      </a>
                                    </div>
                                    <div className="col-6 align-items-center text-center menu-hover p-4 ">
                                      <a
                                        className="active d-flex flex-column align-items-center justify-content-center text-dark"
                                        href="/profilepage"
                                      >
                                        <PersonAdd
                                          style={{
                                            color: "#a93512",
                                            fontSize: "37px",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: " 15px",
                                          }}
                                        >
                                          Profile
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                    <div className="row g-0 col-12">
                      <div className="card rounded-10 bg-white shadow-sm border mt-2 p-0  ">
                        <div className="card-body ">
                          <div className="row">
                            <div className="col-md-12 me-auto text-center">
                              <div className="row g-0  ">
                                <ul className="list-group list-group-horizontal-lg ">
                                  <a
                                    style={{
                                      border: "1px solid black",
                                      borderRight: "0px",
                                    }}
                                    aria-current="page"
                                    className="list-group-item button-5 active "
                                    href="/"
                                  >
                                    Admin Dashboard
                                  </a>
                                  <a
                                    style={{ border: "1px solid black" }}
                                    className="list-group-item button-6 "
                                    href="/"
                                  >
                                    Employees Dashboard
                                  </a>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row g-0 col-12 justify-content-between">
                      <div className="col-12 col-md-6 col-lg-3 pe-4 ">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body 
                          "
                          >
                            <div className="row g-0 d-flex flex-row justify-content-center">
                              <div className="col-3  d-flex align-items-center justify-content-center rounded-10 text-center bg-info bg-gradient ">
                                <Work className="text-white" />
                              </div>
                              <div className="  col-9  ">
                                <div className="ms-2 d-flex flex-column">
                                  <div className="card-text fs-5  fw-bold">
                                    {stats.activeJobs}
                                  </div>
                                  <div
                                    className=" fw-normal "
                                    style={{ fontSize: "15px" }}
                                  >
                                    Active Jobs
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 pe-4">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body 
                          "
                          >
                            <div className="row g-0 d-flex flex-row justify-content-center">
                              <div className="col-3 d-flex align-items-center justify-content-center rounded-10 text-center bg-warning bg-gradient  ">
                                <LibraryBooks className="text-white" />
                              </div>
                              <div className=" col-9  ">
                                <div className="ms-2 d-flex flex-column">
                                  <div className="card-text  fs-5  fw-bold">
                                    {stats.clientReview}
                                  </div>
                                  <div
                                    className="fw-normal"
                                    style={{ fontSize: "15px" }}
                                  >
                                    Client Review
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 pe-4">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body 
                          "
                          >
                            <div className="row g-0 d-flex flex-row justify-content-center">
                              <div className="col-3 d-flex align-items-center justify-content-center rounded-10 text-center  bg-primary bg-gradient ">
                                <Assessment className="text-white" />
                              </div>
                              <div className=" col-9  ">
                                <div className="ms-2 d-flex flex-column">
                                  <div className="card-text  fs-5   fw-bold">
                                    {stats.interview}
                                  </div>
                                  <div
                                    className=" fw-normal"
                                    style={{ fontSize: "15px" }}
                                  >
                                    Interviews
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 pe-4">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body 
                          "
                          >
                            <div className="row g-0 d-flex flex-row justify-content-center">
                              <div className="col-3 d-flex align-items-center justify-content-center rounded-10 text-center bg-success bg-gradient ">
                                <AssignmentTurnedIn className="text-white" />
                              </div>
                              <div className=" col-9  ">
                                <div className=" ms-2 d-flex flex-column">
                                  <div className="card-text  fs-5  fw-bold">
                                    {stats.placements}
                                  </div>
                                  <div
                                    className=" fw-normal"
                                    style={{ fontSize: "15px" }}
                                  >
                                    Placements
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row g-0 col-12 justify-content-between">
                      <div className="col-12 col-lg-6 pe-4">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body fw-normal px-0 
                          "
                          >
                            <h4
                              className="border-bottom px-4 pb-2 fw-bold"
                              style={{ fontSize: "18px" }}
                            >
                              Total Count
                            </h4>
                            <div className="d-flex justify-content-center pt-2">
                              <PieChart width={300} height={300}>
                                <Pie
                                  dataKey="value"
                                  isAnimationActive={true}
                                  data={data}
                                  outerRadius={150}
                                  fill="#8884d8"
                                >
                                  {data.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 pe-4">
                        <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                          <div
                            className="card-body fw-normal px-0
                          "
                          >
                            <h4
                              className="border-bottom px-4 pb-2 fw-bold "
                              style={{ fontSize: "18px" }}
                            >
                              Total Candidates Status
                            </h4>
                            <div className="d-flex justify-content-center pt-1">
                              <BarChart
                                width={400}
                                height={300}
                                data={barChartData}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <XAxis
                                  dataKey="name"
                                  interval={0}
                                  angle="0"
                                  sclaeToFit="true"
                                />
                                <YAxis
                                  type="number"
                                  domain={[0, count.candidate]}
                                />
                                <Tooltip />
                                <Bar dataKey="count" fill="#82ca9d" />
                              </BarChart>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-12 pe-4">
                      <div className=" card  rounded-10 bg-white shadow-sm border p-0 mt-2 ">
                        <div
                          className="fw-normal px-0
                          "
                        >
                          <h4
                            className=" px-4  pt-3 fw-bold"
                            style={{ fontSize: "18px" }}
                          >
                            Activities
                          </h4>
                          <div
                            className="card border-top border-0 bg-white shadow-sm border m-0 "
                            style={{ maxHeight: 225, overflowY: "auto" }}
                          >
                            {activity &&
                              activity.map((item) => {
                                return (
                                  <div className="d-flex p-1 ">
                                    <div
                                      className="ps-2 pe-4 "
                                      style={{
                                        color: "rgb(19 60 153)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {moment(item?.createdAt).format(
                                        "MMM DD, YYYY - hh:mm A"
                                      )}
                                      {/* moment Nov 5, 2021 - 10:30 AM */}
                                    </div>
                                    <div
                                      className="ps-5"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {item.message}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { candidates } = state.candidate;
  const { jobs } = state.job;
  const { clients } = state.client;
  const { vendors } = state.vendor;
  const { activity, notification } = state.log;
  return {
    user,
    jobs,
    candidates,
    clients,
    vendors,
    activity,
    notification,
  };
}

export default connect(mapStateToProps)(Admindashboard);
