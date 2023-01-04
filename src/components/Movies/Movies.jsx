import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import { toLocaleDuration } from "../../utils/toLocaleDuration";

function Movies(props) {
  const {
    isClickMenu,
    handleMenu,
    movies,
    loadMore,
    children,
    cardListHelpText,
    handleSavedMovie, 
    savedMovies,
  } = props;

  const handleLike = (movie) => {
    handleSavedMovie(movie);
  };

  const cards = movies?.movies?.slice(0, movies?.visible).map((movie) => (
    <MoviesCard
      key={movie?.id}
      movie={movie}
      icon={`movies-card__button movies-card__button_like`}
      ariaLabel="Нравится"
      onMovieClick={handleLike}
      buttonName="like"
      nameEN={movie?.nameEN}
      nameRU={movie?.nameRU}
      duration={toLocaleDuration(movie?.duration)}
      thumbnail={`https://api.nomoreparties.co/${movie?.image.url}`}
      savedMovies={savedMovies}
    ></MoviesCard>
  ));

  return (
    <div className="movies">
      <Header className={"header"}>
        <HamburgerMenu
          click={isClickMenu}
          handleMenu={handleMenu}
        ></HamburgerMenu>
        {isClickMenu && <div className="background"></div>}
        <Navigation
          className={`menu menu_desktop ${isClickMenu && "menu_active"}`}
          handleMenu={handleMenu}
        />
      </Header>
      {children}
      <MoviesCardList cardListHelpText={cardListHelpText}>
        {cards}
      </MoviesCardList>
      {movies?.visible < movies?.movies?.length && (
        <MoviesLoadMore loadMore={loadMore} />
      )}
      <Footer></Footer>
    </div>
  );
}

export default Movies;
