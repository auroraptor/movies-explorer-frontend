import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import { toLocaleDuration } from "../../utils/toLocaleDuration";

function SavedMovies(props) {
  const { isClickMenu, handleMenu, children, savedMovies, handleSavedMovie, loadMore } =
    props;

  const handleLike = (movie) => {
    handleSavedMovie(movie);
  };

  const cards = savedMovies?.movies
    ?.slice(0, savedMovies?.visible)
    .map((movie) => (
      <MoviesCard
        key={movie?.id}
        movie={movie}
        icon={`movies-card__button movies-card__button_remove`}
        ariaLabel="Удалить"
        onMovieClick={handleLike}
        buttonName="delete"
        nameEN={movie?.nameEN}
        nameRU={movie?.nameRU}
        duration={toLocaleDuration(movie?.duration)}
        thumbnail={movie?.image}
        savedMovies={savedMovies}
      ></MoviesCard>
    ));

    console.log('CARDS', cards);

  return (
    <section className="saved-movies">
      <Header className={"header"} click={isClickMenu}>
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
      <MoviesCardList cardListHelpText={'Все понравившиеся фильмы будут здесь'}>{cards || ''}</MoviesCardList>
      {savedMovies?.visible < savedMovies?.movies?.length && (
        <MoviesLoadMore loadMore={loadMore} />
      )}
      <Footer></Footer>
    </section>
  );
}

export default SavedMovies;
