import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Profile.css";

function Profile({ isClickMenu, handleMenu, user, onLogout }) {
  const firstName =
    user?.name[0]?.toUpperCase() + user?.name?.slice(1).toLowerCase();

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
      <form className="profile__form" name="profile" id="profile">
        <label
          for="profile"
          className="profile__hello-name"
        >{`Привет, ${firstName}!`}</label>
        <ul className="profile__user">
          <li>
            <label className="profile__text profile__text_border">
              Имя
              <input type="text" className="profile__input" value={firstName} />
            </label>
          </li>

          <li>
            <label className="profile__text">
              E-mail
              <input
                type="text"
                className="profile__input"
                value={user?.email}
              />
            </label>
          </li>
        </ul>
        <div className="profile__settings">
          <button
            className="profile__button profile__button_edit"
            type="button"
            onClick={() => alert("not really button")} disabled={true}
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
