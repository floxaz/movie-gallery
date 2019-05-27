import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import searchMovie from '../actions/searchMovie';

const Search = ({ searchMovie, history }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const query = e.target.search.value;
        searchMovie(query);
        if(history.location.pathname === '/genres') {
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

const mapDispatchToProps = dispatch => ({
    searchMovie: (query) => dispatch(searchMovie(query))
});

export default withRouter(connect(undefined, mapDispatchToProps)(Search));