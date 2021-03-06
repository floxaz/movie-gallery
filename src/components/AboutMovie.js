import React from 'react';
import configure from '../actions/configuration';
import Actor from './Actor';
import Footer from './Footer';
import Loader from './Loader';
import { connect } from 'react-redux';

class AboutMovie extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    castActors = React.createRef();
    state = {
        isLoading: true,
        error: false,
        translate: 0,
        hideLeftButton: true,
        watchedActors: 0,
        carouselTrackWidth: undefined
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
        if (this._isMounted) {
            this.setState(() => ({
                isLoading: false,
                cast: credit.cast,
                remainingActors: credit.cast.length >= 5 ? credit.cast.length - 5 : 0,
                hideRightButton: credit.cast.length <= 5 ? true : false
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

    moveActorsRight = () => {
        const profileWidth = this.castActors.current.children[0].offsetWidth / 10;
        const remainingActors = this.state.remainingActors;
        if (remainingActors === 0) return;
        const actorsToMove = remainingActors > 5 ? 5 : remainingActors;
        // if the actor profile width has not been changed
        if (this.state.translate / this.state.watchedActors === profileWidth || this.state.translate / this.state.watchedActors === 0) {
            this.setState(prevState => ({
                translate: prevState.translate + (profileWidth * actorsToMove),
                remainingActors: prevState.remainingActors <= 5 ? 0 : prevState.remainingActors - 5,
                watchedActors: prevState.watchedActors + actorsToMove
            }), this.hideShowButtons);
        } else {
            // In case it has been changed, adjust carousel transform: transalate, then do the normal work
            this.setState(prevState => ({
                translate: prevState.watchedActors * profileWidth + (profileWidth * actorsToMove),
                remainingActors: prevState.remainingActors <= 5 ? 0 : prevState.remainingActors - 5,
                watchedActors: prevState.watchedActors + actorsToMove
            }), this.hideShowButtons);
        }

    }

    moveActorsLeft = () => {
        const profileWidth = this.castActors.current.children[0].offsetWidth / 10;
        const watchedActors = this.state.watchedActors;
        if (watchedActors === 0) return;
        const actorsToMove = watchedActors > 5 ? 5 : watchedActors;
        // if the actor profile width has not been changed
        if (this.state.translate / this.state.watchedActors === profileWidth || this.state.translate / this.state.watchedActors === 0) {
            this.setState(prevState => ({
                translate: prevState.translate - (profileWidth * actorsToMove),
                remainingActors: prevState.remainingActors + actorsToMove,
                watchedActors: prevState.watchedActors <= 5 ? 0 : prevState.watchedActors - 5,
            }), this.hideShowButtons);
        } else {
            // In case it has been changed, adjust carousel transform: transalate, then do the normal work
            this.setState(prevState => ({
                translate: prevState.watchedActors * profileWidth - (profileWidth * actorsToMove),
                remainingActors: prevState.remainingActors + actorsToMove,
                watchedActors: prevState.watchedActors <= 5 ? 0 : prevState.watchedActors - 5,
            }), this.hideShowButtons);
        }
    }

    hideShowButtons = () => {
        if (this.state.watchedActors > 0) {
            this.setState(() => ({ hideLeftButton: false }));
        } else {
            this.setState(() => ({ hideLeftButton: true }));
        }

        if (this.state.remainingActors === 0) {
            this.setState(() => ({ hideRightButton: true }));
        } else {
            this.setState(() => ({ hideRightButton: false }));
        }
    }

    render() {
        const content = (
            <div className="row row--about">
                <div className="about__poster-container">
                    {this.state.poster_path ?
                        <img
                            src={`${this.props.settings.base_url}${this.props.settings.poster_sizes[3]}${this.state.poster_path}`}
                            className="about__poster"
                        />
                        :
                        <img src="images/no-movie.svg" className="about__no-movie-poster" />
                    }
                </div>
                <div className="about__details">
                    {this.state.title && <h1 className="about__title">{this.state.title}</h1>}
                    {this.state.genres && <p className="about__genres"><span className="about__section">Genres: </span>{this.makeList(this.state.genres)}</p>}
                    {this.state.release && <p className="about__release"><span className="about__section">Release: </span>{this.state.release}</p>}
                    {this.state.countries && <p className="about__country"><span className="about__section">Country: </span>{this.makeList(this.state.countries)}</p>}
                    {this.state.runtime && <p className="about__duration"><span className="about__section">Duration: </span>{this.state.runtime} min</p>}
                    {this.state.overview && <p className="about__overview">{this.state.overview}</p>}
                    <p className="about__cast"><span className="about__section">Cast:</span></p>
                    <div className="about__cast-carousel">
                        <button
                            className="about__button about__button--left"
                            onClick={this.moveActorsLeft}
                            disabled={this.state.hideLeftButton ? true : false}
                        >
                            <svg className="about__arrow">
                                <use xlinkHref="images/sprite.svg#left"></use>
                            </svg>
                        </button>
                        <div className="about__actors">
                            <div
                                className="about__track"
                                style={{
                                    transform: `translateX(-${this.state.translate}rem)`
                                }}
                                ref={this.castActors}
                            >
                                {this.state.cast && this.state.cast.map(actor => (
                                    <Actor
                                        key={actor.id}
                                        base_url={this.props.settings.base_url}
                                        profile_size={this.props.settings.profile_sizes[1]}
                                        profile_path={actor.profile_path}
                                        id={actor.id}
                                        ref={this.actorProfileSize}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className="about__button about__button--right"
                            onClick={this.moveActorsRight}
                            disabled={this.state.hideRightButton ? true : false}
                        >
                            <svg className="about__arrow">
                                <use xlinkHref="images/sprite.svg#right"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
        const showFilm = (
            <div className="about">
                <div className="about__wrapper">
                    {this.state.isLoading ? <Loader /> : content}
                </div>
                <Footer />
            </div>
        );
        const noFilm = (
            <div>
                <h1>The film you requested could not be found</h1>
            </div>
        );

        if (!this.state.error) {
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