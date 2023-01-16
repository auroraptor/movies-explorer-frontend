import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { MOVIES_API } from "../../constants/Api";
import "./Movies.css";
import { toLocaleDuration } from "../../utils/toLocaleDuration";

function Movies(props) {
  const {
    isClickMenu,
    handleMenu,
    searchResult,
    loadMore,
    children,
    cardListHelpText,
    handleSavedMovie,
    savedMovies,
  } = props;

  const handleLike = (movie) => {
    handleSavedMovie(movie);
  };

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
        {searchResult?.movies?.slice(0, searchResult?.visible).map((movie) => (
          <MoviesCard
            key={movie?.id}
            movie={movie}
            icon={`movies-card__button movies-card__button_like`}
            ariaLabel="Нравится"
            onMovieClick={handleLike}
            buttonName="like"
            nameEN={movie?.nameEN}
            nameRU={movie?.nameRU}
            trailerLink={movie?.trailerLink}
            duration={toLocaleDuration(movie?.duration)}
            thumbnail={`${MOVIES_API}${movie?.image.url}`}
            savedMovies={savedMovies}
          ></MoviesCard>
        ))}
      </MoviesCardList>
      {searchResult?.visible < searchResult?.movies?.length && (
        <MoviesLoadMore loadMore={loadMore} />
      )}
      <Footer></Footer>
    </div>
  );
}

export default Movies;
