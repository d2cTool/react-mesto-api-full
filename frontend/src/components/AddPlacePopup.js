import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (name && link)
      onAddPlace({
        name,
        link,
      });
  }

  return (
    <PopupWithForm
      btnName="Создать"
      name="card"
      title="Новое место"
      onClose={onClose}
      onSubmit={handleOnSubmit}
      isOpen={isOpen}
    >
      <input
        id="placeNameInput"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Название"
        value={name}
        required
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
      />
      <span className="popup__form-text-error placeNameInput-error"></span>
      <input
        id="linkInput"
        type="url"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        value={link}
        required
        onChange={handleLinkChange}
      />
      <span className="popup__form-text-error linkInput-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
