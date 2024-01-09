import React from "react";

function footer() {
  return (
    <div
      style={{
        height: "25px",
        position: "fixed",
        bottom: "0px",
        width: "100%",
        textAlign: "center",
        display: "block",
        flexShrink: "0",
        backgroundColor: "#0e2c66",
        color: "#ffffff",
      }}
    >
      &copy;Copyright FSS 2021
    </div>
  );
}

export default footer;
