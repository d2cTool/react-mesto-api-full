import logo from "../images/logo.svg";
import React from "react";
import { Route, Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, email }) {
  function handleLogout() {
    onLogout();
  }

  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="логотип" className="header__logo" />
        <div className="header__button-container">
          {isLoggedIn && (
            <>
              <span className="header__email">{email}</span>
              <button
                className="header__logout-button header__link"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          )}
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </Route>
        </div>
      </div>
    </header>
  );
}

export default Header;
