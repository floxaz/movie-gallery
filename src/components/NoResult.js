import React from 'react';
import Footer from './Footer';

const NoResult = ({ query }) => (
    <div className="notFound">
    <div className="notFound__wrapper">
      <div className="notFound__content">
        <img src="/images/no-result.svg" alt="not-found" className="notFound__img" />
        <p className="notFound__reason">No results for "{query}"</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default NoResult;