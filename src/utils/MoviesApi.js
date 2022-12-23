import getResponse from "./getResponse";

const getBeatfilmMovies = async () => {
  const films = await fetch(" https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET",
  });
  return getResponse(films);
};

export default getBeatfilmMovies;
