import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardPreview, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const canLike = card.likes.some((like) => like._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handlePreviewClick() {
    onCardPreview(card);
  }

  function handleDeleteClick(e) {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        src={card.link}
        alt="изображение"
        className="element__photo"
        onClick={handlePreviewClick}
      />
      <button
        type="button"
        aria-label="delete"
        className="element__delete-button"
        onClick={handleDeleteClick}
        style={{ display: isOwn ? "block" : "none" }}
      ></button>
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button
            type="button"
            aria-label="like"
            className={
              "element__like-button " +
              (canLike && "element__like-button_active")
            }
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
