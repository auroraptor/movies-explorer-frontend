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
import { filter, filterShortFilm } from "../../utils/filterResult";
import { displayItemsPerPage, displayNextItems } from "../../constants";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
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
  const [errorMessageRegister, setErrorMessageRegister] = useState(null);
  const [errorMessageLogin, setErrorMessageLogin] = useState(null);
  const [errorMessageProfile, setErrorMessageProfile] = useState(null);
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
        movies: filter(JSON.parse(localStorage.getItem("movies")), {
          search: localStorage.getItem("search"),
          checked: JSON.parse(localStorage.getItem("isShortFilm")),
        }),
        visible: numberOfItemsPerPage,
      }));

      setPlaceholder(localStorage.getItem("search"));
      setChecked(JSON.parse(localStorage.getItem("isShortFilm")) || false);
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
        localStorage.setItem('savedMovies', JSON.stringify(movies));
      })
      .catch((err) => console.log(err));
  }, [loggedIn, numberOfItemsPerPage]);

  useEffect(() => {
    setCardListHelpText(
      searchResult.movies.length > 0
        ? "Введите ключевое слово"
        : "Ничего не найдено"
    );
  }, [searchResult])

  const handleRegister = (data) => {
    const { email, password } = data;

    signupUser(data)
      .then((res) => {
        handleLogin({ email, password });
        navigate("movies");
        setErrorMessageRegister(null);
      })
      .catch((err) => {
        setErrorMessageRegister("Что-то пошло не так...");
      });
  };

  const handleLogin = (data) => {
    signinUser(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("movies");
        setErrorMessageLogin(null);
      })
      .catch((err) => {
        err === HttpStatusCode.UNAUTHORIZED
          ? setErrorMessageLogin("Неправильные почта или пароль")
          : setErrorMessageLogin(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
            );
      });
  };

  const handleLogout = () => {
    signoutUser()
      .then(() => {
        setCurrentUser({ name: "", email: "" });
        localStorage.removeItem("movies");
        localStorage.removeItem("search");
        localStorage.removeItem("isShortFilm");
        localStorage.removeItem("savedMovies");
        setLoggedIn(false);
        navigate("/");
        setErrorMessageProfile(null);
      })
      .catch((err) => {
        setErrorMessageProfile(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });
  };

  const handleUpdateUser = (data) => {
    updateCurrentUser(data)
      .then((user) => {
        setCurrentUser(user);
        setErrorMessageProfile(null);
      })
      .catch((err) => {
        setErrorMessageProfile();
      });
  };

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie)
      .then((res) => {
        const updateSavedMovies = savedMovies.movies.filter((m) => m.movieId !== res.movieId);

        setSavedMovies((prev) => ({
          ...prev,
          movies: updateSavedMovies,
        }));
        localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovies));
      })
      .catch((err) => console.log(err));
  };

  const handleSavedMovie = (movie) => {
    const savedMovie = savedMovies?.movies?.find((m) => m.movieId === movie.id);

    if (savedMovie) {
      handleDeleteMovie(savedMovie);
    } else {
      createMovie(movie)
        .then((res) => {
          const updateSavedMovies = savedMovies.movies.concat(res);
          setSavedMovies((prev) => ({
            ...prev,
            movies: updateSavedMovies,
          }));
          localStorage.setItem("savedMovies", JSON.stringify(updateSavedMovies));
        }
          
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

  const handleMenu = () => {
    setClickMenu(!isClickMenu);
  };

  const handleSearch = (formValues) => {
    setCardListHelpText("");
    setIsLoading(true);

    if (!localStorage.getItem("movies")) {
      getBeatfilmMovies()
        .then((res) => {
          setSearchResult((prev) => ({
            ...prev,
            movies: filter(res, formValues),
            visible: numberOfItemsPerPage,
          }));

          localStorage.setItem("movies", JSON.stringify(res));
        })
        .catch((err) => {
          setCardListHelpText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      setSearchResult((prev) => ({
        ...prev,
        movies: filter(JSON.parse(localStorage.getItem("movies")), formValues),
        visible: numberOfItemsPerPage,
      }));
    }

    localStorage.setItem("isShortFilm", formValues.checked || false);
    localStorage.setItem("search", formValues.search);
    setPlaceholder(formValues.search);
    setChecked(formValues.checked);
    setIsLoading(false);
  };

  const handleSearchSavedMovies = (formValues) => {
    const movies = filter(JSON.parse(localStorage.getItem("savedMovies")), formValues);

    setSavedMovies((prev) => ({
      ...prev,
      movies: movies,
      visible: numberOfItemsPerPage,
    }));
  };

  const handleFilterSearchResult = (checked) => {
    if (!localStorage.getItem("movies")) return;

    if (checked) {
      setSearchResult((prev) => ({
        ...prev,
        movies: filter(JSON.parse(localStorage.getItem("movies")), {
          search: localStorage.getItem("search"),
        }),
      }));
    } else {
      setSearchResult((prev) => ({
        ...prev,
        movies: filterShortFilm(searchResult.movies),
      }));
    }
  };

  const handleFilterSavedMovies = (checked) => {
    if (!localStorage.getItem("savedMovies")) return;

    if (checked) {
      setSavedMovies((prev) => ({
        ...prev,
        movies: JSON.parse(localStorage.getItem("savedMovies"))
      }))
    } else {
      setSavedMovies((prev) => ({
        ...prev,
        movies: filterShortFilm(savedMovies.movies)
      }))
    }
  }

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
                      onFilter={handleFilterSearchResult}
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
                    savedMovies={savedMovies}
                    handleSavedMovie={handleDeleteMovie}
                    onSearch={handleSearchSavedMovies}
                    onFilter={handleFilterSavedMovies}
                  >
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
                    errorMessage={errorMessageProfile}
                  />
                </CurrentUserContext.Provider>
              }
            ></Route>
          </Route>
          <Route
            path="/signin"
            element={
              <Login isLoggedIn={loggedIn} onLogin={handleLogin} errorMessage={errorMessageLogin} />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Register
                isLoggedIn={loggedIn}
                onRegister={handleRegister}
                errorMessage={errorMessageRegister}
              />
            }
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
