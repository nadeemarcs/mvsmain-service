import moment from "moment";
import { Link as LinkRouter } from "react-router-dom";

export const JobColDefs = [
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Resumes",
    field:"Resumes",
    initialEditValue: "initial edit value",

    render: (rowData) => (
      <LinkRouter
        style={{
          color: "#0e2c66",
          backgroundColor: "#8ab1d9",
          padding: "7px",
          borderRadius: "10px",
        }}
        to={{
          pathname: "/candidates",
          state: { data: rowData },
        }}
      >
        {rowData.jobCandidateMappings?.length}
      </LinkRouter>
    ),
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Duration",
    field: "duration",

    initialEditValue: "initial edit value",
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },

    title: "Lead Recruiter",
    field: "leadRecruiter",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Account Manager",
    field: "accountManager",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "No. of Position",
    field: "positions",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Job Type",
    field: "jobType",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "City",
    field: "jobLocation",

    initialEditValue: "initial edit value",
  },
  
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "State",
    field: "state",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },

    title: "Assigned Recruiter",
    field: "assignedRecruiter",

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Client Number",
    field: "clientReqId",
    initialEditValue: "initial edit value",
  },
  
  
 
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Zip Code",
    field: "zipCode",
    export: false,

    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Created By",
    field: "jobCreatedBy",
    export: false,

    render: (rowData) => (
      <>
        <span>{`${rowData.createdByFirstName} ${rowData.createdByLastName}`}</span>
      </>
    ),
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Modified By",
    field: "modifiedBy",
    export: false,

    render: (rowData) => (
      <>
        <span>{`${rowData.updatedByFirstName ?? ""} ${
          rowData.updatedByLastName ?? ""
        }`}</span>
      </>
    ),
    initialEditValue: "initial edit value",
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Hourly Rate",
    field: "hourlyRate",
    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Salary",
    field: "salary",
    initialEditValue: "initial edit value",
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Country",
    field: "country",
    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Created Time",
    field: "createdAt",
    export: false,
    render: (rowData) => (
      <>
        <span>{moment(rowData.createdAt).format("MM/DD/YYYY-hh:mm:ss A")}</span>
      </>
    ),
    initialEditValue: "initial edit value",
  },
  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Modified Time",
    field: "updatedAt",
    export: false,

    render: (rowData) => (
      <>
        <span>{moment(rowData.updatedAt).format("MM/DD/YYYY-hh:mm:ss A")}</span>
      </>
    ),
    initialEditValue: "initial edit value",
  },
];
