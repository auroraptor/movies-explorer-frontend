import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__container">
        {" "}
        <Link to="/" className="navigation__link">
          Главная
        </Link>
        <Link to="/movies" className="navigation__link">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="navigation__link">
          Сохранённые фильмы
        </Link>
      </div>

      <Link to="/profile" className="navigation__link navigation__profile">
        Аккаунт
      </Link>
    </nav>
  );
}

export default Navigation;
