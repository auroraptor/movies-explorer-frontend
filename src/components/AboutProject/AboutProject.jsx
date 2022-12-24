import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <dl className="about-project__description">
        <dt className="about-project__text about-project__text_type_key">
          Дипломный проект включал 5 этапов
        </dt>
        <dd className="about-project__text about-project__text_type_value about-project__text_order_first">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </dd>
        <dt className="about-project__text about-project__text_type_key about-project__text_margin-top">
          На выполнение диплома ушло 5 недель
        </dt>
        <dd className="about-project__text about-project__text_type_value about-project__text_order_second">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </dd>
      </dl>
      <div className="about-project__progress">
        <div className="about-project__progress-bar about-project__progress-bar_color_green">
          <p className="about-project__timestamps about-project__timestamps_week">1 неделя</p>
        </div>
        <div className="about-project__progress-bar about-project__progress-bar_color_grey">
          <p className="about-project__timestamps about-project__timestamps_week">4 недели</p>
        </div>
        <div className="about-project__progress-bar about-project__progress-bar_color_transparent">
          <p className="about-project__timestamps about-project__timestamps_help-text">Back-end</p>
        </div>
        <div className="about-project__progress-bar about-project__progress-bar_color_transparent">
          <p className="about-project__timestamps about-project__timestamps_help-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
