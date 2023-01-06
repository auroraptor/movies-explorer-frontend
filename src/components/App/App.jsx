import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import getBeatfilmMovies from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import useWindowSize from "../../hooks/useWindowSize";
import {
  createMovie,
  deleteMovie,
  getCurrentUser,
  getMovies,
  signinUser,
  signoutUser,
  signupUser,
  updateCurrentUser,
} from "../../utils/MainApi";

function App() {
  const [isClickMenu, setClickMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingMoviesResult, setSearchingMoviesResult] = useState({
    movies: [],
    visible: 0,
    error: false,
  });
  const [savedMovies, setSavedMovies] = useState({
    movies: [],
    visible: 0,
    error: false,
  });
  const [cardListHelpText, setCardListHelpText] = useState(
    "Введите ключевое слово"
  );
  const [placeholder, setPlaceholder] = useState("Фильм");
  const [isCheked, setChecked] = useState(false);

  const windowSize = useWindowSize();
  const { width } = windowSize;
  const visible = width > 980 ? 12 : width > 520 ? 8 : 5;
  const loadCount = width > 980 ? 3 : 2;
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  let path = useParams();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        navigate(path);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setSearchingMoviesResult((prev) => ({
        ...prev,
        movies: JSON.parse(localStorage.getItem("movies")),
        visible: visible,
      }));
      setPlaceholder(localStorage.getItem("search"));
      setChecked(JSON.parse(localStorage.getItem("isShortFilm")));
    }
  }, [visible]);

  useEffect(() => {
    if (!loggedIn) return;

    Promise.all([getCurrentUser(), getMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies((prev) => ({
          ...prev,
          movies: movies,
          visible: visible,
        }));
      })
      .catch((err) => console.log(err));
  }, [loggedIn, visible]);

  const handleRegister = (data) => {
    signupUser(data)
      .then((res) => navigate("signin"))
      .catch((err) => console.log(err));
  };

  const handleLogin = (data) => {
    signinUser(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("movies");
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    signoutUser()
      .then(() => {
        setCurrentUser({ name: "", email: "" });
        localStorage.removeItem("movies");
        localStorage.removeItem("search");
        localStorage.removeItem("isShortFilm");
        setLoggedIn(false);
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (data) => {
    updateCurrentUser(data)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err.statusCode));
  };

  const handleSavedMovie = (movie) => {
    const savedMovie = savedMovies?.movies?.find((m) => m.movieId === movie.id);

    if (savedMovie) {
      deleteMovie(savedMovie)
        .then((res) => {
          setSavedMovies((prev) => ({
            ...prev,
            movies: savedMovies.movies.filter((m) => m.id !== savedMovie.id),
          }));
        })
        .catch((err) => console.log(err));
    } else {
      createMovie(movie)
        .then((res) =>
          setSavedMovies((prev) => ({
            ...prev,
            movies: savedMovies.movies.concat(res),
          }))
        )
        .catch((err) => console.log(err));
    }
  };

  const loadMore = () => {
    setSearchingMoviesResult((prev) => ({
      ...prev,
      visible: prev.visible + loadCount,
    }));
  };

  const loadMoreSavedMovies = () => {
    setSavedMovies((prev) => ({
      ...prev,
      visible: prev.visible + loadCount,
    }));
  };

  const handleMenu = () => {
    setClickMenu(!isClickMenu);
  };

  const matched = (str, match) =>
    str.toLowerCase().includes(match.toLowerCase());

  const handleSearch = (formValues) => {
    setCardListHelpText("");
    setIsLoading(true);

    const { search, checked } = formValues;

    getBeatfilmMovies()
      .then((movies) => {
        if (checked) {
          movies = movies.filter(({ duration }) => duration <= 40);
        }

        movies = movies.filter(
          ({ nameEN, nameRU }) =>
            matched(nameRU, search) || matched(nameEN, search)
        );

        setSearchingMoviesResult((prev) => ({
          ...prev,
          items: movies,
          visible: visible,
        }));

        localStorage.setItem("isShortFilm", checked);
        localStorage.setItem("search", search);
        localStorage.setItem("movies", JSON.stringify(movies));

        setCardListHelpText(
          movies.length > 0 ? "Введите ключевое слово" : "Ничего не найдено"
        );

        return movies;
      })
      .catch((err) => {
        setCardListHelpText(
          "Во время запроса произошла ошибка.\n \n \nВозможно, проблема с соединением или сервер недоступен.\n \n \nПодождите немного и попробуйте ещё раз."
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/"
            element={
              <CurrentUserContext.Provider value={currentUser}>
                <Main isClickMenu={isClickMenu} handleMenu={handleMenu} />
              </CurrentUserContext.Provider>
            }
          ></Route>
          <Route element={<ProtectedRoute onLogin={loggedIn} />}>
            <Route
              path="/movies"
              element={
                <CurrentUserContext.Provider value={currentUser}>
                  <Movies
                    isClickMenu={isClickMenu}
                    handleMenu={handleMenu}
                    movies={searchingMoviesResult}
                    savedMovies={savedMovies}
                    loadMore={loadMore}
                    cardListHelpText={cardListHelpText}
                    handleSavedMovie={handleSavedMovie}
                  >
                    <SearchForm
                      onSearch={handleSearch}
                      placeholderText={placeholder}
                      isChecked={isCheked}
                    />
                    {isLoading && <Preloader />}
                  </Movies>
                </CurrentUserContext.Provider>
              }
            ></Route>
            <Route
              path="/saved-movies"
              element={
                <CurrentUserContext.Provider value={currentUser}>
                  <SavedMovies
                    isClickMenu={isClickMenu}
                    handleMenu={handleMenu}
                    loadMore={loadMoreSavedMovies}
                    savedMovies={savedMovies}
                    handleSavedMovie={handleSavedMovie}
                  >
                    <SearchForm onSearch={handleSearch} />
                    {isLoading && <Preloader />}
                  </SavedMovies>
                </CurrentUserContext.Provider>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <CurrentUserContext.Provider value={currentUser}>
                  <Profile
                    isClickMenu={isClickMenu}
                    handleMenu={handleMenu}
                    onLogout={handleLogout}
                    user={currentUser}
                    onUpdateUser={handleUpdateUser}
                  />
                </CurrentUserContext.Provider>
              }
            ></Route>
          </Route>
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
