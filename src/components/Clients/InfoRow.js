/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import "./client.css";
import { forwardRef } from "react";
import DeleteDialog from "../common/DeleteDialog";
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect, useDispatch } from "react-redux";
import { rowSelected, updateClient } from "../../actions/client";
import {
  Dropdown,
  FormGroup,
  FormSelect,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { AddBoxOutlined, Close, ExitToApp } from "@material-ui/icons";
import {
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Box,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import Button from "@restart/ui/esm/Button";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUsers } from "../../actions/auth";


function InfoRow(props) {
  const { clients } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState({});
  const { clientSelectedRow, usersList = [] } = props;
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showChangeOwnerModal, setShowChangeOwnerModal] = React.useState(false);
  const [showChangeStatus, setShowChangeStatus] = React.useState(false);
  const [filtering, setFiltering] = React.useState();
  const handleUpdateStatus = () => {
    dispatch(
      updateClient(clientSelectedRow[0].id, { status: clientStatus })
    ).then(() => {
      setShowChangeStatus(false);
      history.push("/clients");
      window.location.reload();
    });
  };
  const [activeTab, setActiveTab] = useState(0);
  const [clientStatus, setClientStatus] = useState("");
  const [accountManager, setAccountManager] = useState({});
  const handleStatus = (e) => {
    e.preventDefault();
    setClientStatus(clientSelectedRow[0].status);
    setShowChangeStatus(true);
  };
  const handleUpdateOwnerClick = () => {
    dispatch(
      updateClient(clientSelectedRow[0].id, {
        accountManager: accountManager?.id,
      })
    ).then(() => {
      setShowChangeOwnerModal(false);
      history.push("/clients");
      window.location.reload();
    });
  };
  useEffect(() => {
    setAccountManager(
      usersList?.filter(
        (item) =>
          item.fullName ===
          clientSelectedRow[0]?.managerFirstName +
            " " +
            clientSelectedRow[0]?.managerLastName
      )[0]
    );
  }, [clientSelectedRow]);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const [openQuickViewModal, setOpenQuickViewModal] = useState({
    id: "",
    name: "",
    accountManager: "",
    managerFirstName:"",
    managerLastName:"",
    PhoneNumber: "",
    email: "",
    type: "",
    website: "",
    status: "",
    source: "",
    city: "",
    fax: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhoneNumber: "",
    zipCode: "",
    country: "",
  });
  const handleQuickViewOpen = (
    e,
    id,
    name,
    accountManager,
    managerFirstName,
    managerLastName,
    PhoneNumber,
    email,
    type,
    website,
    status,
    source,
    city,
    fax,
    contactPersonName,
    contactPersonEmail,
    contactPersonPhoneNumber,
    zipCode,
    country
  ) => {
    e.preventDefault();
    setOpenQuickViewModal({
      id,
      modal: true,
      name,
      accountManager,
      managerFirstName,
      managerLastName,
      PhoneNumber,
      email,
      type,
      website,
      status,
      source,
      city,
      fax,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhoneNumber,
      zipCode,
      country,
    });
  };

  const handleQuickViewClose = () => {
    setOpenQuickViewModal({
      ...openQuickViewModal,
      modal: false,
    });
    setActiveTab(0);
  };
  const handleUpdateClick = () => {
    dispatch(
      updateClient(openQuickViewModal.id, {
        status: openQuickViewModal.status,
      })
    ).then(() => {
      setOpenQuickViewModal({
        ...openQuickViewModal,
      });
      history.push("/clients");
      window.location.reload();
    });
  };
  useEffect(() => {
    dispatch(rowSelected(selectedRow));
  }, [selectedRow]);

  const [columns, ] = useState([
    {
      title: "Actions",
      field: "Actions",
      filtering:false,
      render: (rowData) => (
        <>
        <Tooltip title="Click To View Resume" placement="bottom">
          <span className="cursor-pointer">
            <VisibilityIcon
              style={{
                color: "gray",
                fontSize: "18px",
              }}
              onClick={(e) => {
                handleQuickViewOpen(
                  e,
                  rowData.id,
                  rowData.name,
                  rowData.accountManager,
                  rowData.managerFirstName,
                  rowData.managerLastName,
                  rowData.PhoneNumber,
                  rowData.email,
                  rowData.type,
                  rowData.website,
                  rowData.status,
                  rowData.source,
                  rowData.city,
                  rowData.fax,
                  rowData.contactPersons[0].name,
                  rowData.contactPersons[0].email,
                  rowData.contactPersons[0].phoneNumber,
                  rowData.zipCode,
                  rowData.country
                );
              }}
            />
          </span>
         </Tooltip>
        </>
      ),
      initialEditValue: "initial edit value",
    },

    {
      title: "Client Name",
      render: (rowData) => (
        <>
          <span className="">
            <LinkRouter
              style={{ color: "#0e2c66" }}
              to={{
                pathname: "/clientview",
                state: { data: rowData },
              }}
            >
              {rowData.name}
            </LinkRouter>
          </span>
        </>
      ),
      field: "name",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Client Status",
      field: "status",

      initialEditValue: "initial edit value",
    },
    {
      title: "Contact Number",
      field: "PhoneNumber",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Account Manager",
      field: "accountManager",
      render: (rowData) => (
        <>
          <span>
            {rowData?.managerFirstName} {rowData?.managerLastName}
          </span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.managerFirstName.toLowerCase().indexOf(term.toLowerCase()) > -1,
      
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Industry",
      field: "industry",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Website",
      field: "website",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Created By",
      field: "createdBy",
      render: (rowData) => (
        <>
          <span>
            {rowData?.createdByFirstName} {rowData?.createdByLastName}
          </span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.createdByFirstName.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Modified By",
      field: "modifiedBy",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Created Time",
      field: "createdAt",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Email",
      field: "email",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Modified Time",
      field: "updatedAt",
    },
    {
      title: "City",
      field: "city",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Street",
      field: "street",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "State",
      field: "state",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Country",
      field: "country",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Linkedin",
      field: "Linkedin",
    },
  ]);

  return (
    <>
      <div className="client">
        <MaterialTable
          style={{ border: "1px solid #80808080" }}
          isLoading={props.isClientsLoading}
          title="Clients"
          columns={columns}
          onSelectionChange={(row) => setSelectedRow(row)}
          data={clients}
          icons={{
            Export: forwardRef((props, ref) => (
              <ExitToApp {...props} ref={ref} />
            )),
          }}
          options={{
            exportButton: true,
            selection: true,
            columnsButton: true,
            pageSize: 20,
            pageSizeOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            filtering,
            toolbarButtonAlignment: "left",
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
              tooltip: "Add Client",
              isFreeAction: true,
              onClick: (event) => history.push("/createclient"),
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
                  {clientSelectedRow?.length === 1 ? (
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
                              pathname: "/clientview",
                              state: { data: clientSelectedRow[0] },
                            }}
                          >
                            Edit Client
                          </LinkRouter>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Send email
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => {
                            handleStatus(e);
                          }}
                        >
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
                  ) : (
                    <></>
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
        show={openQuickViewModal.modal}
        onHide={handleQuickViewClose}
        placement="end"
        fullWidth
        disabled
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">
            <div className="d-flex flex-column   ">
              <div className="d-flex flex-row pb-2">
                <span className="text-nowrap me-2 text-temp-blue">
                  {openQuickViewModal.name}
                </span>
                <h6 className="fw-normal d-flex align-items-center mb-0">
                  {moment(openQuickViewModal.updatedAt).format("DD/MM/YYYY")}
                </h6>
              </div>
              <div className="d-flex flex-row">
                <FormGroup size="large" className=" me-2 ">
                  <FormSelect
                    native
                    value={openQuickViewModal.status}
                    onChange={(e) => {
                      setOpenQuickViewModal({
                        ...openQuickViewModal,
                        status: e.target.value,
                      });
                    }}
                    label="Candidate status"
                    inputProps={{
                      name: "status",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option value={"Active"}>Active</option>
                    <option value={"In-Active"}>In-Active</option>
                  </FormSelect>
                </FormGroup>
                <div className="text-center">
                  <Button
                    variant="contained"
                    align="left"
                    size="small"
                    onClick={handleUpdateClick}
                    className="btn btn-primary"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={() => setActiveTab(0)} style={{backgroundColor:"#3823231a" ,border:"1px solid #2f3950"}}>
                Client Details
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === 0 ? (
            <>
              <div className=" p-2 ">
                <CardContent className=" ">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                      Client Information
                    </Typography>
                  </Grid>
                  <form
                    className=" border border-2 p-md-5 pt-md-4 p-2  "
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Client Name"
                          name="name"
                          value={openQuickViewModal.name}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Account Manager"
                          name="accountManager"
                          value={
                            openQuickViewModal.managerFirstName +
                            " " +
                            openQuickViewModal.managerLastName}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Contact Number"
                          name="PhoneNumber"
                          value={openQuickViewModal.PhoneNumber}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Email"
                          name="email"
                          value={openQuickViewModal.email}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Type"
                          name="type"
                          value={openQuickViewModal.type}
                          fullWidth
                          disabled
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Website"
                          name="website"
                          value={openQuickViewModal.website}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Status"
                          name="status"
                          value={openQuickViewModal.status}
                          fullWidth
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Fax"
                          name="fax"
                          value={openQuickViewModal.fax}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Source"
                          name="source"
                          value={openQuickViewModal.source}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </div>
              <div className=" p-2 ">
                <CardContent className=" ">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                      Client Contact Person
                    </Typography>
                  </Grid>
                  <form
                    className=" border border-2 p-md-5 pt-md-4 p-2  "
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Name"
                          name="name"
                          value={openQuickViewModal.contactPersonName}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Email"
                          name="email"
                          value={openQuickViewModal.contactPersonEmail}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Phone Number"
                          name="phoneNumber"
                          value={openQuickViewModal.contactPersonPhoneNumber}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </div>
              <div className=" p-2 ">
                <CardContent className=" ">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                      Address Information
                    </Typography>
                  </Grid>
                  <form
                    className=" border border-2 p-md-5 pt-md-4 p-2  "
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="City"
                          name="city"
                          value={openQuickViewModal.city}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Zip Code"
                          name="zipCode"
                          value={openQuickViewModal.zipCode}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="State"
                          name="state"
                          value={openQuickViewModal.state}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item>
                        <TextField
                          size="small"
                          label="Country"
                          name="country"
                          value={openQuickViewModal.country}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </div>
            </>
          ) : (
            <div></div>
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
                  className="btn btn-primary"
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
          style={{ width: "350px" }}
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
                  value={clientStatus}
                  onChange={(e) => {
                    setClientStatus(e.target.value);
                  }}
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value={"Active"}>Active</option>
                  <option value={"In-Active"}>In-Active</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className="text-center m-2 mt-4 ">
              <div style={{ width: "100%" }}>
                <div className="btn btn-primary" onClick={handleUpdateStatus}>
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
        data={clientSelectedRow ? clientSelectedRow[0] : {}}
        modalType="client"
      />
    </>
  );
}
function mapStateToProps(state) {
  const { clientSelectedRow } = state.client;
  const { usersList } = state.auth;
  const { clients } = state.client;
  return {
    clientSelectedRow,
    clients,
    usersList,
  };
}

export default connect(mapStateToProps)(InfoRow);
