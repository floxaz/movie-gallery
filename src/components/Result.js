import React from 'react';
import Movie from './Movie';
import { connect } from 'react-redux';

class Result extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = { 
        scrolling: false
    };

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.key}`);
        const result = await response.json();
        console.log(result);
        this.setState(() => ({
            page: 1,
            results: [],
            base_url: result.images.base_url,
            size: result.images.poster_sizes[2],
        }));
    };

    componentDidMount() {
        this._isMounted = true;
        this.configuration()
            .then(this.discover())

        window.addEventListener('scroll', () => {
            if (this.state.scrolling) return;
            const lastMovie = document.querySelector('.movie:last-child');
            const lastMovieOffset = lastMovie.offsetTop + lastMovie.clientHeight;
            const pageOffset = window.scrollY + window.innerHeight;
            const bottomOffset = 70;
            if (pageOffset > lastMovieOffset - bottomOffset && this._isMounted) {
                this.setState(prevState => ({
                    page: prevState.page + 1,
                    scrolling: true
                }),
                this.discover);
            }
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    discover = async () => {
        const url = `${this.dbUrl}discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        this.setState(prevState => ({
            scrolling: false,
            results: [ 
                ...prevState.results, 
                ...result.results 
            ]
        }));
    };

    cleanResults = () => {
        this.setState(() => ({
            page: 1,
            results: []
        }));
    };

    render() {
        return (
            <div>
                {this.state.results && this.state.results.map(movie => (
                    <Movie
                        title={movie.title}
                        img={movie.poster_path ? `${this.state.base_url}${this.state.size}${movie.poster_path}` : './images/no-poster.jpg'}
                        vote_average={movie.vote_average}
                        key={movie.id}
                    />
                ))}
            </div>
        )
    };
}

const mapStateToProps = state => ({
    searchFor: state.query
});

export default connect(mapStateToProps)(Result);