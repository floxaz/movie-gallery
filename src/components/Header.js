import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { removeChosenGenre } from '../actions/genres';
import { userWentHome } from '../actions/home';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Header = ({ chosenGenre, removeChosenGenre, userWentHome, location, history }) => {
    const handleOnHomeClick = () => {
        if(location.pathname !== '/') {
            userWentHome();
        }

        if (chosenGenre) {
            removeChosenGenre();
        }
    }

    return (
        <header>
            <div onClick={handleOnHomeClick}>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/genres">Genres</Link>
            </div>
            <Search location={location} history={history} />
        </header>
    )
}

const mapStateToProps = ({ genres }) => ({
    chosenGenre: genres.chosenGenre
});

const mapDispatchToProps = dispatch => ({
    removeChosenGenre: () => dispatch(removeChosenGenre()),
    userWentHome: () => dispatch(userWentHome())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));