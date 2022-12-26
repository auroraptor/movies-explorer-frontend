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
  const { isClickMenu, handleMenu, movies, loadMore, children } = props;
  const [like, setLike] = useState("♥︎");

  const handleLike = () => {
    alert(like);
    setLike(like === "♥︎" ? "♡" : "♥︎");
  };

  const toLocaleDurationString = (minutes) => {
    const hh = Math.floor(minutes / 60);
    const mm = Math.floor(minutes % 60);

    return `${hh > 0 ? (hh + 'ч ') : ''}${mm + 'м'}`;
  } 

  const cards = movies?.items?.slice(0, movies?.visible).map((item, index) => (
    <MoviesCard
      key={index}
      icon={`movies-card__button movies-card__button_like`}
      ariaLabel="Нравится"
      onClick={handleLike}
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
      { children }
      <MoviesCardList>
        {cards}
        <li>
          <p className={`movies-card-list__container movies-card-list__container_empty ${cards.length > 0 && 'movies-card-list__container_empty_hidden'}`}>
            Без результатов поиска
          </p>
        </li>
      </MoviesCardList>
      {movies?.visible < movies?.items?.length && <MoviesLoadMore loadMore={loadMore}/>}
      <Footer></Footer>
    </div>
  );
}

export default Movies;
