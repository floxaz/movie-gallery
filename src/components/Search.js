import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions/searchMovie';
import { cancelQueryFromStorage } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';

class Search extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const search = e.target.search.value;
        if(this.props.chosenGenre) {
            this.props.removeChosenGenre();
        }
        this.props.cancelQueryFromStorage();
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
    query: state.search.query,
    queryFromStorage: state.search.queryFromStorage,
    chosenGenre: state.genres.chosenGenre
});

const mapDispatchToProps = dispatch => ({
    searchMovie: (query) => dispatch(searchMovie(query)),
    cancelQueryFromStorage: () => dispatch(cancelQueryFromStorage()),
    removeChosenGenre: () => dispatch(removeChosenGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);