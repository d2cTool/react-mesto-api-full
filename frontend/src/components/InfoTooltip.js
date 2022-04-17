import React from "react";
import successImg from "../images/success.svg";
import failImg from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  function handleCloseInfoTooltip() {
    onClose(isSuccess);
  }

  return (
    <section
      className={'popup ' + (isOpen && "popup_opened")}
    >
      <div className="popup__container popup__container_type_tooltip">
        <button
          onClick={handleCloseInfoTooltip}
          type="button"
          className="popup__close-button"
          aria-label="close"
        ></button>
        <img
          className="popup__image"
          src={isSuccess ? successImg : failImg}
          alt="registration result img"
        />
        <h2 className="popup__title popup__title_tooltip ">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
