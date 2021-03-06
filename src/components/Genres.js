import React from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addGenres } from '../actions/genres';
import { selectGenre } from '../actions/genres';
import { userLeftHome } from '../actions/home';
import { removeSearch } from '../actions/searchMovie';
import Loader from './Loader';

class Genres extends React.Component {
  dbUrl = 'https://api.themoviedb.org/3/';
  key = '98138b2310ee9081572944e69a78f168';

  configuration = async () => {
    const response = await fetch(`${this.dbUrl}genre/movie/list?api_key=${this.key}&language=en-US`);
    const result = await response.json();
    this.props.addGenres(result.genres);
    this.storageGenres(result.genres);
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

  storageGenres = genres => {
    const json = JSON.stringify(genres);
    localStorage.setItem('genres', json);
  }

  render() {
    const content = (
      <div className="genres__content">
        {this.props.genres.map(genre => (
          <div className="genres__item" key={genre.id} id={genre.id}>
            <Link className="genres__link" to={`${this.props.match.url}/${genre.name.toLowerCase()}`}>
              {genre.name}
            </Link>
          </div>
        ))}
      </div>
    );

    return (
      <div className="genres" onClick={this.handleGenreClick}>
        <div className="genres__wrapper">
          {this.props.genres.length > 0 ? content : <Loader />}
        </div>
        <Footer />
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