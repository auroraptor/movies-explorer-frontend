import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Profile.css";

function Profile({ isClickMenu, handleMenu, user, onLogout, onUpdateUser }) {
  const firstName =
    user?.name[0]?.toUpperCase() + user?.name?.slice(1).toLowerCase();

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }


  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({name, email})
    alert('SUBMIT!');
  }

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
      <form className="profile__form" name="profile" id="profile" onSubmit={handleSubmit}>
        <label
          htmlFor="profile"
          className="profile__hello-name"
        >{`Привет, ${firstName}!`}</label>
        <ul className="profile__user">
          <li>
            <label className="profile__text profile__text_border">
              Имя
              <input type="text" className="profile__input" value={name} onChange={handleNameChange} />
            </label>
          </li>

          <li>
            <label className="profile__text">
              E-mail
              <input
                type="text"
                className="profile__input"
                value={email} onChange={handleEmailChange}
              />
            </label>
          </li>
        </ul>
        <div className="profile__settings">
          <button
            className="profile__button profile__button_edit"
            type="submit"
            disabled={false}
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
