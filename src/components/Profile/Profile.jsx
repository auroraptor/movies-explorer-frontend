import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Profile.css";

function Profile({
  isClickMenu,
  handleMenu,
  name = "useR",
  email = "love@eda.jp",
}) {
  const firstName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    <article className="profile">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu
          click={isClickMenu}
          handleMenu={handleMenu}
        ></HamburgerMenu>
        <Navigation className={`menu menu_desktop ${isClickMenu && "menu_active"}`} handleMenu={handleMenu}/>
      </Header>
      <div className="profile__container">
        <div className="profile__info">
          <p className="profile__hello-name">{`Привет, ${firstName}!`}</p>
          <ul className="profile__user">
            <li className="profile__list-item_name profile__list-item">
              <p className="profile__text">Имя</p>
              <p className="profile__text">{firstName}</p>
            </li>
            <li className="profile__list-item_email profile__list-item">
              <p className="profile__text">E-mail</p>
              <p className="profile__text">{email}</p>
            </li>
          </ul>
        </div>
        <div className="profile__settings">
          <button
            className="profile__button profile__button_edit"
            type="button"
            onClick={() => alert("not really button")}
          >
            Редактировать
          </button>
          <Link to="/signin" className="profile__logout">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Profile;
