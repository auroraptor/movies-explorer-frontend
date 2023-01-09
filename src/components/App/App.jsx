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
import { displayItemsPerPage, displayNextItems } from "../../constants";
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
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClickMenu, setClickMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Фильм");
  const [isCheked, setChecked] = useState(false);
  const [searchResult, setSearchResult] = useState({
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
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Что-то пошло не так');
  const windowWidth = useWindowSize().width;
  const numberOfItemsPerPage = displayItemsPerPage(windowWidth);
  const numberOfNextItems = displayNextItems(windowWidth);
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
      setSearchResult((prev) => ({
        ...prev,
        movies: JSON.parse(localStorage.getItem("movies")),
        visible: numberOfItemsPerPage,
      }));
      setPlaceholder(localStorage.getItem("search"));
      setChecked(JSON.parse(localStorage.getItem("isShortFilm")));
    }
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    if (!loggedIn) return;

    Promise.all([getCurrentUser(), getMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies((prev) => ({
          ...prev,
          movies: movies,
          visible: numberOfItemsPerPage,
        }));
      })
      .catch((err) => console.log(err));
  }, [loggedIn, numberOfItemsPerPage]);

  const handleRegister = (data) => {
    signupUser(data)
      .then((res) => {
        navigate("signin");
        setSuccess(true);
      })
      .catch((err) => {
        setErrorMessage(err);
        setSuccess(false);
      });
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

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie)
        .then((res) => {
          setSavedMovies((prev) => ({
            ...prev,
            movies: savedMovies.movies.filter((m) => m.movieId !== movie.movieId),
          }));
        })
        .catch((err) => console.log(err));
  }

  const handleSavedMovie = (movie) => {
    const savedMovie = savedMovies?.movies?.find((m) => m.movieId === movie.id);

    if (savedMovie) {
      deleteMovie(savedMovie)
        .then((res) => {
          setSavedMovies((prev) => ({
            ...prev,
            movies: savedMovies.movies.filter((m) => m.movieId !== movie.id),
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

  const loadMoreSearchResults = () => {
    setSearchResult((prev) => ({
      ...prev,
      visible: prev.visible + numberOfNextItems,
    }));
  };

  const loadMoreSavedMovies = () => {
    setSavedMovies((prev) => ({
      ...prev,
      visible: prev.visible + numberOfNextItems,
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

        setSearchResult((prev) => ({
          ...prev,
          movies: movies,
          visible: numberOfItemsPerPage,
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
                    searchResult={searchResult}
                    savedMovies={savedMovies}
                    loadMore={loadMoreSearchResults}
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
                    handleSavedMovie={handleDeleteMovie}
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
            element={<Register onRegister={handleRegister} errorMessage={errorMessage} success={success} />}
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
