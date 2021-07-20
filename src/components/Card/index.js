import React, { useState, useEffect } from "react";
import Header from "./Header";
import TextContent from "./TextContent";
import TopContent from "./TopContent";

const Card = ({ document }) => {
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    const fetchImage = async (imgUrl) => {
      await fetch(imgUrl)
        .then((resp) => resp.blob())
        .then((resp) => {
          let imgObject = URL.createObjectURL(resp);
          setImage(imgObject);
        });
    };
    let img = document.multimedia.find((item) => item.type === "image");
    if (img) {
      fetchImage(`https://www.nytimes.com/${img.url}`);
    }
  }, [document.multimedia]);

  return (
    <div
      className={"card"}
      onClick={() => (window.location = document.web_url)}
    >
      <Header
        date={document.pub_date}
        docType={document.document_type}
        source={document.source}
      />
      <TopContent title={document.headline.main} image={image} />
      <TextContent text={document.lead_paragraph} />
    </div>
  );
};

export default Card;
