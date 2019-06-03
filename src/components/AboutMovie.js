import React from 'react';

class AboutMovie extends React.Component {
    key = '98138b2310ee9081572944e69a78f168';
    state = {
        title: undefined,
        overview: undefined,
        error: false
    }
    componentDidMount() {
        const movieID = this.props.location.pathname.split('-')[1];
        this.getMovieInfo(movieID);
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

export default AboutMovie;