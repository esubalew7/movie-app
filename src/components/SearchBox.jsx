import React from "react";


const SearchBox = (props) => {

    return(
         <div className="input-div col col-sm-4">
            <input className="form-control" 
                   placeholder="search for a film..."
                   value={props.searchFilm}
                   onChange={(event)=>props.setSearchFilm(event.target.value)}              
            />
         </div>
    );
}

export default SearchBox