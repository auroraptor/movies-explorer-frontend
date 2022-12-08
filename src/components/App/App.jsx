import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/saved-movies" element={<SavedMovies />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/nav" element={<Navigation></Navigation>}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
