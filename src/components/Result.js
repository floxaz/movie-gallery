import React from 'react';
import Movie from './Movie';

class Result extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    state = { key: '98138b2310ee9081572944e69a78f168' };

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.state.key}`);
        const result = await response.json();
        console.log(result);
        this.setState(() => ({
            page: 1,
            results: [],
            base_url: result.images.base_url,
            size: result.images.poster_sizes[2],
            scrolling: true
        }));
    };

    componentDidMount() {
        this._isMounted = true;
        this.configuration()
            .then(this.discover())

        window.addEventListener('scroll', () => {
            const lastMovie = document.querySelector('.movie:last-child');
            const lastMovieOffset = lastMovie.offsetTop + lastMovie.clientHeight;
            const pageOffset = window.scrollY + window.innerHeight;
            const bottomOffset = 70;
            if (pageOffset > lastMovieOffset - bottomOffset && this.state.scrolling) {
                if (this._isMounted) {
                    this.setState(prevState => ({ page: prevState.page + 1, scrolling: false }));
                    this.discover()
                    .then(this.setState(() => ({ scrolling: true })));
                }
            }
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    discover = async () => {
        const url = `${this.dbUrl}discover/movie?api_key=${this.state.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        this.setState(prevState => ({
            results: [ ...prevState.results, ...result.results ]
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

export default Result;