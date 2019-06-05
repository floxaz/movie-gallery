import React from 'react';
import configure from '../actions/configuration';
import { connect } from 'react-redux';

class AboutMovie extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = {
        error: false
    }
    componentDidMount() {
        this._isMounted = true;
        const movieID = this.props.location.pathname.split('-')[1];;
        if (Object.entries(this.props.settings).length === 0) {
            this.configuration()
                .then(() => {
                    this.getMovieInfo(movieID);
                });
        } else {
            this.getMovieInfo(movieID);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        if (this._isMounted) {
            // if api call went well
            if (!movieData.status_message) {
                this.setState(() => ({
                    title: movieData.title,
                    genres: movieData.genres,
                    release: movieData.release_date,
                    countries: movieData.production_countries,
                    runtime: movieData.runtime,
                    overview: movieData.overview,
                    backdrop_path: movieData.backdrop_path
                }));
            } else {
                this.setState(() => ({ error: true }));
            }
        }
    }

    makeList = property => {
        let list = '';
        property.forEach((character, index) => {
            if(index < property.length - 1) {
                list += character.name + ', ';
            } else {
                list += character.name;
            }
        })

        return list;
    }

    render() {
        const showFilm = (
            <div>
            {this.state.backdrop_path && <img src={`${this.props.settings.base_url}${this.props.settings.backdrop_sizes[2]}${this.state.backdrop_path}`} />}
            {this.state.title && <h1>{this.state.title}</h1>}
            {this.state.genres && <p>Genres: {this.makeList(this.state.genres)}</p>}
            {this.state.release && <p>Release: {this.state.release}</p>}
            {this.state.countries && <p>Country: {this.makeList(this.state.countries)}</p>}
            {this.state.runtime && <p>Duration: {this.state.runtime} min</p>}
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