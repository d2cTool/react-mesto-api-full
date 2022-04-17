import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      btnName="Сохранить"
      name="profile"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleOnSubmit}
    >
      <input
        id="nameInput"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Имя"
        value={name || ""}
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__form-text-error nameInput-error"></span>
      <input
        id="jobInput"
        type="text"
        name="about"
        className="popup__input"
        placeholder="Профессиональная деятельность"
        value={about || ""}
        required
        minLength="2"
        maxLength="200"
        onChange={handleAboutChange}
      />
      <span className="popup__form-text-error jobInput-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
