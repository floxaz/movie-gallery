import React from 'react';
import Movie from './Movie';
import { connect } from 'react-redux';

class Result extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = {
        page: 1,
        results: [],
        scrolling: false
    };

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.key}`);
        const result = await response.json();
        console.log(result);
        this.setState(() => ({
            base_url: result.images.base_url,
            size: result.images.poster_sizes[2],
        }), this.makeRequest);
    };

    componentDidMount() {
        this._isMounted = true;
        this.configuration();

        window.addEventListener('scroll', () => {
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
        });
    };

    componentDidUpdate(prevProps) {
        if(this.props.searchFor !== prevProps.searchFor) {
            this.cleanResults();
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    makeRequest = async () => {
        const discoverUrl = `${this.dbUrl}discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`;
        const searchMovieUrl = `${this.dbUrl}search/movie?api_key=${this.key}&language=en-US&query=${this.props.searchFor}&page=${this.state.page}&include_adult=false`
        const url = this.props.searchFor ? searchMovieUrl : discoverUrl;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
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