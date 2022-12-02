import { Routes, Route } from 'react-router-dom';
import AboutProject from '../AboutProject/AboutProject';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<AboutProject/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/saved-movies' element={<SavedMovies/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signin' element={<Login/>}></Route>
        <Route path='/signup' element={<Register/>}></Route>
      </Routes>
  );
}

export default App;
