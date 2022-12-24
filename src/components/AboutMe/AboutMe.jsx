import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h4 className="about-me__title">Студент</h4>
      <div className="about-me__container">
        <img src={require('../../images/generated-image-phni7h.jpg')} alt="Фото студента" className="about-me__item about-me__photo"></img>
        <div className="about-me__item">
        <div className="about-me__description">
          <p className="about-me__name">Lorem ipsum</p>
          <p className="about-me__subtitle">Lorem ipsum dolor sit amet</p>
          <p className="about-me__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis odio ut elit auctor pharetra sed vestibulum erat. Mauris hendrerit velit magna, eget molestie sem aliquam vitae. Vestibulum vitae quam in nunc maximus scelerisque. Sed auctor suscipit convallis. Phasellus id dui ante. Nullam malesuada felis ac sapien porta, nec placerat eros convallis. Proin eget enim dictum ante fringilla porttitor non eget ipsum.</p>
          
        </div>
        <a target="_blank" href="https://github.com/auroraptor" className="about-me__link">Github</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;