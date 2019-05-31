import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addGenres } from '../actions/genres';
import { selectGenre } from '../actions/genres';
import { userLeftHome } from '../actions/home';
import { removeSearch } from '../actions/searchMovie';

class Genres extends React.Component {
  dbUrl = 'https://api.themoviedb.org/3/';
  key = '98138b2310ee9081572944e69a78f168';

  configuration = async () => {
    const response = await fetch(`${this.dbUrl}genre/movie/list?api_key=${this.key}&language=en-US`);
    const result = await response.json();
    this.props.addGenres(result.genres);
  }

  componentDidMount() {
    if(this.props.genres.length === 0) {
      this.configuration();
    }
    if(this.props.userAtHomePage) {
      this.props.userLeftHome();
    }
    if(this.props.query) {
      this.props.removeSearch();
      localStorage.setItem('search', '');
    }
  }

  handleGenreClick = e => {
    e.persist();
    this.props.selectGenre(e.target.parentElement.id);
    localStorage.setItem('chosenGenre', e.target.parentElement.id);
  }

  render() {
    return (
      <div onClick={this.handleGenreClick}>
        {this.props.genres.length > 0 ? this.props.genres.map(genre => (
          <div key={genre.id} id={genre.id}>
            <Link to={`${this.props.match.url}/${genre.name.toLowerCase()}`}>
              {genre.name}
            </Link>
          </div>
        )) : 'wait a second...'}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genres.genreOptions,
  userAtHomePage: state.home.userAtHomePage,
  query: state.search.query
});

const mapDispatchToProps = dispatch => ({
  addGenres: genres => dispatch(addGenres(genres)),
  selectGenre: genre => dispatch(selectGenre(genre)),
  userLeftHome: () => dispatch(userLeftHome()),
  removeSearch: () => dispatch(removeSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);