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
        <header className="header">
            <div className="header__box-arrow">
              <svg className="header__arrow">
                 <use xlinkHref="./images/sprite.svg#icon-arrow-left2"></use>
              </svg>
            </div>
            <div className="row row--flex">
                <div onClick={handleOnHomeClick} className="header__item">
                    <Link to="/" className="header__link">Home</Link>
                </div>
                <div className="header__item">
                    <Link to="/genres" className="header__link">Genres</Link>
                </div>
                <Search location={location} history={history} />
            </div>
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