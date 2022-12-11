import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies({isClickMenu, handleMenu}) {
  return (
    <div className="saved-movies">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu click={isClickMenu} handleMenu={handleMenu}></HamburgerMenu>
      </Header>
      <SearchForm></SearchForm>
      <MoviesCardList>
        <MoviesCard
          icon={"movies-card__button movies-card__button_remove"}
          ariaLabel="Удалить"
          onClick={() => console.log("remove")}
          buttonName="remove"
        ></MoviesCard>
        <MoviesCard
          icon={"movies-card__button movies-card__button_remove"}
          ariaLabel="Удалить"
          onClick={() => console.log("remove")}
          buttonName="remove"
        ></MoviesCard>
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
    </div>
  );
}

export default SavedMovies;
