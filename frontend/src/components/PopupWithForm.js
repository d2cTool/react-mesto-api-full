function PopupWithForm({
  isOpen,
  name,
  title,
  btnName,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <section
      className={'popup ' + (isOpen && "popup_opened")}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          aria-label="close"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <form
          action="/post"
          name={`${name}Form`}
          className="popup__form"
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {btnName}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
