import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://auroraptor.github.io/how-to-learn/" className="portfolio__link">
            <p className="portfolio__link_text">Статичный сайт</p>
            <div className="portfolio__link_icon"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://auroraptor.github.io/russian-travel/" className="portfolio__link">
            <p className="portfolio__link_text">Адаптивный сайт</p>
            <div className="portfolio__link_icon"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://auro.nomoredomains.icu/" className="portfolio__link">
            <p className="portfolio__link_text">
              Одностраничное приложение
            </p>{" "}
            <div className="portfolio__link_icon"></div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
