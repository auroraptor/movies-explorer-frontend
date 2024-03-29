import getResponse from "./getResponse";
import { MOVIES_API } from "../constants/Api";

const getBeatfilmMovies = async () => {
  const films = await fetch(`${MOVIES_API}beatfilm-movies`, {
    method: "GET",
  });
  return getResponse(films);
};

export default getBeatfilmMovies;
