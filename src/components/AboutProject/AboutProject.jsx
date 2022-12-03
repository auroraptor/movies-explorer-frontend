import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__list">
        <div className="about-project__list-item">
          <p className="about-project__description">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__list-item">
          <p className="about-project__description">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__dimensions">
        <div className="about-project__dimensions-item about-project__dimensions_color_green"><p>1 неделя</p></div>
        <div className="about-project__dimensions-item about-project__dimensions_color_grey"><p>4 недели</p></div>
        <div className="about-project__dimensions-item  about-project__dimensions_color_transparent"><p>Back-end</p></div>
        <div className="about-project__dimensions-item  about-project__dimensions_color_transparent"><p>Front-end</p></div>
      </div>
    </div>
  );
} 

export default AboutProject;
