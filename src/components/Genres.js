import React from 'react';
import { connect } from 'react-redux';
import addGenres from '../actions/genres';

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
  }

  render() {
    return (
      <div>
        {this.props.genres.length > 0 ? this.props.genres.map(genre => (
          <div key={genre.id}>
            {genre.name}
          </div>
        )) : 'wait a second...'}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genres
});

const mapDispatchToProps = dispatch => ({
  addGenres: genres => dispatch(addGenres(genres))
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);