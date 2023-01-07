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

function Profile({ isClickMenu, handleMenu, user, onLogout, onUpdateUser }) {
  const firstName =
    user?.name[0]?.toUpperCase() + user?.name?.slice(1).toLowerCase();

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: name,
      email: email,
    },
  });

  console.log("IS VALID", isValid);
  console.log(watch("name"));

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const onSubmit = (data) => {
    onUpdateUser(data);
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
        >{`Привет, ${firstName}!`}</label>
        <ul className="profile__user">
          <li className="profile__info">
            <label className="profile__text">
              Имя
              <input
                autoComplete="off"
                type="text"
                className="profile__input"
                aria-invalid={errors.name ? "true" : "false"}
                placeholder={name}
                {...register("name", {
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
                  name="name"
                  message={"name"}
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
                autoComplete="off"
                type="email"
                className="profile__input"
                aria-invalid={errors.email ? "true" : "false"}
                placeholder={email}
                {...register("email", {
                  validate: (value) =>
                    !!value.match(VALID_EMAIL_REGEX) ||
                    "email не соответствует шаблону электронной почты",
                })}
              ></input>
            </label>
          </li>
          <li>
            <span className="input-group__error-message">
              <ErrorMessage
                errors={errors}
                name="email"
                message={"email"}
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
            disabled={!isValid}
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
