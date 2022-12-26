import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import getBeatfilmMovies from "../../utils/MoviesApi";
import "./App.css";
import useWindowSize from "../../hooks/useWindowSize";

function App() {
  const [isClickMenu, setClickMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState({
    items: [],
    visible: 0,
    error: false
  });

  const windowSize = useWindowSize();
  const { width } = windowSize;
  const visible = width > 980 ? 12 : width > 520 ? 8 : 5;

  const loadMore = () => {
    setMovies((prev) => ({ ...prev, visible: prev.visible + visible }))
  };

  const handleMenu = () => {
    setClickMenu(!isClickMenu);
  };

  const matched = (str, match) => str.toLowerCase().includes(match.toLowerCase());

  const handleSearch = (formValues) => {
    setIsLoading(true);

    const { search, shortFilm } = formValues;
    
    getBeatfilmMovies()
      .then((res) => {
        if (shortFilm) {
          res = res.filter(({ duration }) => duration <= 40);
        }

        return res.filter(({ nameEN, nameRU }) => 
          matched(nameRU, search) || matched(nameEN, search)
        );
      })
      .then((movies) => {
        setMovies((prev) => ({ ...prev, items: movies, visible: visible }));
      })
      .catch((err) => {
        console.log(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/movies"
            element={
              <Movies isClickMenu={isClickMenu} handleMenu={handleMenu} movies={movies} loadMore={loadMore}>
                <SearchForm onSearch={handleSearch} />
                {isLoading && <Preloader />}
              </Movies>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <SavedMovies isClickMenu={isClickMenu} handleMenu={handleMenu} loadMore={loadMore}>
                <SearchForm onSearch={handleSearch}/>
                {isLoading && <Preloader />}
              </SavedMovies>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile isClickMenu={isClickMenu} handleMenu={handleMenu} />
            }
          ></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
