import React from "react";
import "./MovieDetailsModal.css";


const MovieDetailsModal = ({ film, details, closeDetails, addToFavorites, openTrailer }) => {
  if (!details) return null;

  return (
    <div className="details-modal mt-5">
      <div className="details-content mb-5">

        <button className="details-close" onClick={closeDetails}>X</button>

        <div className="details-body">

          <div className="details-left">
            <img src={film.Poster} alt={film.Title} className="details-poster" />
             <div className="details-buttons mt-5">
              <button className="fav-btn" onClick={() => addToFavorites(film)}>
                ❤️ Add to Favorites
              </button>

              <button 
                    className="trailer-btn"
                    onClick={() => {
                        closeDetails(); 
                        setTimeout(() => openTrailer(film), 200);
                    }}>
                    ▶ Watch Trailer
              </button>

            </div>
          </div>

          <div className="details-right">
            <h2>{details.Title}</h2>
            <p><strong>Year:</strong> {details.Year}</p>
            <p><strong>Runtime:</strong> {details.Runtime}</p>
            <p><strong>Genre:</strong> {details.Genre}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {details.imdbRating}</p>
            <p><strong>Director:</strong> {details.Director}</p>
            <p><strong>Actors:</strong> {details.Actors}</p>

            <p className="details-plot">{details.Plot}</p>

           
          </div>

        </div>

      </div>
    </div>
  );
};

export default MovieDetailsModal;
