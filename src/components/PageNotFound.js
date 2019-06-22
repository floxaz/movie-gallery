import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const PageNotFound = () => (
  <div className="notFound">
    <div className="notFound__wrapper">
      <div className="notFound__content">
        <img src="images/not-found.svg" alt="not-found" className="notFound__img" />
        <p className="notFound__reason">Page not found</p>
        <button className="notFound__btn">
          <Link to="/" className="notFound__link">Home</Link>
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

export default PageNotFound;