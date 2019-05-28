import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { removeChosenGenre } from '../actions/genres';
import { connect } from 'react-redux';

const Header = ({ chosenGenre, removeChosenGenre }) => {
    const handleOnHomeClick = e => {
        if(chosenGenre) {
            removeChosenGenre();
        }
    }
    return (
        <header>
            <div onClick={handleOnHomeClick}>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/genres">Genres</Link>
            </div>
            <Search />
        </header>
    )
}

const mapStateToProps = state => ({
    chosenGenre: state.genres.chosenGenre
});

const mapDispatchToProps = dispatch => ({
    removeChosenGenre: () => dispatch(removeChosenGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);