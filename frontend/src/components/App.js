import "../index.css";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmationPopup from "./ConfirmationPopup";

import { api } from "../utils/Api";
import * as auth from "../utils/Auth";

import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.length > 0 && card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirmanion(card) {
    setIsConfirmationPopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardDelete() {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardToDelete._id));
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closePopups() {
    setSelectedCard({});
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoPopupOpen(false);
  }

  function handlePreviewClick(card) {
    setSelectedCard(card);
  }

  function handleUserInfoUpdate({ name, about }) {
    api
      .patchUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAvatarUpdate(avatar) {
    api
      .patchUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace({ name, link }) {
    api
      .postCard(name, link)
      .then((data) => {
        setCards([data, ...cards]);
        closePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister({password, email}) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.message) {
          setIsSuccess(false);
          setIsInfoPopupOpen(true);
          return;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      });
  }

  function handleOnLogout() {
    setIsLoggedIn(false);
    setUserEmail('');
    history.push("/sign-in");
    localStorage.removeItem('token');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.email);
          history.push("/");
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            isLoggedIn={isLoggedIn}
            onLogout={handleOnLogout}
            email={userEmail}
          />

          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute path="/" loggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddPlaceClick}
                onPreview={handlePreviewClick}
                onLike={handleCardLike}
                onDelete={handleCardDeleteConfirmanion}
              />
            </ProtectedRoute>
          </Switch>

          {isLoggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onUpdateUser={handleUserInfoUpdate}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onUpdateAvatar={handleAvatarUpdate}
          />
          <ImagePopup card={selectedCard} onClose={closePopups} />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closePopups}
            onConfirm={handleCardDelete}
          />
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            isSuccess={isSuccess}
            onClose={closePopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
