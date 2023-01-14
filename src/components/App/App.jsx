import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
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
import PopupWithErrorMessage from "../PopupWithErrorMessage/PopupWithErrorMessage";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClickMenu, setClickMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [errorMessagePopup, setErrorMessagePopup] = useState(
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
  );
  const [isPopupOpened, setPopupOpened] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const windowWidth = useWindowSize().width;
  const numberOfItemsPerPage = displayItemsPerPage(windowWidth);
  const numberOfNextItems = displayNextItems(windowWidth);

  const navigate = useNavigate();
  const path = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/signin" && loggedIn) navigate("/");
    if (location.pathname === "/signup" && loggedIn) navigate("/");
  }, [location.pathname, loggedIn, navigate]);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        navigate(path);
      })
      .catch((err) => {
        if (err === HttpStatusCode.UNAUTHORIZED) localStorage.clear();
        else {
          setErrorMessagePopup(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setPopupOpened(true);
        }
      });
  }, []);

  useEffect(() => {
    setPopupOpened(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("beatFilmMovies")) {
      setSearchResult((prev) => ({
        ...prev,
        movies: filter(JSON.parse(localStorage.getItem("beatFilmMovies")), {
          search: localStorage.getItem("search"),
          checked: JSON.parse(localStorage.getItem("isShortFilm")),
        }),
        visible: numberOfItemsPerPage,
      }));

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
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => {
        if (err === HttpStatusCode.UNAUTHORIZED) localStorage.clear();
        else {
          setErrorMessagePopup(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setPopupOpened(true);
        }
      });
  }, [loggedIn, numberOfItemsPerPage]);

  useEffect(() => {
    setCardListHelpText(
      localStorage.getItem("beatFilmMovies")
        ? "Ничего не найдено"
        : "Введите ключевое слово"
    );
  }, [searchResult]);

  const handlePopupOpened = () => setPopupOpened(true);
  const handlePopupClosed = () => setPopupOpened(false);

  const handleRegister = (data) => {
    const { email, password } = data;
    setButtonDisabled(true);

    signupUser(data)
      .then((res) => {
        handleLogin({ email, password });
        navigate("movies");
      })
      .catch((err) => {
        if (err === HttpStatusCode.UNAUTHORIZED)
          setErrorMessagePopup("Неправильные почта или пароль");
        setPopupOpened(true);
      })
      .finally(() => setButtonDisabled(false));
  };

  const handleLogin = (data) => {
    setButtonDisabled(true);

    signinUser(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("movies");
      })
      .catch((err) => {
        if (err === HttpStatusCode.UNAUTHORIZED)
          setErrorMessagePopup("Неправильные почта или пароль");
        setPopupOpened(true);
      })
      .finally(() => setButtonDisabled(false));
  };

  const handleLogout = () => {
    signoutUser()
      .then((res) => {
        setCurrentUser({ name: "", email: "" });
        localStorage.clear();
        setSearchResult({
          movies: [],
          visible: 0,
          error: false,
        });
        setSavedMovies({
          movies: [],
          visible: 0,
          error: false,
        });
        setLoggedIn(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessagePopup(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setPopupOpened(true);
      });
  };

  const handleUpdateUser = (data) => {
    updateCurrentUser(data)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        if (err === HttpStatusCode.BAD_REQUEST) {
          setErrorMessagePopup(
            "Стоит проверить данные. Поле Имя должно быть длиной от 2 до 30 символов. Поле email содержит валидный почтовый адрес."
          );
        }
        handlePopupOpened();
      });
  };

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie)
      .then((res) => {
        const updateSavedMovies = savedMovies.movies.filter(
          (m) => m.movieId !== res.movieId
        );

        setSavedMovies((prev) => ({
          ...prev,
          movies: updateSavedMovies,
        }));
        localStorage.setItem("savedMovies", JSON.stringify(updateSavedMovies));
      })
      .catch((err) => {
        setErrorMessagePopup(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setPopupOpened(true);
      });
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
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(updateSavedMovies)
          );
        })
        .catch((err) => {
          setErrorMessagePopup(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setPopupOpened(true);
        });
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

    if (!localStorage.getItem("beatFilmMovies")) {
      getBeatfilmMovies()
        .then((res) => {
          const searchResult = filter(res, formValues);

          setSearchResult((prev) => ({
            ...prev,
            movies: searchResult,
            visible: numberOfItemsPerPage,
          }));

          localStorage.setItem("beatFilmMovies", JSON.stringify(res));
          localStorage.setItem("searchResult", JSON.stringify(searchResult));
        })
        .catch((err) => {
          setErrorMessagePopup(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setPopupOpened(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSearchResult((prev) => ({
        ...prev,
        movies: filter(
          JSON.parse(localStorage.getItem("beatFilmMovies")),
          formValues
        ),
        visible: numberOfItemsPerPage,
      }));
      localStorage.setItem("searchResult", JSON.stringify(searchResult));
    }

    localStorage.setItem("isShortFilm", formValues.checked || false);
    localStorage.setItem("search", formValues.search);
    setChecked(formValues.checked);
    setIsLoading(false);
  };

  const handleFilterSearchResult = (checked) => {
    if (!localStorage.getItem("beatFilmMovies")) return;

    if (checked) {
      setSearchResult((prev) => ({
        ...prev,
        movies: filter(JSON.parse(localStorage.getItem("beatFilmMovies")), {
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
                      isChecked={isCheked}
                      onFilter={handleFilterSearchResult}
                      searchKeyWord={localStorage.getItem("search")}
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
                  />
                </CurrentUserContext.Provider>
              }
            ></Route>
          </Route>
          <Route
            path="/signin"
            element={
              <Login
                isLoggedIn={loggedIn}
                onLogin={handleLogin}
                isButtonDisabled={isButtonDisabled}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Register
                isLoggedIn={loggedIn}
                onRegister={handleRegister}
                isButtonDisabled={isButtonDisabled}
              />
            }
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
        <PopupWithErrorMessage
          message={errorMessagePopup}
          onOpened={isPopupOpened}
          onClick={handlePopupClosed}
        />
      </div>
    </div>
  );
}

export default App;
