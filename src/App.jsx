
import { useState, useEffect } from 'react';
import './styles/App.css';
import FilmList from './components/FilmList';
import FilmListHeading from './components/FilmListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorite from './components/RemoveFavorite';
import TrailerModal from './components/TrailerModal';
import MovieDetailsModal from './components/MovieDetailsModal';



const App = () => {
   const [films, setFilms] = useState([]);
   const [favoriteFilm, setFavoriteFilms] = useState([]);

   //makes the search dynamics with state obj
  const [searchFilm, setSearchFilm] = useState("");
//State For Default Movies
const [defaultMovies, setDefaultMovies] = useState([]);



   const getFilmRequest = async (searchFilm) => {
        //make the request to the API
       const url = `https://www.omdbapi.com/?s=${searchFilm}&apikey=cd2e136f`;


       const response = await fetch(url);
        //convert the response to JSON
       const responseJson = await response.json();
       
       if(responseJson.Search) {
           setFilms(responseJson.Search);   //to replace hardcoded data with api data
                                         //Search is an array name used by the OMDB API. 
       }     
       
       
   };

     //call the getFilmRequest with useEffect hook
     useEffect(() => {
      getFilmRequest(searchFilm);
     }, [searchFilm]);

//get data from local storage
    useEffect(() => {
     const filmFavorites = JSON.parse(localStorage.getItem('your-favorite'));   
     setFavoriteFilms(filmFavorites);
     },[]);


//To save local storage
     const saveToLocalStorage = (items) => {
            localStorage.setItem('your-favorite', JSON.stringify(items))
     }

//Fetch Default Movies from TMDb
useEffect(() => {
  const fetchDefaultMovies = async () => {
    // random page number 1–20
    const randomPage = Math.floor(Math.random() * 20) + 1;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=3181ce4e9c72afa90b89b779b1ed6129&page=${randomPage}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (data.results) {
      // Convert TMDb data to OMDb-like structure
      const formatted = data.results.map(m => ({
        Title: m.title,
        Poster: m.poster_path 
          ? `https://image.tmdb.org/t/p/w300${m.poster_path}` // smaller size
          : "https://via.placeholder.com/300x450?text=No+Image",
        imdbID: m.id,
      }));

      setDefaultMovies(formatted);
    }
  };

  fetchDefaultMovies();
}, []);



   
//To add the favorite section
     const addFavoriteFilm = (film) => {
          // Check if already in favorites
          const exists = favoriteFilm.some(f => f.imdbID === film.imdbID);

          if (exists) {
            alert("Already added to favorites!");
            return;
          }
    
         const newFavoriteList = [...favoriteFilm, film]; //... means -> Take everything inside the array({newFavoriteList}) and copy the value of {favoriteFilm}
         setFavoriteFilms(newFavoriteList);
         saveToLocalStorage(newFavoriteList);  //call to save the local storage
     }


//for remove from favorite list
     const removeFavoriteFilm = (film) => {
         const newFavoriteList = favoriteFilm.filter(        //.filter() = array method that Loops through the entire array and Checks a condition
          (favoriteFilm)=>favoriteFilm.imdbID!==film.imdbID); 
         setFavoriteFilms(newFavoriteList);
         saveToLocalStorage(newFavoriteList); //to remove the unwanted favorite from local storage
     }


//function to fetch trailer
const [trailerKey, setTrailerKey] = useState("");

const getTrailer = async (film) => {
  const title = film.Title;
  // 1. Search movie in TMDb
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=3181ce4e9c72afa90b89b779b1ed6129`;
  const searchResp = await fetch(searchUrl);
  const searchData = await searchResp.json();

  if (!searchData.results || searchData.results.length === 0) {
    alert("Trailer not found");
    return;
  }

  const movieId = searchData.results[0].id;

  // 2. Get video (trailer) for that movie
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3181ce4e9c72afa90b89b779b1ed6129`;

  const videoResp = await fetch(videoUrl);
  const videoData = await videoResp.json();

  const trailer = videoData.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (trailer) {
    setTrailerKey(trailer.key); // Save YouTube video key
  } else {
    alert("No Trailer Found");
  }
};


//for detail component
const [selectedFilm, setSelectedFilm] = useState(null);
const [filmDetails, setFilmDetails] = useState(null);
//create API function
const openDetails = async (film) => {
  setSelectedFilm(film);

  const url = `https://www.omdbapi.com/?i=${film.imdbID}&plot=full&apikey=cd2e136f`;

  const resp = await fetch(url);
  const data = await resp.json();

  setFilmDetails(data);
};


//close modal
const closeDetails = () => {
  setSelectedFilm(null);
  setFilmDetails(null);
};


const closeModal = () => setTrailerKey("");


  return (
    <div className="App container-fluid film-css">

{/*Film Top header */}
       <div className="film-header d-flex align-items-center mb-5 fixed-top shadow-sm"> 
         {/* Top header only once */}  
         <div className="col">
          <FilmListHeading heading="Films" />
          </div>            
         
          {/* Search box */}
           <div className="col">
             <SearchBox searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
          </div>                 
          
       </div> 
     
<h2 className="section-title mt-5 mb-3">Popular Movies</h2>

{/*To add Favorite Film list*/}
      <div className="row mt-5">
       <FilmList 
          films={searchFilm.trim() === "" ? defaultMovies : films}
          favoritesChosen={addFavoriteFilm}
          favorites={AddFavorites}
          onTrailerClick={getTrailer}
          openDetails={openDetails}
          isDefault={searchFilm.trim() === ""}  
        />
      </div> 

  {/*Favorite Film list*/}    
       <div className="row d-flex align-items-center mt-4 mb-4 film-list" >
         <h2 className="section-title mt-5 mb-3">Your Favorites</h2>
      </div>

{/*To Remove from Favorite Film list*/}
       <div className="row">
        <FilmList 
          films={favoriteFilm}
          favoritesChosen={removeFavoriteFilm}
          favorites={RemoveFavorite}
          onTrailerClick={getTrailer}
          openDetails={openDetails}
        />

      </div> 
{/* MovieDetailsModal component */}
      <MovieDetailsModal 
          film={selectedFilm}
          details={filmDetails}
          closeDetails={closeDetails}
          addToFavorites={addFavoriteFilm}
          openTrailer={getTrailer}
        />


      <TrailerModal trailerKey={trailerKey} closeModal={closeModal} />


    </div>  
      ); 
}



export default App