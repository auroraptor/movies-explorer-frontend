import getResponse from "./getResponse";
const baseUrl = "https://hey.nomoredomains.club/api/";

const signupUser = async (name, email, password) => {
  const user = await fetch(`${baseUrl}signup`, {
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

const signinUser = async (email, password) => {
  const user = await fetch(`${baseUrl}signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return getResponse(user);
};

const signoutUser = async () => {
  const clearCookie = await fetch(`${baseUrl}signout`, {
    method: "POST",
    credentials: "include",
  });

  return clearCookie.ok ? Promise.resolve() : Promise.reject(clearCookie.status);
};

const getCurrentUser = async () => {
  const user = await fetch(`${baseUrl}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return getResponse(user);
};

const updateCurrentUser = async (data) => {
  const user = await fetch(`${baseUrl}users/me`, {
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
  const movies = await fetch(`${baseUrl}movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log('MOVIES', movies)

  return getResponse(movies);
};

const createMovie = async (data) => {
  const movie = await fetch(`${baseUrl}movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return getResponse(movie);
};

const deleteMovie = async ({ id }) => {
    const movie = await fetch(`${baseUrl}movies/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    return getResponse(movie);
}

export {
  signupUser,
  signinUser,
  signoutUser,
  getCurrentUser,
  updateCurrentUser,
  getMovies,
  createMovie,
  deleteMovie
};
