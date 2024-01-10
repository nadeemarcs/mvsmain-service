/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import "./vendor.css";
import { Dropdown } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddBoxOutlined, Close, ExitToApp } from "@material-ui/icons";
import { connect, useDispatch } from "react-redux";
import { rowSelected } from "../../actions/vendor";
import { getUsers } from "../../actions/auth";
import DeleteDialog from "../common/DeleteDialog";
import moment from "moment";
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
  Typography,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Button from "@restart/ui/Button";
import { FormGroup, FormSelect, Nav, Offcanvas } from "react-bootstrap";
import FilterListIcon from '@material-ui/icons/FilterList';
import { updateVendor } from "../../actions/vendor";

function InfoRow(props) {
  const { vendors } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { vendorSelectedRow, usersList = [] } = props;
  const [selectedRow, setSelectedRow] = useState({});
  const [showChangeOwnerModal, setShowChangeOwnerModal] = React.useState(false);
  const [showChangeStatus, setShowChangeStatus] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [vendorStatus, setVendorStatus] = useState("");
  const [filtering, setFiltering] = React.useState();
  const handleUpdateStatus = () => {
    dispatch(
      updateVendor(vendorSelectedRow[0].id, { status: vendorStatus })
    ).then(() => {
      setShowChangeStatus(false);
      history.push("/vendors");
      window.location.reload();
    });
  };
  const [owner, setOwner] = useState({});
  const handleStatus = (e) => {
    e.preventDefault();
    setVendorStatus(vendorSelectedRow[0].status);
    setShowChangeStatus(true);
  };
  const handleUpdateOwnerClick = () => {
    dispatch(
      updateVendor(vendorSelectedRow[0].id, {
        owner: owner?.id,
      })
    ).then(() => {
      setShowChangeOwnerModal(false);
      history.push("/vendors");
      window.location.reload();
    });
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    setOwner(
      usersList?.filter(
        (item) =>
          item.fullName ===
          vendorSelectedRow[0]?.ownedByFirstName +
            " " +
            vendorSelectedRow[0]?.ownedByLastName
      )[0]
    );
  }, [vendorSelectedRow]);
  const [activeTab, setActiveTab] = useState(0);
  const [openQuickViewModal, setOpenQuickViewModal] = useState({
    id: "",
    modal: false,
    name: "",
    status: "",
    contact: "",
    phoneNumber: "",
    email: "",
    website: "",
    ownedByFirstName: "",
    ownedByLastName: "",
    emailOpt: "",
    einNumber: "",
    skills: [],

    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const handleQuickViewOpen = (
    e,
    id,
    name,
    status,
    contact,
    phoneNumber,
    email,
    website,
    ownedByFirstName,
    ownedByLastName,
    emailOpt,
    einNumber,
    skills,
    city,
    state,
    country,
    zipcode
  ) => {
    e.preventDefault();
    setOpenQuickViewModal({
      id,
      modal: true,
      name,
      status,
      contact,
      phoneNumber,
      email,
      website,
      ownedByFirstName,
      ownedByLastName,
      emailOpt,
      einNumber,
      skills,
      city,
      state,
      country,
      zipcode,
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
      updateVendor(openQuickViewModal.id, {
        status: openQuickViewModal.status,
      })
    ).then(() => {
      setOpenQuickViewModal({
        ...openQuickViewModal,
      });
      history.push("/vendors");
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
                fontSize: "18px",
                color: "gray",
              }}
              onClick={(e) => {
                handleQuickViewOpen(
                  e,
                  rowData.id,
                  rowData.name,
                  rowData.status,
                  rowData.contact,
                  rowData.phoneNumber,
                  rowData.email,
                  rowData.website,
                  rowData.ownedByFirstName,
                  rowData.ownedByLastName,
                  rowData.emailOpt,
                  rowData.einNumber,
                  rowData.skills,

                  rowData.address.city,
                  rowData.address.state,
                  rowData.address.country,
                  rowData.address.zipCode
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
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Vendor Name",
      field: "name",
      render: (rowData) => (
        <>
          <span>
            <LinkRouter
              style={{ color: "#1A50A3" }}
              to={{
                pathname: "/vendorview",
                state: { data: rowData },
              }}
            >
              {rowData.name}
            </LinkRouter>
          </span>
        </>
      ),

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Vendor Status",
      field: "status",

      initialEditValue: "initial edit value",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Phone Number",
      field: "phoneNumber",

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Mobile Number",
      field: "contact",

      initialEditValue: "initial edit value",
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Email Id",
      field: "email",

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Website",
      field: "website",

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "EIN",
      field: "einNumber",

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Skills",
      field:"Skills",
      render: (rowData) => (
        <>
          <span>{rowData?.skills?.join(", ")}</span>
        </>
      ),

      initialEditValue: "initial edit value",
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Vendor Owner",
      field:"Vendor Owner",
      render: (rowData) => (
        <>
          <span>
            {rowData?.ownedByFirstName} {rowData?.ownedByLastName}
          </span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.ownedByFirstName.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Created By",
      field:"Created By",
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
      title: "Created Time",
      field:"createdAt",
      render: (rowData) => (
        <>
          <span>
            {moment(rowData?.createdAt).format("MM/DD/YYYY-hh:mm:ss A")}
          </span>
        </>
      ),
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Modified By",
      field:"modifiedby",
      render: (rowData) => (
        <>
          <span>
            {rowData?.updatedByFirstName} {rowData?.updatedByLastName}
          </span>
        </>
      ),
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Modified Time",
      field: "modifiedAt",
      render: (rowData) => (
        <>
          <span>
            {moment(rowData?.modifiedAt).format("MM/DD/YYYY-hh:mm:ss A")}
          </span>
        </>
      ),
    },

    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "City",
      field:"city",
      render: (rowData) => (
        <>
          <span>{rowData?.address?.city}</span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.address?.city.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "State",
      field: "state",
      render: (rowData) => (
        <>
          <span>{rowData?.address?.state}</span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.address?.state.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Country",
      field:"country",
      render: (rowData) => (
        <>
          <span>{rowData?.address?.country}</span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.address?.country.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Zip Code",
      field:"zipCode",
      render: (rowData) => (
        <>
          <span>{rowData?.address?.zipCode}</span>
        </>
      ),
      customFilterAndSearch: (term, rowData) =>
      rowData?.address?.zipCode.toLowerCase().indexOf(term.toLowerCase()) > -1,
    },
    {
      cellStyle: {
        whiteSpace: "nowrap",
      },
      title: "Email Opt Out",
      field: "emailOpt",

      initialEditValue: "initial edit value",
    },
  ]);

  return (
    <>
      <div className="vendor">
        <MaterialTable
          style={{ border: "1px solid #80808080" }}
          isLoading={props.isVendorsLoading}
          title="Vendors"
          columns={columns}
          onSelectionChange={(row) => setSelectedRow(row)}
          data={vendors}
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
              tooltip: "Add Vendor",
              isFreeAction: true,
              onClick: (event) => history.push("/createvendor"),
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
                  {vendorSelectedRow?.length === 1 ? (
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
                              pathname: "/vendorview",
                              state: { data: vendorSelectedRow[0] },
                            }}
                          >
                            Edit Vendor
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
        InputLabelProps={{ shrink: true }}
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
                    label="Vendor status"
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
              <Nav.Link eventKey="link-1" onClick={() => setActiveTab(0)}style={{backgroundColor:"#3823231a" ,border:"1px solid #2f3950"}}>
                Vendor Details
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === 0 ? (
            <>
              <div className=" p-2 ">
                <CardContent className="  ">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="left"
                      className="pb-3"
                    >
                      Vendor Information
                    </Typography>
                  </Grid>
                  <form
                    className=" border border-2 p-md-5 pt-md-4 p-2  "
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Vendor Name"
                          name="name"
                          value={openQuickViewModal.name}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Vendor Status"
                          name="contact"
                          value={openQuickViewModal.status}
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Vendor Contact"
                          name="contact"
                          value={openQuickViewModal.contact}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Phone"
                          name="phoneNumber"
                          value={openQuickViewModal.phoneNumber}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Email"
                          name="email"
                          value={openQuickViewModal.email}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
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
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Vendor Owner"
                          name="Owner"
                          value={
                            openQuickViewModal.ownedByFirstName +
                            " " +
                            openQuickViewModal.ownedByLastName
                          }
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Email Opt Out"
                          name="emailOpt"
                          value={openQuickViewModal.emailOpt}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Vendor EIN Number"
                          name="einNumber"
                          value={openQuickViewModal.einNumber}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>

                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Skills"
                          name="skills"
                          value={openQuickViewModal?.skills?.join(", ")}
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
                <CardContent className="">
                  <Grid item>
                    <Typography variant="h6" gutterBottom align="left">
                      Address Information
                    </Typography>
                  </Grid>
                  <form
                    className=" border border-2 p-md-5 pt-md-4 p-2  "
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="City"
                          name="city"
                          value={openQuickViewModal.city}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Zip Code"
                          name="zipCode"
                          value={openQuickViewModal.zipcode}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="State"
                          name="state"
                          value={openQuickViewModal.state}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled
                        />
                      </Grid>
                      <Grid xs={12} sm={6} md={6} item className="">
                        <TextField
                          size="small"
                          label="Country"
                          name="country"
                          value={openQuickViewModal.country}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
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
      {/* Change Owner */}
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
      {/* change status */}
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
                  value={vendorStatus}
                  onChange={(e) => {
                    setVendorStatus(e.target.value);
                  }}
                  label="Vendor Status"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value={"Active"}>Active</option>
                  <option value={"In-Active"}>In-Active</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className="text-center m-2 mt-4 ">
              <div style={{ width: "100%" }}>
                <div onClick={handleUpdateStatus} className="btn btn-primary ">
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
        data={vendorSelectedRow ? vendorSelectedRow[0] : {}}
        modalType="vendor"
      />
    </>
  );
}

function mapStateToProps(state) {
  const { vendors } = state.vendor;
  const { vendorSelectedRow } = state.vendor;
  const { usersList } = state.auth;

  return {
    vendors,
    vendorSelectedRow,
    usersList,
  };
}

export default connect(mapStateToProps)(InfoRow);
