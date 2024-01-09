import React from "react";

import Search from "./Search";

import InfoRow from "./InfoRow";

import Footer from "../footer";
export default function Jobopening() {
  return (
    <>
      <div
        className="jobopening "
        style={{ backgroundColor: "rgb(128 128 128 / 6%)" }}
      >
        <div>
          <Search />
        </div>

        <InfoRow />
      </div>

      <Footer />
    </>
  );
}
