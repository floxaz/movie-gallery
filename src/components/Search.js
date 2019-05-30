import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';

class Search extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const search = e.target.search.value;
        if(this.props.chosenGenre) {
            this.props.removeChosenGenre();
        }
        this.props.searchMovie(search);
        localStorage.setItem('search', search);
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="search" placeholder="search movies" />
                <button>ok</button>
            </form>
        )
    }
};

const mapStateToProps = state => ({
    query: state.query,
    chosenGenre: state.genres.chosenGenre
});

const mapDispatchToProps = dispatch => ({
    searchMovie: (query) => dispatch(searchMovie(query)),
    removeChosenGenre: () => dispatch(removeChosenGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);