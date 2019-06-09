import React from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions/searchMovie';
import { cancelQueryFromStorage } from '../actions/searchMovie';
import { gotQueryFromStorage } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';

class Search extends React.Component {
    state = {
        value: '',
        gotValueFromStorage: false
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.props.query !== prevState.value && !this.state.gotValueFromStorage) {
            this.setState(() => ({
                value: this.props.query,
                gotValueFromStorage: true
            }))
        }
    }
    
    handleOnChange = e => {
        e.persist();
        this.setState(() => ({ value: e.target.value }));
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState(() => ({ gotValueFromStorage: false }));
        if(this.props.chosenGenre) {
            this.props.removeChosenGenre();
        }
        this.props.cancelQueryFromStorage();
        this.props.searchMovie(this.state.value);
        localStorage.setItem('search', this.state.value);
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
                    onChange={this.handleOnChange}
                    value={this.state.value}
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