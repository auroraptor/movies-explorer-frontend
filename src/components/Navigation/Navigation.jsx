import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({className}) {
  return (
    <nav className={className}>
      <div className="menu__container">
        <NavLink to="/" className="menu__link menu__link_main">
          Главная
        </NavLink>
        <NavLink to="/movies" className="menu__link">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies"  className="menu__link">
          Сохранённые фильмы
        </NavLink>
      </div>

      
       <div className="menu__profile_container">
       <NavLink to="/profile" className="menu__link menu__link_profile menu__profile menu__profile_active">
        <div className="menu__profile_type_icon"></div>
        <p className="menu__profile_type_text">Аккаунт</p>
      </NavLink>
      </div>

    </nav>
  );
}

export default Navigation;
