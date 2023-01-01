import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Navigation from "../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoadMore from "../MoviesLoadMore/MoviesLoadMore";
import Footer from "../Footer/Footer";

import "./Movies.css";
import Header from "../Header/Header";

function Movies(props) {
  const {
    isClickMenu,
    handleMenu,
    movies,
    loadMore,
    children,
    cardListHelpText,
    handleSavedMovie
  } = props;
  const [isLiked, setLiked] = useState(false);

  const handleLike = (movie) => {
    handleSavedMovie(movie);
    setLiked(!isLiked);
  };

  const toLocaleDurationString = (minutes) => {
    const hh = Math.floor(minutes / 60);
    const mm = Math.floor(minutes % 60);

    return `${hh > 0 ? hh + "ч " : ""}${mm + "м"}`;
  };

  const cards = movies?.items?.slice(0, movies?.visible).map((item, index) => (
    <MoviesCard
      key={index}
      movie={item}
      icon={`movies-card__button movies-card__button_like`}
      isLiked={isLiked}
      ariaLabel="Нравится"
      onMovieClick={handleLike}
      buttonName="like"
      nameEN={item?.nameEN}
      nameRU={item?.nameRU}
      duration={toLocaleDurationString(item?.duration)}
      thumbnail={`https://api.nomoreparties.co/${item?.image.url}`}
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
      {movies?.visible < movies?.items?.length && (
        <MoviesLoadMore loadMore={loadMore} />
      )}
      <Footer></Footer>
    </div>
  );
}

export default Movies;
