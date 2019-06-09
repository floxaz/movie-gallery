import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ title, img, vote_average, id }) => (
  <div className="movie">
    <Link to={`/movie-${id}`} className="movie__link">
      <figure className="movie__figure">
        <img src={img} alt={title} className="movie__poster" />
        <div className="movie__raiting">
          <svg className="movie__star">
            <use xlinkHref="./images/sprite.svg#icon-star-full"></use>
          </svg>
          <p>{vote_average}</p>
        </div>
      </figure>
      <p className="movie__title">{title}</p>
    </Link>
  </div>
);

export default Movie;