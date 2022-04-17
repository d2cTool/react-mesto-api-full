import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useRef, useContext, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarElement = useRef(null);

  useEffect(() => {
    avatarElement.current.value = currentUser.avatar;
  }, [currentUser, isOpen]);

  function handleOnSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarElement.current.value);
  }

  return (
    <PopupWithForm
      btnName="Сохранить"
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleOnSubmit}
      isOpen={isOpen}
    >
      <input
        id="avatarInput"
        ref={avatarElement || ""}
        type="url"
        name="avatar"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__form-text-error avatarInput-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
