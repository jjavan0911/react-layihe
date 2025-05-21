import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, saveList } from "../../redux/favoriteSlice";
import Section2Css from "./Section2.module.css";
import { NavLink } from "react-router-dom";

const Section2 = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(
    (state) => state.favoriteMovies.favoriteMovies
  );
  const [listName, setListName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [listId, setListId] = useState(null);

  const isSaveDisabled = favoriteMovies.length === 0 || listName.trim() === "";

  const handleSaveList = () => {
    if (!isSaveDisabled) {
      const newListId = Date.now().toString();
      setListId(newListId);
      setIsSaved(true);
      const newList = {
        listName,
        movies: favoriteMovies,
        id: newListId,
      };
      dispatch(saveList(newList));
    }
  };

  return (
    <div className={Section2Css.container}>
      <input
        type="text"
        placeholder="Enter a list name..."
        className={Section2Css.input}
        value={listName}
        onChange={(e) => {
          setListName(e.target.value);
          setIsSaved(false);
        }}
        disabled={isSaved}
      />

      <div className={Section2Css.names}>
        <h3 className={Section2Css.h3}>Favorite Movies:</h3>
        {favoriteMovies.map((movie) => (
          <div key={movie.imdbID} className={Section2Css.listItem}>
            {movie.Title}
            {!isSaved && (
              <button
                className={Section2Css.removeButton}
                onClick={() => dispatch(removeFromFavorites(movie.imdbID))}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className={Section2Css.button}
        onClick={handleSaveList}
        disabled={isSaveDisabled}
      >
        Save List
      </button>

      {isSaved && (
        <div className={Section2Css.links}>
          <NavLink
            to={`/GoToFavoriteList/${listId}`}
            className={Section2Css.navLink}
          >
            Go To Favorite List
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Section2;
