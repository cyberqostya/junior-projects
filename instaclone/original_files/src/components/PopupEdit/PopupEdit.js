import React from "react";

const PopupEdit = (props) => {
  // Проверка валидны ли все поля - вкл/выкл кнопки
  const [buttonIsActive, setButtonIsActive] = React.useState(true);
  const [validationParameter, setValidationParameter] = React.useState({ name: true, job: true });

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
    }console.log(e.target.name, parameter)
    checkValidity(e.target.name, parameter);
  };

  // Внесение данных в поля при открытии Попапа
  const nameInput = React.useRef(null);
  const surnameInput = React.useRef(null);
  const jobInput = React.useRef(null);

  React.useEffect(() => {
    nameInput.current.value = props.editedProfileData.name;
    surnameInput.current.value = props.editedProfileData.surname;
    jobInput.current.value = props.editedProfileData.job;
  }, []);

  // Обработчик отправки формы
  const formSubmit = (e) => {
    e.preventDefault();
    props.editProfileData({
      name: nameInput.current.value,
      surname: surnameInput.current.value,
      job: jobInput.current.value,
    });
    props.togglerPopupEdit();
  };

  return (
    <div className="popup" onMouseDown={(e) => { e.target.classList.contains('popup') && props.togglerPopupEdit() }}>
      <div className="popup__content">
        <h3 className="popup__title">Edit</h3>
        <form
          className="popup__form"
          name="formEdit"
          noValidate
          onSubmit={formSubmit}
        >
          <div className="popup__input-field">
            <input
              type="text"
              name="name"
              className="popup__input"
              placeholder="Name"
              minLength="2"
              maxLength="15"
              autoComplete="off"
              required
              onChange={validateText}
              ref={nameInput}
            />
            <p className="popup__error-message"></p>
          </div>
          <div className="popup__input-field">
            <input
              type="text"
              name="surname"
              className="popup__input"
              placeholder="Surname"
              minLength="2"
              maxLength="15"
              autoComplete="off"
              ref={surnameInput}
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
              autoComplete="off"
              required
              onChange={validateText}
              ref={jobInput}
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

export default PopupEdit;
