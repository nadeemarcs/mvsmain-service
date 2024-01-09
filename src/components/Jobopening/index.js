/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import InfoRow from "./InfoRow";

import Footer from "../common/footer";
import { getJobs } from "../../actions/job";
import { useDispatch } from "react-redux";
import { getCandidates } from "../../actions/candidate";

export default function Jobopening(props) {
  const dispatch = useDispatch();
  const [jobsLoading, setJobsLoading] = useState(true);
  useEffect(() => {
    dispatch(getJobs()).then(()=>{
      setJobsLoading(false);
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "rgb(128 128 128 / 6%)" }}>
        <div className=" pb-4">
          <InfoRow isJobsLoading={jobsLoading}/>
        </div>
      </div>

      <Footer />
    </>
  );
}
