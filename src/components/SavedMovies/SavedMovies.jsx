import Header from "../Header/Header";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies({isClickMenu, handleMenu}) {

  const items = [...Array(8)].map((item, index) => (<MoviesCard
    key={index}
    icon={"movies-card__button movies-card__button_remove"}
    ariaLabel="Удалить"
    onClick={() => console.log("remove")}
    buttonName="remove"
  ></MoviesCard>))

  return (
    <div className="saved-movies">
      <Header className={"header"} click={isClickMenu}>
        <HamburgerMenu click={isClickMenu} handleMenu={handleMenu}></HamburgerMenu>
        <Navigation className={`menu menu_desktop ${isClickMenu && "menu_active"}`} handleMenu={handleMenu}/>
      </Header>
      <SearchForm></SearchForm>
      <MoviesCardList>
        {items}
      </MoviesCardList>
      <MoviesLoadMore></MoviesLoadMore>
      <Footer></Footer>
    </div>
  );
}

export default SavedMovies;
