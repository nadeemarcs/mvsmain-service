import React from "react";
import JobCard from "./jobIconCard";
function postjob() {
  return (
    <>
      <div>
        <div className="text-center mt-3 fs-3"><span style={{color:"grey"}}>Job Posting</span></div>
         {/* <div className="text-center mt-2 fs-4 border rounded mx-2  border-2 "><span style={{color:"grey"}}> Career Site</span></div> */}
         <JobCard />
        
         
      </div>
    </>
  );
}

export default postjob;
