import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="menu">
      <div className="menu__container">
        <NavLink to="/" activeClassName="menu__link_active" className="menu__link menu__link_main">
          Главная
        </NavLink>
        <NavLink to="/movies" activeClassName="menu__link_active" className="menu__link menu__link_active">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies"  activeClassName="menu__link_active" className="menu__link">
          Сохранённые фильмы
        </NavLink>
      </div>

      <NavLink to="/profile" className="menu__link menu__profile">
       <div className="menu__profile_container">
        <div className="menu__profile_type_icon"></div>
        <p className="menu__profile_type_text">Аккаунт</p>
       </div>
      </NavLink>
    </nav>
  );
}

export default Navigation;
