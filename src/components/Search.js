import React from 'react';
import { connect } from 'react-redux';
import searchMovie from '../actions/searchMovie';

const Search = ({ searchMovie }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const query = e.target.search.value;
        searchMovie(query);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="search movies" />
            <button>ok</button>
        </form>
    )
};

const mapDispatchToProps = dispatch => ({
    searchMovie: (query) => dispatch(searchMovie(query))
});

export default connect(undefined, mapDispatchToProps)(Search);