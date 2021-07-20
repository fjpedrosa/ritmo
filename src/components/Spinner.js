import React from "react";

const Spinner = ({ size = 36 }) => {
  return (
    <div
      className={"spinner"}
      style={{ borderWidth: size / 10, width: size, height: size }}
    ></div>
  );
};

export default Spinner;
