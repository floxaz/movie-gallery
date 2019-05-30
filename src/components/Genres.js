import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addGenres } from '../actions/genres';
import { chooseGenre } from '../actions/genres';
import { userClickedGenres } from '../actions/home';
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
    console.log('kek');
    if(this.props.genres.length === 0) {
      this.configuration();
    }
    if(this.props.userAtHomePage) {
      this.props.userClickedGenres();
    }
    if(this.props.query) {
      this.props.removeSearch();
    }
  }

  handleGenreClick = e => {
    e.persist();
    this.props.chooseGenre(e.target.parentElement.id);
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
  query: state.query
});

const mapDispatchToProps = dispatch => ({
  addGenres: genres => dispatch(addGenres(genres)),
  chooseGenre: genre => dispatch(chooseGenre(genre)),
  userClickedGenres: () => dispatch(userClickedGenres()),
  removeSearch: () => dispatch(removeSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);