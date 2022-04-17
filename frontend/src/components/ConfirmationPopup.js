import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  function handleOnSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      btnName="Да"
      name="confirmation"
      title="Вы уверены?"
      onClose={onClose}
      onSubmit={handleOnSubmit}
      isOpen={isOpen}
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;
