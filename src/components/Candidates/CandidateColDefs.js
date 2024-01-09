import moment from "moment";

export const CandidateColDefs = [
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Candidate Status",
    field: "candidateStatus",
    render: (rowData) => (
      <>
        <span>
          {rowData?.jobCandidateMappings?.length
            ? rowData?.jobCandidateMappings[0]?.status
            : "None"}
        </span>
      </>
    ),
    customFilterAndSearch: (term, rowData) =>
      rowData?.jobCandidateMappings[0]?.status
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1,
  },

  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Mobile No",
    field: "phoneNumber",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Email",
    field: "email",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Notice Period",
    field: "noticePeriod",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Current Job Title",
    field: "currentJobTitle",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Education",
    field: "education",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Experience in Years",
    field: "experience",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },

    title: "Relocation",
    field: "reLocation",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Visa Status",
    field: "visaStatus",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Current Salary",
    field: "currentSalary",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "State",
    field: "state",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Skill Set",
    field: "skillSet",
    render: (rowData) => (
      <>
        <span>{rowData?.skills?.join(", ")}</span>
      </>
    ),
  },
  {
    width: "auto",
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
      rowData?.createdByFirstName.toLowerCase().indexOf(term.toLowerCase()) >
      -1,
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "City",
    field: "city",
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Expected Salary",
    field: "expectedSalary",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Created Time",
    field: "createdAt",
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
    title: "Current Employer",
    field: "employerOrVendor",
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Phone No",
    field: "telNumber",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Modified By",
    field: "modifiedBy",
    render: (rowData) => (
      <>
        <span>
          {rowData?.updatedByFirstName} {rowData?.updatedByLastName}
        </span>
      </>
    ),
  },
  {
    width: "auto",
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
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Candidate Owner",
    field: "candidateOwner",
    render: (rowData) => (
      <>
        <span>
          {rowData?.ownedByFirstName} {rowData?.ownedByLastName}
        </span>
      </>
    ),
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Recruiter",
    field: "recruiter",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Desired Pay",
    field: "desiredPay",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Candidate Id",
    field: "candidateId",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Secondary Email",
    field: "secondaryEmail",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Street",
    field: "street",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Zip Code",
    field: "zipCode",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Country",
    field: "country",
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Website",
    field: "website",
    render: (rowData) => (
      <>
        <span>{rowData?.social?.website}</span>
      </>
    ),
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Linkedin",
    field: "linkedIn",
    render: (rowData) => (
      <>
        <span>{rowData?.social?.linkedIn}</span>
      </>
    ),
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Skype Id",
    field: "skype",
    render: (rowData) => (
      <>
        <span>{rowData?.social?.skype}</span>
      </>
    ),
  },
  {
    width: "auto",
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Github",
    field: "github",
    render: (rowData) => (
      <>
        <span>{rowData?.social?.github}</span>
      </>
    ),
  },

  {
    cellStyle: {
      whiteSpace: "nowrap",
    },
    title: "Hourly Rate",
    field: "hourlyRate",
  },
];
