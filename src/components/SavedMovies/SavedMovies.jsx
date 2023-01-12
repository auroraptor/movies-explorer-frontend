import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { toLocaleDuration } from "../../utils/toLocaleDuration";

function SavedMovies(props) {
  const {
    isClickMenu,
    handleMenu,
    savedMovies,
    handleSavedMovie,
    onSearch,
    onFilter
  } = props;

  const handleDelete = (movie) => {
    handleSavedMovie(movie);
  };

  const handleSearch = (formValues) => {
    onSearch(formValues);
  }

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
      <SearchForm placeholderText={"Фильм"} onSearch={handleSearch} isChecked={false} onFilter={onFilter}/>
      <MoviesCardList cardListHelpText={"Все понравившиеся фильмы будут здесь"}>
        {savedMovies?.movies.map((movie) => (
          <MoviesCard
            key={movie?.id}
            movie={movie}
            icon={`movies-card__button movies-card__button_remove`}
            ariaLabel="Удалить"
            onMovieClick={handleDelete}
            buttonName="delete"
            nameEN={movie?.nameEN}
            nameRU={movie?.nameRU}
            trailerLink={movie?.trailerLink}
            duration={toLocaleDuration(movie?.duration)}
            thumbnail={movie?.image}
            savedMovies={savedMovies}
          ></MoviesCard>
        ))}
      </MoviesCardList>
      <Footer></Footer>
    </section>
  );
}

export default SavedMovies;
