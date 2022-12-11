import { Link } from "react-router-dom";
import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Profile.css";

function Profile({ isClickMenu, handleMenu, name = "useR", email = "love@eda.jp" }) {
  const firstName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="profile">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu click={isClickMenu} handleMenu={handleMenu}></HamburgerMenu>
      </Header>
      <div className="profile__container">
        <p className="profile__hello-name">{`Привет, ${firstName}!`}</p>
        <div className="profile__user-info">
          <div className="profile__user-info_name">
            <p className="profile__user-info_text">Имя</p>
            <p className="profile__user-info_text">{firstName}</p>
          </div>
          <div className="profile__user-info_email">
            <p className="profile__user-info_text">E-mail</p>
            <p className="profile__user-info_text">{email}</p>
          </div>
        </div>
      </div>
      <div className="profile_managment">
        <button className="profile__button_edit" type="button">
          Редактировать
        </button>
        <Link to="/signin" className="profile__logout">
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
}

export default Profile;
