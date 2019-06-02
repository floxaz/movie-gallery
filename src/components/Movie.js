import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ title, img, vote_average, id }) => (
  <div className="movie">
    <Link to={`/movie-${id}`}>
      <h3>{title}</h3>
      <div><img src={img} alt={title} /></div>
      <p>{vote_average}</p>
    </Link>
  </div>
);

export default Movie;