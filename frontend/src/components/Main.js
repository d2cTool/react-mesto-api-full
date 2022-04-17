import Card from "./Card";
import Profile from "./Profile";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <Profile
        userInfo={currentUser}
        handleAvatarClick={props.onEditAvatar}
        handleProfileClick={props.onEditProfile}
        handleAddCardClick={props.onAddCard}
      />
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardPreview={props.onPreview}
            onCardLike={props.onLike}
            onCardDelete={props.onDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
