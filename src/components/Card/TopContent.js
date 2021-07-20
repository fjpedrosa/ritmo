import React from "react";

const TopContent = ({ title, image }) => {
  return (
    <div className={"card__top-content"}>
      <h3>{title}</h3>
      {image && (
        <img
          style={{ objectFit: "cover", maxHeight: "100%" }}
          src={image}
          width={"100%"}
          height={"100%"}
          alt={"imagen de la noticia"}
        />
      )}
    </div>
  );
};

export default TopContent;
