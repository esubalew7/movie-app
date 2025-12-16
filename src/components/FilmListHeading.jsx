import React from "react";
import "../styles/App.css";  

const FilmListHeading = () => {
  return (
    <div className="header-container">
      
      {/* Left Section: Logo + Title */}
      <div className="header-left">
        <img 
          src="/logo2.png"
          alt="E-MovieTrailers Logo"
          className="app-logo"
        />

        <h1 className="app-title">E-MovieTrailers</h1>
      </div>

      {/* Right Section: Placeholder for search (controlled in App.jsx) */}
          
    </div>
  );
};

export default FilmListHeading;
