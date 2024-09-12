import React from "react";
import "./Card.css";

const Card = (props) => {
  const { title, url, id } = props.pic;
  const [isLiked, setIsLiked] = React.useState(false);

  const pressLikeButton = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="card">
      <div
        className="card__image"
        style={{ backgroundImage: `url(${url})` }}
        onClick={() => {
          props.popupImageSelector(url);
        }}
      >
        <button
          className="card__delete-icon"
          onClick={(e) => {
            e.stopPropagation();
            props.getIncompletePictures(id);
          }}
        ></button>
      </div>
      <div className="card__description">
        <p className="card__name">{title}</p>
        <button
          className={`card__like-icon${
            isLiked ? " card__like-icon_liked" : ""
          }`}
          onClick={pressLikeButton}
        ></button>
      </div>
    </div>
  );
};

export default Card;
