import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import "./App.css";

function App() {
  const [isClickMenu, setClickMenu] = useState(false);
  const handleMenu = () => {
    setClickMenu(!isClickMenu);
  };

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/movies"
            element={
              <Movies
                isClickMenu={isClickMenu}
                handleMenu={handleMenu}
              />
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                isClickMenu={isClickMenu}
                handleMenu={handleMenu}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                isClickMenu={isClickMenu}
                handleMenu={handleMenu}
              />
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
