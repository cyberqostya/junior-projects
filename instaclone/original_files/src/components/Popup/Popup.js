import React from "react";

import "./Popup.css";

const Popup = (props) => {
  const errorMessages = {
    short: "The value is too short",
    empty: "Required input field",
    link: "Incorrect link",
  };

  const closePopup = (evt) => {
    evt.target.classList.contains("popup") && props.areaPopupHandler(false);
  };

  // Стейт кнопки формы
  const [inputFirstValidity, setInputFirstValidity] = React.useState(false);
  const [inputSecondValidity, setInputSecondValidity] = React.useState(false);

  const checkValidity = () => {
    if (inputFirstValidity && inputSecondValidity) {
      return false;
    } else {
      return true;
    }
  };

  // Убирается фоновый скролл при открытии попапа
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  // Добавляем текст в инпуты таким образом, так как через атрибут value не изменяется содержимое ввода
  // Также включает кнопку, так как все поля корректно заполнены ИЗНАЧАЛЬНО
  React.useEffect(() => {
    if (document.forms.edit) {
      const inputName = document.forms.edit.elements.name;
      const inputJob = document.forms.edit.elements.job;

      inputName.value = props.userData.userName;
      inputJob.value = props.userData.userJob;

      handlerText(inputName, setInputFirstValidity);
      handlerText(inputJob, setInputSecondValidity);
    }
  }, []);

  // Функции валидации
  function handlerText(block, changeBlockState) {
    if (!block.validity.valid) {
      if (block.validity.tooShort) {
        block.nextElementSibling.textContent = errorMessages.short;
      } else {
        block.nextElementSibling.textContent = errorMessages.empty;
      }
      changeBlockState(false);
    } else {
      block.nextElementSibling.textContent = "";
      changeBlockState(true);
    }
  }

  function handlerLink(block, changeBlockState) {
    if (!block.validity.valid) {
      block.nextElementSibling.textContent = errorMessages.empty;
      changeBlockState(false);
    } else {
      if (!block.value.match(/^https?:\/\/.+/)) {
        block.nextElementSibling.textContent = errorMessages.link;
        changeBlockState(false);
      } else {
        block.nextElementSibling.textContent = "";
        changeBlockState(true);
      }
    }
  }

  // Возвращает данные выбранного попапа
  const chooseDataOfPopup = () => {
    const popupData = {
      add: {
        title: "Add new card",
        formName: "add",
        buttonName: "+",
      },

      edit: {
        title: "Edit profile",
        formName: "edit",
        buttonName: "Сохранить",
      },

      image: {
        url: props.imageUrl,
      },
    };

    return popupData[props.varietyOfPopup];
  };

  const popupData = chooseDataOfPopup();

  // Обработчик на кнопку
  function handlerButton(evt) {
    evt.preventDefault();
    if (popupData.buttonName === "Сохранить") {
      props.userData.setUserName(document.forms.edit.elements.name.value);
      props.userData.setUserJob(document.forms.edit.elements.job.value);
    } else {
      props.cards.setNewCards([
        ...props.cards.newCards,
        {
          name: document.forms.add.elements.title.value,
          url: document.forms.add.elements.link.value,
        },
      ]);
    }
    props.areaPopupHandler(false);
  }

  if (typeof popupData.url === "undefined") {
    return (
      <div className="popup" onMouseDown={closePopup}>
        <div className="popup__content">
          <h3 className="popup__title">{popupData.title}</h3>
          <form className="popup__form" name={popupData.formName} noValidate>
            {popupData.formName === "edit" ? (
              <>
                <div className="popup__input-field">
                  <input
                    type="text"
                    name="name"
                    className="popup__input"
                    placeholder="Name"
                    minLength="2"
                    maxLength="30"
                    required
                    onInput={(evt) => {
                      handlerText(evt.target, setInputFirstValidity);
                    }}
                  />
                  <p className="popup__error-message"></p>
                </div>
                <div className="popup__input-field">
                  <input
                    type="text"
                    name="job"
                    className="popup__input"
                    placeholder="About yourself"
                    minLength="2"
                    maxLength="30"
                    required
                    onInput={(evt) => {
                      handlerText(evt.target, setInputSecondValidity);
                    }}
                  />
                  <p className="popup__error-message"></p>
                </div>
              </>
            ) : (
              <>
                <div className="popup__input-field">
                  <input
                    className="popup__input"
                    name="title"
                    type="text"
                    placeholder="Title"
                    minLength="2"
                    maxLength="30"
                    required
                    onInput={(evt) => {
                      handlerText(evt.target, setInputFirstValidity);
                    }}
                  />
                  <p className="popup__error-message"></p>
                </div>
                <div className="popup__input-field">
                  <input
                    className="popup__input"
                    name="link"
                    type="text"
                    placeholder="Link on image"
                    required
                    onInput={(evt) => {
                      handlerLink(evt.target, setInputSecondValidity);
                    }}
                  />
                  <p className="popup__error-message"></p>
                </div>
              </>
            )}

            <button
              className={
                popupData.formName === "edit"
                  ? "popup__button popup__edit-button button"
                  : "popup__button button"
              }
              disabled={checkValidity()}
              onClick={handlerButton}
            >
              {popupData.buttonName}
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="popup" onClick={closePopup}>
        <div className="popup__container">
          <img
            className="popup__image"
            src={popupData.url}
            alt="Beautyfull pic"
          />
        </div>
      </div>
    );
  }
};

export default Popup;
