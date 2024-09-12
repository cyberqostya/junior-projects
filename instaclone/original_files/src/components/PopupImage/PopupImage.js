import React from "react";
import "./PopupImage.css";

const PopupImage = (props) => {
  return (
    <div
      className="popup-image"
      onClick={(e) => {
        if (!e.target.classList.contains("popup-image__image"))
          props.popupImageSelector();
      }}
    >
      <img
        className="popup-image__image"
        src={props.urlImage}
        alt="Beautyful place"
      />
    </div>
  );
};

export default PopupImage;
