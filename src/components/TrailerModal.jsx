import React from "react";

const TrailerModal = ({ trailerKey, closeModal }) => {
  if (!trailerKey) return null;

  return (
    <div className="trailer-modal">
      <div className="trailer-content">
        <button className="close-btn" onClick={closeModal}>X</button>

        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
