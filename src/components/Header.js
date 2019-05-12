import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => (
    <header>
       <div><Link to="/">Home</Link></div>
       <div><Link to="/genres">Genres</Link></div>
       <Search />
    </header>
);

export default Header;