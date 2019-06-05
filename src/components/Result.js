import React from 'react';
import Movie from './Movie';
import configure from '../actions/configuration';
import { userWentHome } from '../actions/home';
import { userLeftHome } from '../actions/home';
import { selectGenre } from '../actions/genres';
import { searchMovie } from '../actions/searchMovie';
import { gotQueryFromStorage } from '../actions/searchMovie';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

class Result extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = {
        page: 1,
        results: [],
        scrolling: false
    };

    componentDidMount() {
        this._isMounted = true;
        if (!this.props.chosenGenre && location.pathname !== '/') {
            this.props.selectGenre(this.genreFromStorage());
            this.props.userLeftHome();
        }
        if (location.pathname === '/') {
            this.props.gotQueryFromStorage();
            this.searchFromLocalStorage();
        }
        if (Object.entries(this.props.settings).length !== 0) {
            this.makeRequest();
        } else {
            this.configuration()
            .then(this.makeRequest);
        }

        window.addEventListener('scroll', this.onScroll);
    };

    componentDidUpdate(prevProps) {
        if (this.props.searchFor !== prevProps.searchFor && !this.props.queryFromStorage) {
            this.cleanResults();
        }

        if ((this.props.userAtHomePage && this.props.userAtHomePage !== prevProps.userAtHomePage) && this.props.location.pathname === '/') {
            this.cleanResults();
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.onScroll);
    };

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.key}`);
        const result = await response.json();
        this.props.configure(result);
    };

    onScroll = () => {
        if (this.state.scrolling) return;
        const lastMovie = document.querySelector('.movie:last-child');
        const lastMovieOffset = lastMovie.offsetTop + lastMovie.clientHeight;
        const pageOffset = window.scrollY + window.innerHeight;
        const bottomOffset = 70;
        if ((this._isMounted && pageOffset > lastMovieOffset - bottomOffset) && this.state.page < this.state.total_pages) {
            this.setState(prevState => ({
                page: prevState.page + 1,
                scrolling: true
            }),
                this.makeRequest);
        }
    }

    makeRequest = async () => {
        const withGenres = `&with_genres=${this.props.chosenGenre}`;
        let discoverUrl = `${this.dbUrl}discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`;
        const searchMovieUrl = `${this.dbUrl}search/movie?api_key=${this.key}&language=en-US&query=${this.props.searchFor}&page=${this.state.page}&include_adult=false`;
        if (this.props.chosenGenre && location.pathname !== '/') {
            discoverUrl += withGenres;
        }
        const url = this.props.searchFor ? searchMovieUrl : discoverUrl;
        const response = await fetch(url);
        const result = await response.json();
        if (this._isMounted) {
            this.setState(prevState => ({
                scrolling: false,
                total_pages: result.total_pages,
                results: [
                    ...prevState.results,
                    ...result.results
                ]
            }));
        }
    };

    cleanResults = () => {
        this.setState(() => ({
            page: 1,
            results: []
        }), this.makeRequest);
    };

    genreFromStorage = () => {
        const genres = JSON.parse(localStorage.getItem('genres'));
        let genreUrl = this.props.location.pathname.split('/');
        genreUrl = genreUrl[genreUrl.length - 1];
        genreUrl = genreUrl.charAt(0).toUpperCase() + genreUrl.slice(1);
        let chosenGenre = '';
        genres.forEach(current => {
            if (current.name === genreUrl) {
                chosenGenre = current.id;
            }
        });
        return chosenGenre;
    }

    searchFromLocalStorage = () => {
        const query = localStorage.getItem('search');
        if (query) {
            this.props.searchMovie(query);
        }
    }

    render() {
        return (
            <div>
                {this.state.results && this.state.results.map(movie => (
                    <Movie
                        title={movie.title}
                        img={movie.poster_path ? `${this.props.settings.base_url}${this.props.settings.poster_sizes[2]}${movie.poster_path}` : '/images/no-poster.jpg'}
                        vote_average={movie.vote_average}
                        key={uuidv4()}
                        id={movie.id}
                    />
                ))}
            </div>
        )
    };
}

const mapStateToProps = state => ({
    settings: state.configuration,
    searchFor: state.search.query,
    queryFromStorage: state.search.queryFromStorage,
    chosenGenre: state.genres.chosenGenre,
    userAtHomePage: state.home.userAtHomePage
});

const mapDispatchToProps = dispatch => ({
    configure: settings => dispatch(configure(settings)),
    userWentHome: () => dispatch(userWentHome()),
    userLeftHome: () => dispatch(userLeftHome()),
    selectGenre: chosenGenre => dispatch(selectGenre(chosenGenre)),
    searchMovie: query => dispatch(searchMovie(query)),
    gotQueryFromStorage: () => dispatch(gotQueryFromStorage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Result);
