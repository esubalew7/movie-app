import React from "react";
import "./FilmListHeading.css";  // Create this small CSS file

const FilmListHeading = () => {
  return (
    <header className="d-flex align-items-center justify-content-between py-3">
      
      {/* Left side: Logo + Brand */}
      <div className="d-flex align-items-center gap-3">
        <img 
          src="/logo2.jpg" 
          alt="E-MovieTrailers Logo" 
          className="app-logo"
        />
        <h1 className="app-title">E-MovieTrailers</h1>
      </div>
      
    
    </header>
  );
};

export default FilmListHeading;
