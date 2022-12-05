import "./MoviesCard.css";

function MoviesCard({icon}) {
  return (
    <div className="movies-card">
      <img
        src={require('../../images/thumbnail.jpg')}
        alt="Миниатюрное изображение постера к фильму"
        className="movies-card__thumbnail"
      ></img>
      <div className="movies-card__container">
        <p className="movies-card__name">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dapibus finibus ultricies. Quisque hendrerit sit amet elit et placerat. Nulla dapibus, sapien eu consequat blandit, justo sapien tempus risus, nec tempor justo lectus at nibh. Cras condimentum metus et finibus fringilla. Quisque sed purus eget turpis suscipit fermentum. Suspendisse ac purus et sapien suscipit scelerisque et id felis. Nulla tincidunt augue nec erat efficitur, in ultricies velit fringilla.</p>
        <button type="button" name="like" id="like" className={icon}></button>
      </div>

      <p className="movies-card__duration">111</p>
    </div>
  );
}

export default MoviesCard;
