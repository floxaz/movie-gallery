import React from 'react';
import configure from '../actions/configuration';
import { connect } from 'react-redux';

class AboutMovie extends React.Component {
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = {
        title: undefined,
        overview: undefined,
        error: false
    }
    componentDidMount() {
        let movieID = '';
        if (Object.entries(this.props.settings).length === 0) {
            this.configuration()
                .then(() => {
                    movieID = this.props.location.pathname.split('-')[1];
                    this.getMovieInfo(movieID);
                });
        } else {
            movieID = this.props.location.pathname.split('-')[1];
            this.getMovieInfo(movieID);
        }
    }

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.key}`);
        const result = await response.json();
        this.props.configure(result);
    }

    getMovieInfo = async id => {
        const result = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}&language=en-US`);
        const movieData = await result.json();
        console.log(movieData);
        // if api call went well
        if (!movieData.status_message) {
            this.setState(() => ({
                title: movieData.title,
                overview: movieData.overview
            }));
        } else {
            this.setState(() => ({ error: true }));
        }
    }

    render() {
        const showFilm = (
            <div>
            {this.state.title && <h1>{this.state.title}</h1>}
            {this.state.overview && <p>{this.state.overview}</p>}
            </div>
        );
        const noFilm = (
            <div>
              <h1>The film you requested could not be found</h1>
            </div>
        );

        if(!this.state.error) {
            return showFilm;
        } else {
            return noFilm;
        }
    };
};

const mapStateToProps = ({ configuration }) => ({
    settings: configuration
});

const mapDispatchToProps = dispatch => ({
    configure: settigns => dispatch(configure(settigns))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(AboutMovie);