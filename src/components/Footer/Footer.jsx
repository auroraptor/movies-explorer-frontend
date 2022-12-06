import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <h5 className="footer__collab">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
      <a href="https://practicum.yandex.ru/" className="footer__link footer__link_practicum">Яндекс.Практикум</a>
      <a href="https://github.com/auroraptor/movies-explorer-frontend/" className="footer__link footer__link_github">Github</a>
      <p className="footer__copyright">©2020</p>
    </div>
  );
}

export default Footer;