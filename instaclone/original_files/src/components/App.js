import React from "react";
import { data } from "./data";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import CardContainer from "./CardContainer/CardContainer";
import PopupImage from "./PopupImage/PopupImage";
import PopupEdit from "./PopupEdit/PopupEdit";
import PopupAdd from "./PopupAdd/PopupAdd";

const App = () => {
  const [pictures, setPictures] = React.useState(data.pictures);

  const [popupImageIsOpened, setPopupImageIsOpened] = React.useState(false);
  const [urlImage, setUrlImage] = React.useState("");

  const [popupEditIsOpened, setPopupEditIsOpened] = React.useState(false);
  const [editedProfileData, setEditedProfileData] = React.useState(data);

  const [popupAddIsOpened, setPopupAddIsOpened] = React.useState(false);

  const getIncompletePictures = (id) => {
    const incompletePictures = pictures.filter((item) => {
      return item.id !== id;
    });
    setPictures(incompletePictures);
  };

  const popupImageSelector = (url) => {
    if (url) setUrlImage(url);
    setPopupImageIsOpened(!popupImageIsOpened);
  };

  const editProfileData = (data) => {
    setEditedProfileData(data);
  };

  const togglerPopupEdit = () => {
    setPopupEditIsOpened(!popupEditIsOpened);
  };

  const togglerPopupAdd = () => {
    setPopupAddIsOpened(!popupAddIsOpened);
  };

  const addPicture = (pic) => {
    pic.id = pictures[pictures.length-1].id + 1;
    setPictures([...pictures, pic]);
  };

  return (
    <>
      <Header />
      <Profile
        data={editedProfileData}
        togglerPopupEdit={togglerPopupEdit}
        togglerPopupAdd={togglerPopupAdd}
      />
      <CardContainer
        pictures={pictures}
        getIncompletePictures={getIncompletePictures}
        popupImageSelector={popupImageSelector}
      />

      {popupImageIsOpened && (
        <PopupImage
          urlImage={urlImage}
          popupImageSelector={popupImageSelector}
        />
      )}

      {popupEditIsOpened && (
        <PopupEdit
          editedProfileData={editedProfileData}
          editProfileData={editProfileData}
          togglerPopupEdit={togglerPopupEdit}
        />
      )}
      {popupAddIsOpened && <PopupAdd addPicture={addPicture} togglerPopupAdd={togglerPopupAdd} />}
    </>
  );
};

export default App;
