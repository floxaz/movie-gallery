import React from 'react';
import { Link } from 'react-router-dom';

const Actor = ({ base_url, profile_size, profile_path, id }) => (
    <div className="about__actor">
        <Link to={`/actor-${id}`} className="about__link">
            {profile_path ?
                <img
                    src={`${base_url}${profile_size}${profile_path}`}
                    className="about__actor-profile"
                />
                :
                <img
                    src="./images/actor.svg"
                    className="about__no-actor-profile"
                />
            }
        </Link>
    </div>
)

export default Actor;