import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h6 className="footer__collab">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h6>
      <div className="footer__container">
        <div className="footer__list">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://practicum.yandex.ru/"
            className="footer__link footer__link_practicum"
          >
            Яндекс.Практикум
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/auroraptor/movies-explorer-frontend/"
            className="footer__link footer__link_github"
          >
            Github
          </a>
        </div>
        <p className="footer__copyright">©2023</p>
      </div>
    </footer>
  );
}

export default Footer;
