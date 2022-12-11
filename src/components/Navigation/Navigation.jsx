import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({className, handleMenu}) {
  return (
    <nav className={className}>
      <div className="menu__container">
        <NavLink to="/" className="menu__link menu__link_main" onClick={handleMenu}>
          Главная
        </NavLink>
        <NavLink to="/movies" className="menu__link" onClick={handleMenu}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies"  className="menu__link" onClick={handleMenu}>
          Сохранённые фильмы
        </NavLink>
      </div>

      
       <div className="menu__profile_container">
       <NavLink to="/profile" className="menu__link menu__link_profile menu__profile menu__profile_active" onClick={handleMenu}>
        <div className="menu__profile_type_icon"></div>
        <p className="menu__profile_type_text">Аккаунт</p>
      </NavLink>
      </div>

    </nav>
  );
}

export default Navigation;
