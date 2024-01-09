/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import InfoRow from "./InfoRow";

import Footer from "../common/footer";
import { useDispatch } from "react-redux";
import { getVendors } from "../../actions/vendor";
export default function Jobopening() {

  const dispatch = useDispatch();
  const [vendorsLoading, setVendorsLoading] = useState(true);
  useEffect(() => {
    dispatch(getVendors()).then(()=>{
      setVendorsLoading(false);
    })
  }, [])

  return (
    <>
      <div style={{ backgroundColor: "rgb(128 128 128 / 6%)" }}>
        <div className=" pb-5">
          {/* <div>
            <Search className="py-2" />
          </div> */}

          <InfoRow isVendorsLoading={vendorsLoading} />
        </div>
      </div>

      <Footer />
    </>
  );
}
