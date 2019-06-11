import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions/searchMovie';
import { cancelQueryFromStorage } from '../actions/searchMovie';
import { gotQueryFromStorage } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';

class Search extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        if(this.props.chosenGenre) {
            this.props.removeChosenGenre();
        }
        this.props.cancelQueryFromStorage();
        console.log('value', e.target.search.value);
        this.props.searchMovie(e.target.search.value);
        localStorage.setItem('search', e.target.search.value);
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    name="search"
                    placeholder="search movies"
                />
                <button className="search__btn">
                    <svg className="search__icon">
                        <use xlinkHref="./images/sprite.svg#icon-search"></use>
                  </svg>
                </button>
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
    searchMovie: query => dispatch(searchMovie(query)),
    cancelQueryFromStorage: () => dispatch(cancelQueryFromStorage()),
    gotQueryFromStorage: () => dispatch(gotQueryFromStorage()),
    removeChosenGenre: () => dispatch(removeChosenGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);