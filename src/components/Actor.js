import React from 'react';
import { Link } from 'react-router-dom';

const Actor = ({ base_url, profile_size, profile_path, index }) => (
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

export default Actor;