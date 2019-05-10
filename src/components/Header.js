import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
       <div><Link to="/">Home</Link></div>
       <div><Link to="/genres">Genres</Link></div>
    </header>
);

export default Header;