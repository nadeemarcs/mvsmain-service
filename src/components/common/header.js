/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import logo from "../../rezumr.png";
import Notification from "../../notification.png";
import "./common.css";
import Calcii from "../../Calculator";
import {
  Nav,
  NavDropdown,
  Navbar,
  Dropdown,
  NavLink,
  DropdownButton,
} from "react-bootstrap";
import {
  PersonCircle,
  Gear,
  BellFill,
  CalendarDate,
  Calculator,
} from "react-bootstrap-icons";
import {
  searchCandidate,
  autoSearchCandidate,
  setSearchResponse,
} from "../../actions/candidate";
import { logout } from "../../actions/auth";
import { connect, useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";

//calendar dropdown
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//popover notification
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Grow,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { Add, Close, Person, Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { hideLoader, showLoader } from "../../actions/pageloader";
import Notifications from "react-notifications-menu";
import { getNotification } from "../../actions/log";
import moment from "moment";

import { throttle, debounce } from "throttle-debounce";

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
    top: 35,
    right: 0,
    left: "-74px",
    zIndex: 100,
    border: "1px solid",
    padding: theme.spacing(1),
    width: "300px",
    backgroundColor: theme.palette.background.paper,
  },
}));

function App(props) {
  //search
  const [search, setSearch] = useState("");

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { notification } = props;

  const [notifications, setNotifications] = useState([]);
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   if (notification?.length) {
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

  const open = Boolean(anchorEl);

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

  //calendar
  const [value, onChange] = React.useState(new Date());
  const [open1, setOpen] = React.useState(false);
  const [autoSearchItems, setAutoSearchItems] = React.useState([]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleSearchText = (search) => {
    dispatch(searchCandidate(search));
    dispatch(setSearchResponse());

    console.log("enter");
  };
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();

  const autoSearchDebounce = debounce(1000, (value) => {
    autoSearchApi(value);
  });

  const handleSearchOnType = (e) => {
    const { value } = e.target;
    autoSearchDebounce(value);
    setSuggestionOpen(true);
    setSearch(value);
  };

  const autoSearchApi = (value) => {
    if (!value.trim()) {
      setAutoSearchItems([]);
      return;
    }
    if (value && value.length > 2) {
      // api invoking
      dispatch(
        autoSearchCandidate(value, (res) => {
          console.log(res.candidates.rows);
          if (
            res &&
            res.candidates &&
            res.candidates.rows &&
            res.candidates.rows.length > 0
          ) {
            setAutoSearchItems(res.candidates.rows);
          } else if (
            res &&
            res.candidates &&
            res.candidates.rows &&
            res.candidates.rows.length === 0
          ) {
            setAutoSearchItems([]);
          }
        })
      );
    }
  };
  //for future reference- Nitish
  // useEffect(() => {
  //   dispatch(getNotification());
  // }, []);

  // useEffect(() => {
  //   if (search.length > 2) {
  //       dispatch(showLoader());
  //       dispatch(searchCandidate(search)).then(res => {
  //         dispatch(hideLoader());
  //       }).catch(err => {
  //         dispatch(hideLoader());
  //       })
  //     }
  // }, [search])

  const options = [
    "All Modules",
    "Job Openings",
    "Candidates",
    "Clients",
    "Vendors",
  ];
  const [openSearch, setOpenSearch] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  useEffect(() => {
    if (
      location.pathname === "/jobopening" ||
      location.pathname === "/Jobopening"
    ) {
      return setSelectedIndex(1);
    }
    if (
      location.pathname === "/candidates" ||
      location.pathname === "/Candidates"
    ) {
      return setSelectedIndex(2);
    }
    if (location.pathname === "/clients" || location.pathname === "/Clients") {
      return setSelectedIndex(3);
    }
    if (location.pathname === "/vendors" || location.pathname === "/Vendors") {
      return setSelectedIndex(4);
    }
  }, [location.pathname]);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenSearch(false);
  };

  const handleToggle = () => {
    setOpenSearch((prev) => !prev);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSearch(false);
  };
  if (location.pathname.includes("/", 2)) {
    location.pathname = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/")
    );
  }

  if (
    location.pathname !== "/" &&
    location.pathname !== "/admindashboard" &&
    location.pathname !== "/login"
  ) {
    return (
      <>
        <Navbar style={{ backgroundColor: "#5e729f " }} expand="lg">
          <div className=" d-flex align-items-center justify-content-between  flex-wrap w-100 px-md-4 pe-2">
            {searchExpanded === false ? (
              <>
                <Navbar.Brand className="me-0 me-md-2">
                  <NavLink
                    href="/admindashboard"
                    className="anchor-arrange me-md-2 ps-md-0"
                  >
                    <img
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="logo"
                      to="https://fssglobal.in"
                    />
                  </NavLink>
                </Navbar.Brand>
                <div className=" d-flex order-lg-1 ">
                  <div className="text-white p-2 cursor-pointer">
                    {(location.pathname === "/candidates" ||
                      location.pathname === "/Candidates") && (
                      <SearchIcon onClick={() => setSearchExpanded(true)} />
                    )}
                  </div>

                  <Typography
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                  >
                    {/* <NavLink href="#" className="text-white notifications">
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
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography>You are Using ATS New Version.</Typography>
                    <Divider />
                    <Typography>Notification is shown on popover.</Typography>
                    <Divider />
                    <Typography>We can later add look and feel.</Typography>
                  </Popover>

                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Tooltip title="Calendar" placement="bottom">
                      <div className={classes.root}>
                        <div type="button" onClick={handleClick}>
                          <NavLink>
                            <CalendarDate
                              style={{ color: "white", fontSize: "20px" }}
                              className="icon"
                            />
                          </NavLink>
                        </div>
                        {open1 ? (
                          <div className={classes.dropdown}>
                            <div>
                              <Calendar onChange={onChange} value={value} />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </Tooltip>
                  </ClickAwayListener>

                  {/* <Dropdown>
                <DropdownButton
                  align="end"
                  id="dropdown-basic"
                  style={{ color: "white", padding: "8px 16px" }}
                  className="px-0 m-0 border-0"
                >
                 
                  <Dropdown.Menu>
                  
                  </Dropdown.Menu>
                </DropdownButton>
              </Dropdown> */}
                  <Tooltip title="Calculator" placement="bottom">
                    <div className=" me-0 d-none d-lg-block">
                      <NavLink href="#" className="text-white">
                        <Calculator
                          onClick={handleClickCalci}
                          className="icon "
                          style={{
                            color: "white",
                            fontSize: "24px",
                            paddingLeft: "0px",
                          }}
                        />
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
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom">
                    <DropdownButton
                      className="addSign"
                      align="left"
                      title={
                        <Add
                          style={{
                            color: "white",
                            fontSize: "25px",
                            color: "white",
                            marginLeft: "-5px",
                          }}
                        />
                      }
                      id="dropdown-menu-align-left"
                      variant="transparent"
                    >
                      <Dropdown.Item href="/createjob">Add Job</Dropdown.Item>
                      <Dropdown.Item href="/addcandidate">
                        Add Candidate
                      </Dropdown.Item>
                      <Dropdown.Item href="/createvendor">
                        Add Vendor
                      </Dropdown.Item>
                      <Dropdown.Item href="/createclient">
                        Add Client
                      </Dropdown.Item>
                    </DropdownButton>
                  </Tooltip>
                  <Tooltip title="Profile" placement="bottom">
                    <DropdownButton
                      className="profileDrop"
                      align="left"
                      title={
                        <PersonCircle
                          style={{
                            color: "white",
                            fontSize: "22px",
                          }}
                        />
                      }
                      id="dropdown-menu-align-left"
                      variant="transparent"
                    >
                      <Dropdown.Item href="/profilepage">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Support </Dropdown.Item>
                      <Dropdown.Item href="/setting">Setting</Dropdown.Item>
                      <NavDropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          dispatch(logout());
                          history.push("/login");
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </DropdownButton>
                  </Tooltip>
                </div>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="text-white"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav variant="pills" activeKey={location.pathname}>
                    <div className=" d-flex flex-column flex-lg-row order-lg-0">
                      <Nav.Link
                        href="/"
                        className="me-2 "
                        style={{ color: "white" }}
                      >
                        Home
                      </Nav.Link>

                      <Nav.Link
                        href="/jobopening"
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        Job Opening
                      </Nav.Link>

                      <Nav.Link
                        href="/candidates"
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        Candidates
                      </Nav.Link>
                      <Nav.Link
                        href="/clients"
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        Clients
                      </Nav.Link>
                      <Nav.Link
                        href="/vendors"
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        Vendors
                      </Nav.Link>
                      <Nav.Link
                        href="/reports"
                        className="me-2"
                        style={{ color: "white" }}
                      >
                        Reports
                      </Nav.Link>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <div className="d-flex flex-row w-100 justify-content-center align-items-center">
                  <div className="d-flex ">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setAutoSearchItems();
                        handleSearchText(search);
                      }}
                    >
                      <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="outlined button group"
                        className="p-0"
                        style={{ boxShadow: "none" }}
                      >
                        <CustomButton
                          aria-controls="split-button-menu"
                          aria-expanded="true"
                          aria-haspopup="menu"
                          onClick={handleToggle}
                          endIcon={<ArrowDropDownIcon />}
                          style={{
                            width: "170px",
                            height: "37px",
                            marginTop: "2px",
                          }}
                        >
                          {options[selectedIndex]}
                        </CustomButton>

                        <BootstrapInput
                          style={{ border: "0px " }}
                          value={search}
                          id="bootstrap-input"
                          onChange={handleSearchOnType}
                          autoComplete="off"
                          onBlur={() => {
                            setSuggestionOpen(false);
                            console.log("hii there i am here");
                          }}
                          // onBlur={handleToggle}
                        />

                        {/* {search === "" ? (
                        ""
                      ) : (
                        <Button
                          style={{
                            marginLeft: "-36px",
                            marginTop: "2px",
                            height: "37px",
                          }}
                          onClick={handleSearchText}
                        >
                          <Search />
                        </Button>
                      )} */}
                      </ButtonGroup>
                    </form>
                    {search === "" ? (
                      ""
                    ) : (
                      <Button
                        style={{
                          marginLeft: "-50px",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSearch("");
                          setAutoSearchItems([]);
                        }}
                      >
                        <Close style={{ fontSize: "20px" }} />
                      </Button>
                    )}
                    <div className="text-white p-2 cursor-pointer">
                      <a href="/candidates">
                        <Close style={{ color: "white" }} />
                      </a>
                    </div>

                    {autoSearchItems && autoSearchItems.length > 0 && (
                      <div
                        className="auto-search-box border rounded-3 border px-3 pb-3"
                        hidden={!suggestionOpen}
                        style={{
                          position: "absolute",
                          top: "3rem",
                          zIndex: 9999,
                          backgroundColor: " #fff",
                          width: "50%",

                          maxHeight: "70vh",
                          overflow: "auto",
                        }}
                      >
                        {autoSearchItems &&
                          autoSearchItems.map((searchItem) => {
                            return (
                              <div
                                className=""
                                style={{
                                  borderBottom: "1px solid #ccc",
                                  paddingBottom: "5px",
                                  paddingTop: "5px",
                                }}
                              >
                                <Link
                                  // style={{ color: "#0e2c66" }}
                                  to={{
                                    pathname: "/candidateview",
                                    state: { data: searchItem },
                                  }}
                                >
                                  <div
                                    className=" d-flex flex-row"
                                    onClick={() => {
                                      setSearchExpanded(false);
                                    }}
                                  >
                                    <div>
                                      <Person
                                        className="border rounded-3"
                                        style={{
                                          color: "#5e729f",
                                          height: "39px",
                                          width: "31px",
                                          background: " #80808017",
                                        }}
                                      />
                                    </div>

                                    <div
                                      className="ps-2"
                                      style={{ fontSize: "15px" }}
                                    >
                                      <span
                                        className="fw-bold text-muted"
                                        style={{ fontSize: "14px" }}
                                      >
                                        {searchItem.candidateId}
                                      </span>
                                      <span className="fw-bold text-muted">
                                        {" "}
                                        -{" "}
                                      </span>
                                      <span className="fw-bold">
                                        {searchItem.firstName +
                                          (searchItem.lastName &&
                                            searchItem.lastName)}
                                      </span>
                                      <span className="fw-bold text-muted">
                                        {" "}
                                        -{" "}
                                      </span>
                                      <span className="badge bg-primary text-wrap">
                                        {searchItem.candidateType
                                          ? searchItem.candidateType
                                          : "N/A"}
                                      </span>
                                      <div>
                                        <span
                                          className="fw-bold text-muted"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {searchItem.phoneNumber}
                                        </span>
                                        <span className="fw-bold text-muted">
                                          {" "}
                                          -{" "}
                                        </span>
                                        <span
                                          className="fw-bold text-muted"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {searchItem.email}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  <Popper
                    style={{ zIndex: "9999" }}
                    open={openSearch}
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
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                              {options.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  selected={index === selectedIndex}
                                  onClick={(event) =>
                                    handleMenuItemClick(event, index)
                                  }
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </>
            )}
          </div>
        </Navbar>
      </>
    );
  } else {
    return <> </>;
  }
}

function mapStateToProps(state) {
  const { notification } = state.log;
  return {
    notification,
  };
}

export default connect(mapStateToProps)(App);
