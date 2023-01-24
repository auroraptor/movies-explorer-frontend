import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h4 className="about-me__title">Студент</h4>
      <div className="about-me__container">
        <img src={require('../../images/princess.jpg')} alt="Фото студента" className="about-me__item about-me__photo"></img>
        <div className="about-me__item">
        <div className="about-me__description">
          <p className="about-me__name">Аврора Ренард</p>
          <p className="about-me__subtitle">Front-End Developer</p>
          <p className="about-me__text">Создаю интерфейсы, которые сокращают дистанцию между пользователем и его целью. Умею вносить вклад в командную работу высокой степенью сотрудничества, находить решения и определять степень удовлетворенности клиентов. С гордостью запустила <a href="https://codepen.io/collection/yrMpwK" className="about-me__link-club">книжный клуб</a> для программистов и любопытствующих.</p>
          
        </div>
        <a target="_blank" href="https://github.com/auroraptor" className="about-me__link">Github</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;