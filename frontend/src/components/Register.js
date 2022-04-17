import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({email, password});
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="form login__form form_role_register"
        name="register"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          className="login__input form__input_email form__input_field_email"
          type="text"
          id="form__register-email"
          name="register-email"
          minLength="2"
          maxLength="40"
          value={email || ""}
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
        <span id="form__login-email-error" className="form__input-error"></span>

        <input
          className="login__input form__input_password form__input_field_password"
          type="password"
          id="form__register-password"
          name="register-password"
          minLength="2"
          maxLength="200"
          value={password || ""}
          placeholder="Пароль"
          onChange={handlePasswordChange}
          required
        />
        <span
          id="form__profile-description-error"
          className="form__input-error"
        ></span>

        <button type="submit" className="button login__button">
          Зарегистрироваться
        </button>
        <span className="login__text">
          Уже зарегистрированы?{" "}
          <Link className="login__link" to="sign-in">
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
