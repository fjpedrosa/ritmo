import React from "react";
import moment from "moment";

const Header = ({ docType, source, date }) => {
  return (
    <div className={"card__header"}>
      <div className={"card__header-column"}>
        <span>
          <strong>{docType.toUpperCase()}</strong>
        </span>
        <span>
          <small>Published:&nbsp;{moment(date).format("DD-MM-YYYY")}</small>
        </span>
      </div>
      <span>{source}</span>
    </div>
  );
};

export default Header;
