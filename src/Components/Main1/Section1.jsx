import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favoriteSlice";
import { toast } from "react-toastify";
import Section1Css from "./Section1.module.css";

export default function Section1() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const disabledButtons = useSelector(
    (state) => state.favoriteMovies.disabledButtons
  );
  const isSaved = useSelector((state) => state.favoriteMovies.isSaved);

  useEffect(() => {
    fetchForMovie("aaa");
  }, []);

  const fetchForMovie = (query) => {
    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=8j13b493`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
        if (!data.Search) {
          toast.info("No movies found!");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Something went wrong while fetching!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleSearchClick = () => {
    if (movieName.trim().length > 0) {
      fetchForMovie(movieName);
    } else {
      toast.warning("Search input is empty!");
    }
  };

  return (
    <div className={Section1Css.container}>
      <div className={Section1Css.searchBar}>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Enter a movie name..."
          className={Section1Css.input}
          value={movieName}
        />
        <button onClick={handleSearchClick} className={Section1Css.button1}>
          SEARCH
        </button>
      </div>

      {isLoading ? (
        <div className={Section1Css.loading}>Loading...</div>
      ) : (
        <div className={Section1Css.movies}>
          {movies.map((movie) => (
            <div className={Section1Css.movie} key={movie.imdbID}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={Section1Css.img}
              />
              <h2 className={Section1Css.movieTitle}>{movie.Title}</h2>
              <p className={Section1Css.movieYear}>{movie.Year}</p>
              <button
                className={Section1Css.button2}
                disabled={disabledButtons[movie.imdbID] || isSaved}
                onClick={() => dispatch(addToFavorites(movie))}
              >
                {disabledButtons[movie.imdbID] === true
                  ? "Added"
                  : "Add to favorite list"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
