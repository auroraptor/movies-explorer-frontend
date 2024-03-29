import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { toLocaleDuration } from "../../utils/toLocaleDuration";
import { useState } from "react";
import { filter, filterShortFilm } from "../../utils/filterResult";
import { useEffect } from "react";

function SavedMovies(props) {
  const { isClickMenu, handleMenu, savedMovies, handleSavedMovie } = props;

  useEffect(() => {
    setShowMovies(JSON.parse(localStorage.getItem("savedMovies")));
  }, [savedMovies]);

  const [showMovies, setShowMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies"))
  );

  const handleDelete = (movie) => {
    handleSavedMovie(movie);
  };

  const handleSearch = (formValues) => {
    setShowMovies(filter(savedMovies?.movies, formValues));
  };

  const handleFilter = (onFilter) => {
    onFilter
      ? setShowMovies(JSON.parse(localStorage.getItem("savedMovies")))
      : setShowMovies(filterShortFilm(showMovies));
  };

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
      <SearchForm
        placeholderText={"Фильм"}
        onSearch={handleSearch}
        isChecked={false}
        onFilter={handleFilter}
      />
      <MoviesCardList cardListHelpText={"Все понравившиеся фильмы будут здесь"}>
        {showMovies.map((movie) => (
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
