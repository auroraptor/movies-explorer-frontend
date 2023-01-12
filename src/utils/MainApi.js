import getResponse from "./getResponse";
import { MAIN_API, MOVIES_API } from "../constants/Api";

const signupUser = async ({name, email, password}) => {
  const user = await fetch(`${MAIN_API}signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return getResponse(user);
};

const signinUser = async ({email, password}) => {
  const res = await fetch(`${MAIN_API}signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.ok
    ? Promise.resolve()
    : Promise.reject(res.status);
};

const signoutUser = async () => {
  const clearCookie = await fetch(`${MAIN_API}signout`, {
    method: "POST",
    credentials: "include",
  });

  return clearCookie.ok
    ? Promise.resolve()
    : Promise.reject(clearCookie.status);
};

const getCurrentUser = async () => {
  const user = await fetch(`${MAIN_API}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return getResponse(user);
};

const updateCurrentUser = async (data) => {
  const user = await fetch(`${MAIN_API}users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return getResponse(user);
};

const getMovies = async (data) => {
  const movies = await fetch(`${MAIN_API}movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return getResponse(movies);
};

const createMovie = async (data) => {
  const image = MOVIES_API + data.image.url;
  const thumbnail = MOVIES_API + data.image.formats.thumbnail.url;
  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    trailerLink,
    id: movieId,
  } = data;

  const movie = await fetch(`${MAIN_API}movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      nameRU,
      nameEN,
      trailerLink,
      image,
      thumbnail,
      movieId,
    }),
  });

  return getResponse(movie);
};

const deleteMovie = async ({ id }) => {
  const movie = await fetch(`${MAIN_API}movies/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return getResponse(movie);
};

export {
  signupUser,
  signinUser,
  signoutUser,
  getCurrentUser,
  updateCurrentUser,
  getMovies,
  createMovie,
  deleteMovie,
};
