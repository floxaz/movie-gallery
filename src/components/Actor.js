import React from 'react';
import { Link } from 'react-router-dom';
/*
const Actor = ({ base_url, profile_size, profile_path }) => (
    <div className="aboutMovie__actor">
        <Link to="#" className="aboutMovie__link">
            {profile_path ?
                <img
                    src={`${base_url}${profile_size}${profile_path}`}
                    className="aboutMovie__actor-profile"
                />
                :
                <img
                    src="./images/actor.svg"
                    className="aboutMovie__no-actor-profile"
                />
            }
        </Link>
    </div>
);

*/

class Actor extends React.Component {
    //profileWidth = React.createRef();

    componentDidMount() {
        //console.log(this.profileWidth);
    }

    render() {
        return (
            <div className="aboutMovie__actor" /*ref={this.profileWidth}*/>
                <Link to="#" className="aboutMovie__link">
                    {this.props.profile_path ?
                        <img
                            src={`${this.props.base_url}${this.props.profile_size}${this.props.profile_path}`}
                            className="aboutMovie__actor-profile"
                        />
                        :
                        <img
                            src="./images/actor.svg"
                            className="aboutMovie__no-actor-profile"
                        />
                    }
                </Link>
            </div>
        );
    }
}

export default Actor;