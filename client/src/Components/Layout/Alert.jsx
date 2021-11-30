import React from "react";

export default function Alert({ msg, color }) {
  if (color === "gray") return <div className="alert alert-light">{msg}</div>;
  return <div className="alert alert-danger">{msg}</div>;
}
