import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <section className="loading">
    <img
      src={spinner}
      style={{
        width: "50px",
        display: "block",
      }}
      alt="Loading..."
    />
  </section>
);

export default Spinner;
