import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Main2Section1.module.css";

const Main2Section1 = () => {
  const { id } = useParams();

  const savedList = useSelector((state) =>
    state.favoriteMovies.savedLists.find((list) => list.id === id)
  );

  if (!savedList) {
    return (
      <main className={styles.container}>
        <p className={styles.notFound}>No list found!</p>
        <Link to="/" className={styles.home} aria-label="Go back to homepage">
          <i class="fa-solid fa-house-user"></i>
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.home} aria-label="Go back to homepage">
        <i class="fa-solid fa-house-user"></i>
      </Link>

      <h1 className={styles.title}>Movie Compilation: {savedList.listName}</h1>

      {savedList.movies && savedList.movies.length > 0 ? (
        <section className={styles.list}>
          {savedList.movies.map((movie) => (
            <article key={movie.imdbID} className={styles.listItem}>
              <h2 className={styles.movieTitle}>🎬 {movie.Title}</h2>
              <img
                className={styles.moviePoster}
                src={movie.Poster}
                alt={`Poster of ${movie.Title}`}
                loading="lazy"
                decoding="async"
              />
              <button
                className={styles.button}
                aria-label={`Watch trailer for ${movie.Title}`}
                onClick={() =>
                  window.open(
                    `https://www.imdb.com/title/${movie.imdbID}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                type="button"
              >
                Watch Trailer
              </button>
            </article>
          ))}
        </section>
      ) : (
        <p className={styles.notFound}>No movies in this list.</p>
      )}
    </main>
  );
};

export default Main2Section1;
