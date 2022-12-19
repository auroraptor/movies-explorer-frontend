import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h3 className="techs__title">Технологии</h3>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__item">
          <span className="techs__content">HTML</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">CSS</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">JS</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">React</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">Git</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">Exress.js</span>
        </li>
        <li className="techs__item">
          <span className="techs__content">mongoDB</span>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
