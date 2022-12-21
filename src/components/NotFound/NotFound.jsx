import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <article className="not-found-page">
      <div className="not-found-page__container">
        {" "}
        <p className="not-found-page__text">404</p>
        <p className="not-found-page__message">Страница не найдена</p>
      </div>

      <Link className="not-found-page__link" to="/">
        Назад
      </Link>
    </article>
  );
}

export default NotFound;
