import "./Techs.css";

function Techs() {
  return (
    <article className="techs" id="techs">
      <h3 className="techs__title">Технологии</h3>
      <p className="techs__description">7 технологий</p>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__container">
        <div className="techs__item">
          <p className="techs__content">HTML</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">CSS</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">JS</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">React</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">Git</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">Express.js</p>
        </div>
        <div className="techs__item">
          <p className="techs__content">mongoDB</p>
        </div>
      </div>
    </article>
  );
}

export default Techs;
