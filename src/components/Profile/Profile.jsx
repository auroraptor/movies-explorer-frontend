import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { VALID_EMAIL_REGEX, VALID_NAME_REGEX } from "../../constants/regex";
import "./Profile.css";

function Profile({ isClickMenu, handleMenu, onLogout, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      profile_name: `${name}`,
      profile_email: `${email}`,
    },
  });

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const onSubmit = (data) => {
    const { profile_name: name, profile_email: email } = data;
    onUpdateUser({ name, email });
  };

  return (
    <article className="profile">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu
          click={isClickMenu}
          handleMenu={handleMenu}
        ></HamburgerMenu>
        {isClickMenu && <div className="background"></div>}
        <Navigation
          className={`menu menu_desktop ${isClickMenu && "menu_active"}`}
          handleMenu={handleMenu}
        />
      </Header>
      <form
        className="profile__form"
        name="profile"
        id="profile"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="profile"
          className="profile__hello-name"
        >{`Привет, ${name}!`}</label>
        <ul className="profile__user">
          <li className="profile__info">
            <label className="profile__text">
              Имя
              <input
                type="text"
                className="profile__input"
                aria-invalid={errors.name ? "true" : "false"}
                placeholder={name}
                {...register("profile_name", {
                  required: "Заполните поле",
                  validate: (value) =>
                    !!value.match(VALID_NAME_REGEX) ||
                    "Только латиница, кириллица, пробел или дефис",
                })}
              ></input>
            </label>
            <span className="profile__error-message">
              {
                <ErrorMessage
                  errors={errors}
                  name="profile_name"
                  message={"profile_name"}
                  render={({ message }) => (
                    <span className="input-group__help-text input-group__error_visible">
                      {message}
                    </span>
                  )}
                />
              }
            </span>
          </li>
          <li>
            <label className="profile__text">
              E-mail
              <input
                type="email"
                className="profile__input"
                aria-invalid={errors.email ? "true" : "false"}
                placeholder={email}
                {...register("profile_email", {
                  required: false,
                  validate: (value) =>
                    !!value.match(VALID_EMAIL_REGEX) ||
                    "Не соответствует шаблону электронной почты",
                })}
              ></input>
            </label>
            <span className="profile__error-message">
              <ErrorMessage
                errors={errors}
                name="profile_email"
                message={"profile_email"}
                render={({ message }) => (
                  <span
                    role="alert"
                    className="input-group__help-text input-group__error_visible"
                  >
                    {message}
                  </span>
                )}
              />
            </span>
          </li>
        </ul>
        <div className="profile__settings">
          <button
            className="profile__button profile__button_edit"
            type="submit"
            disabled={
              !(
                (watch("profile_name") !== name ||
                  watch("profile_email") !== email) &&
                isValid
              )
            }
          >
            Редактировать
          </button>
          <Link to="/signin" onClick={onLogout} className="profile__logout">
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </article>
  );
}

export default Profile;
