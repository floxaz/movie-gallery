import React from 'react';
import Footer from './Footer';
import configure from '../actions/configuration';
import { connect } from 'react-redux';

class AboutActor extends React.Component {
    _isMounted = false;
    dbUrl = 'https://api.themoviedb.org/3/';
    key = '98138b2310ee9081572944e69a78f168';
    state = {};

    componentDidMount() {
        this._isMounted = true;
        const actorID = this.props.location.pathname.split('-')[1];
        if(this.props.base_url) {
            this.getActorData(actorID);
        } else {
            this.configuration()
            .then(() => {
                this.getActorData(actorID);
            })
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    configuration = async () => {
        const response = await fetch(`${this.dbUrl}configuration?api_key=${this.key}`);
        const result = await response.json();
        this.props.configure(result);
    }

    getActorData = async id => {
        const response = await fetch(`${this.dbUrl}person/${id}?api_key=${this.key}&language=en-US`);
        const data = await response.json();
        console.log(data);
        this.setState(() => ({
            name: data.name,
            biography: data.biography,
            birthday: data.birthday,
            deathday: data.deathday,
            profile_path: data.profile_path
        }));
    };

    render() {
        return (
            <div className="about">
                <div className="about__wrapper">
                    <div className="row row--about">
                        <div className="about__poster-container">
                            {this.state.profile_path ?
                                <img src={`${this.props.base_url}${this.props.profile_sizes[2]}${this.state.profile_path}`} className="about__poster" />
                                :
                                <img src="images/actor.svg" className="about__no-movie-poster" />
                            }
                        </div>
                        <div className="about__details">
                            {this.state.name && <h1 className="about__title">{this.state.name}</h1>}
                            {this.state.birthday && <p className="about__date">{this.state.birthday}{this.state.deathday && ` — ${this.state.deathday}`}</p>}
                            {this.state.biography ? 
                                <p className="about__overview">{this.state.biography}</p>
                                :
                                <p className="about__overview">No information has been found</p>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

const mapStateToProps = ({ configuration }) => ({
    base_url: configuration.base_url,
    profile_sizes: configuration.profile_sizes
});

const mapDispatchToProps = dispatch => ({
    configure: settigns => dispatch(configure(settigns))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutActor);