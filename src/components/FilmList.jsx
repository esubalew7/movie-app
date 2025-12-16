import React from 'react';

const FilmList = (props) => {
    const Favorites = props.favorites;

    return (
        <div className={props.isDefault ? "default-grid" : "film-grid"}>
            {props.films?.map((film, index) => (
                <div 
                    key={index} 
                    className={`movie-card ${props.isDefault ? "default-card" : ""}`}
                >
                    <img 
                        src={film.Poster} 
                        alt={film.Title} 
                        onClick={() => props.openDetails(film)}
                        className="movie-poster"
                    />

                    {/* Overlay Buttons */}
                    {!props.isDefault && (
                        <div className="overlay d-flex align-items-center justify-content-between">
                            
                            <div onClick={() => props.favoritesChosen(film)}>
                                <Favorites />
                            </div>

                            <button
                                className="trailer-btn"
                                onClick={() => props.onTrailerClick(film)}
                            >
                                ▶ Trailer
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilmList;
