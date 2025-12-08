import React from 'react'

const FilmList = (props) => {
    const Favorites = props.favorites;
    return(

        <>
        {props.films?.map((film, index) => (
             <div key={index} 
                  className={`image-container col-md-2 col-sm-4 mb-4 d-flex justify-content-center ${props.isDefault ? "default-movie" : ""}`}>

                    <img 
                        src={film.Poster} 
                        alt={film.Title} 
                        onClick={() => props.openDetails(film)}
                      />

                  <div className="overlay d-flex align-items-center justify-content-center">
                     
                        <div onClick={() => props.favoritesChosen(film)}>
                            <Favorites />
                        </div>


                      <button
                        className="trailer-btn"
                        onClick={() => props.onTrailerClick(film)}
                      >  ▶ Watch Trailer
                      </button>
                 </div>
             </div>
           ))}
        </>
    );
};


export default FilmList