import React from 'react';
import Movie from './Movie';

class Result extends React.Component {
    dbUrl = 'https://api.themoviedb.org/3/';
    state = { key: '98138b2310ee9081572944e69a78f168' };

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.state.key}`);
        const result = await response.json();
        console.log(result);
        this.setState(() => ({
            base_url: result.images.base_url,
            size: result.images.poster_sizes[2]
        }));
    };

    discover = async () => {
        const response = await fetch(`${this.dbUrl}discover/movie?api_key=${this.state.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
        const result = await response.json();
        console.log(result);
        this.setState(() => ({ results: result.results }));
    };

    componentDidMount() {
        this.configuration()
        .then(this.discover());
    };

    render() {
        return (
            <div>
                {this.state.results && this.state.results.map(movie => (
                    <Movie
                        title={movie.title}
                        img={`${this.state.base_url}${this.state.size}${movie.poster_path}`}
                        key={movie.id}
                    />
                ))}
            </div>
        )
    };
}

export default Result;