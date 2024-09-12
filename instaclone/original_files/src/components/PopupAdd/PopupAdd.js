import React from "react";

const PopupAdd = (props) => {
  // Проверка валидны ли все поля - вкл/выкл кнопки
  const [buttonIsActive, setButtonIsActive] = React.useState(false);
  const [validationParameter, setValidationParameter] = React.useState({ title: false, url: false });

  const checkValidity = (block, parameter) => {
    const copiedObj = Object.assign(validationParameter);
    copiedObj[block] = parameter;
    setValidationParameter(copiedObj);
    Object.values(validationParameter).every((item) => {
      return !!item;
    })
      ? setButtonIsActive(true)
      : setButtonIsActive(false);
  };

  // Валидация текстовых полей
  const errorMessages = {
    tooShort: "Field is too short",
    required: "Required field",
    misMatch: "Incorrect URL",
  };

  const validateText = (e) => {
    let parameter;
    if (e.target.validity.valueMissing) {
      e.target.nextSibling.textContent = errorMessages.required;
      parameter = false;
    } else if (e.target.validity.tooShort) {
      e.target.nextSibling.textContent = errorMessages.tooShort;
      parameter = false;
    } else {
      e.target.nextSibling.textContent = "";
      parameter = true;
    }
    checkValidity(e.target.name, parameter);
  };

  const validateUrl = (e) => {
    let parameter;
    if (e.target.validity.valueMissing) {
      e.target.nextSibling.textContent = errorMessages.required;
      parameter = false;
    } else if (
      e.target.value.match(/^(https?:\/\/).+(.jpg|.png|.jpeg|.svg)$/)
    ) {
      parameter = true;
    } else {
      e.target.nextSibling.textContent = errorMessages.misMatch;
      parameter = false;
    }
    checkValidity(e.target.name, parameter);
  };

  const titleInput = React.useRef(null);
  const urlInput = React.useRef(null);

  // Обработчик отправки формы
  const formSubmit = (e) => {
    e.preventDefault();
    props.addPicture({
      title: titleInput.current.value,
      url: urlInput.current.value,
    });
    props.togglerPopupAdd();
  };

  return (
    <div
      className="popup"
      onMouseDown={(e) => {
        e.target.classList.contains("popup") && props.togglerPopupAdd();
      }}
    >
      <div className="popup__content">
        <h3 className="popup__title">Add new photo</h3>
        <form
          className="popup__form"
          name="formAdd"
          noValidate
          onSubmit={formSubmit}
        >
          <div className="popup__input-field">
            <input
              className="popup__input"
              name="title"
              type="text"
              placeholder="Title"
              minLength="2"
              maxLength="30"
              autoComplete="off"
              required
              onChange={validateText}
              ref={titleInput}
            />
            <p className="popup__error-message"></p>
          </div>
          <div className="popup__input-field">
            <input
              className="popup__input"
              name="url"
              type="text"
              placeholder="Link on image"
              autoComplete="off"
              required
              onChange={validateUrl}
              ref={urlInput}
            />
            <p className="popup__error-message"></p>
          </div>

          <button className="popup__button button" disabled={!buttonIsActive}>
            OK
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupAdd;
