import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div>
      <h1>404</h1>
      This page doesn't exist
      <Link to="/">Home</Link>
    </div>
);

export default PageNotFound;