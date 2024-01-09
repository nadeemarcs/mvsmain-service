/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InfoRow from "./InfoRow";

import Footer from "../common/footer";
import { useDispatch } from "react-redux";
import { getClients } from "../../actions/client";

export default function Jobopening() {
  const [clientsLoading, setClientsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients()).then(()=>{
      setClientsLoading(false);
    });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "rgb(128 128 128 / 6%)" }}>
        <div className="  pb-4">
          <InfoRow isClientsLoading={clientsLoading}/>
        </div>
      </div>

      <Footer />
    </>
  );
}
