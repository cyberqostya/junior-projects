import "./CardContainer.css";
import Card from "../Card/Card";

const CardContainer = (props) => {
  const pictures = props.pictures.map((item) => {
    return (
      <Card
        pic={item}
        key={item.id}
        getIncompletePictures={props.getIncompletePictures}
        popupImageSelector={props.popupImageSelector}
      />
    );
  });

  return <section className="card-container root__section">{pictures}</section>;
};

export default CardContainer;
