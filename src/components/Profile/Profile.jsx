import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Profile.css";

function Profile({ name = "useR", email= "love@eda.jp" }) {
  const firstName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="profile">
      <header className="profile__header">
        <Logo></Logo>
        <HamburgerMenu></HamburgerMenu>
      </header>
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
      <div className="profile__control">
        <button className="profile__button_edit" type="button">
        Редактировать
        </button>
          <Link to="/signout" className="profile__link">
          Выйти из аккаунта
          </Link>
      </div>
    </div>
  );
}

export default Profile;
