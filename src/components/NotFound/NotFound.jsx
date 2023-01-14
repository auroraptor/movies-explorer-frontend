import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);

  return (
    <div className="not-found-page">
      <div className="not-found-page__container">
        {" "}
        <p className="not-found-page__text">404</p>
        <p className="not-found-page__message">Страница не найдена</p>
      </div>
      <button className="not-found-page__button" onClick={handleClick}>
        Назад
      </button>
    </div>
  );
}

export default NotFound;
