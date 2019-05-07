import React from 'react';

const Movie = ({ title, img }) => (
  <div className="movie">
    <h3>{title}</h3>
    <div><img src={img} alt={title} /></div>
  </div>
);

export default Movie;