import React from 'react';
import configure from '../actions/configuration';
import Actor from './Actor';
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
        this.downloadInfo(movieID);
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
                    poster_path: movieData.poster_path,
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
            if (index < property.length - 1) {
                list += character.name + ', ';
            } else {
                list += character.name;
            }
        })

        return list;
    }

    getCast = async movieID => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${this.key}`);
        const credit = await response.json();
        console.log(credit);
        if (this._isMounted) {
            this.setState(() => ({
                cast: credit.cast
            }));
        }
    }

    downloadInfo = movieID => {
        if (Object.entries(this.props.settings).length === 0) {
            this.configuration()
                .then(() => {
                    this.getMovieInfo(movieID);
                })
                .then(() => {
                    this.getCast(movieID);
                });
        } else {
            this.getMovieInfo(movieID)
                .then(() => {
                    this.getCast(movieID);
                });
        }
    }

    render() {
        const showFilm = (
            <div className="aboutMovie">
                <div className="row row--flex">
                    <div className="aboutMovie__poster-container">
                        {this.state.backdrop_path &&
                            <img
                                src={`${this.props.settings.base_url}${this.props.settings.poster_sizes[3]}${this.state.poster_path}`}
                                className="aboutMovie__poster"
                            />
                        }
                    </div>
                    <div className="aboutMovie__details">
                        {this.state.title && <h1 className="aboutMovie__title">{this.state.title}</h1>}
                        {this.state.genres && <p className="aboutMovie__genres">Genres: {this.makeList(this.state.genres)}</p>}
                        {this.state.release && <p className="aboutMovie__release">Release: {this.state.release}</p>}
                        {this.state.countries && <p className="aboutMovie__country">Country: {this.makeList(this.state.countries)}</p>}
                        {this.state.runtime && <p className="aboutMovie__duration">Duration: {this.state.runtime} min</p>}
                        {this.state.overview && <p className="aboutMovie__overview">{this.state.overview}</p>}
                        <p>Cast</p>
                        <div className="aboutMovie__cast">
                            <button className="aboutMovie__button aboutMovie__button--left">
                            <svg className="aboutMovie__arrow">
                            <use xlinkHref="images/sprite.svg#left"></use>
                           </svg>
                            </button>
                            <div className="aboutMovie__actors">
                                {this.state.cast && this.state.cast.map(actor => (
                                    <Actor
                                        key={actor.id}
                                        base_url={this.props.settings.base_url}
                                        profile_size={this.props.settings.profile_sizes[1]}
                                        profile_path={actor.profile_path}
                                    />
                                ))}
                            </div>
                            <button className="aboutMovie__button aboutMovie__button--right">
                                <svg className="aboutMovie__arrow">
                                 <use xlinkHref="images/sprite.svg#right"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
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