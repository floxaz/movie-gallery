import React from 'react';

const Movie = ({ title, img, vote_average }) => (
  <div className="movie">
    <h3>{title}</h3>
    <div><img src={img} alt={title} /></div>
    <p>{vote_average}</p>
  </div>
);

export default Movie;