import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';

const Search = ({ searchMovie, location, history, chosenGenre, removeChosenGenre }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const query = e.target.search.value;
        if(chosenGenre) {
            removeChosenGenre();
        }
        searchMovie(query);
        if(location.pathname !== '/') {
            history.push('/');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="search movies" />
            <button>ok</button>
        </form>
    )
};

const mapStateToProps = state => ({
    chosenGenre: state.genres.chosenGenre
});

const mapDispatchToProps = dispatch => ({
    searchMovie: (query) => dispatch(searchMovie(query)),
    removeChosenGenre: () => dispatch(removeChosenGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);