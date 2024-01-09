/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InfoRow from "./InfoRow";

import Footer from "../common/footer";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getCandidates, getCandidatesById } from "../../actions/candidate";

export default function Candidates() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const { state, search } = location;
  const jobTitle = search?.split("=");

  useEffect(() => {
    if (state?.data) {
      const candidateId = [];
      const mappings = state.data?.jobCandidateMappings;
      mappings.forEach((candidate) =>
        candidateId.push(candidate?.candidate?.id)
      );
      dispatch(getCandidatesById(candidateId.join(","))).then(()=>{
        setCandidatesLoading(false);
      });
    } else if (jobTitle[0] !== "?jobTitle") {
      dispatch(getCandidates(1,20)).then(()=>{
        setCandidatesLoading(false);
      });
    }
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "rgb(128 128 128 / 6%)" }}>
        <div className="   pb-4">
          {/* <div>
            <Search
              className="py-2"
              candidateAssociated={state?.data}
            />
          </div> */}

          <InfoRow jobAssociated={state?.data} jobTitle={jobTitle[1]} isCandidatesLoading={candidatesLoading}/>
        </div>
      </div>

      <Footer />
    </>
  );
}
