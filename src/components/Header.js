import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { removeSearch } from '../actions/searchMovie';
import { cancelQueryFromStorage } from '../actions/searchMovie';
import { removeChosenGenre } from '../actions/genres';
import { userWentHome } from '../actions/home';
import { unmakeDoubleRequest } from '../actions/request'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Header = ({ chosenGenre, removeChosenGenre, userWentHome, location, history, search, removeSearch, queryFromStorage, cancelQueryFromStorage, isLargeScreen, doubleRequestMade, unmakeDoubleRequest }) => {
    const handleOnHomeClick = () => {
        if(location.pathname !== '/') {
            userWentHome();
        }
        if(isLargeScreen) {
            unmakeDoubleRequest();
        }
        if(search) {
            removeSearch();
            localStorage.setItem('search', '');
            if(queryFromStorage) {
                cancelQueryFromStorage();
            }

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

const mapStateToProps = ({ genres, search, request }) => ({
    search: search.query,
    queryFromStorage: search.queryFromStorage,
    chosenGenre: genres.chosenGenre,
    isLargeScreen: request.isLargeScreen,
    doubleRequestMade: request.doubleRequestMade
});

const mapDispatchToProps = dispatch => ({
    removeSearch: () => dispatch(removeSearch()),
    cancelQueryFromStorage: () => dispatch(cancelQueryFromStorage()),
    removeChosenGenre: () => dispatch(removeChosenGenre()),
    userWentHome: () => dispatch(userWentHome()),
    unmakeDoubleRequest: () => dispatch(unmakeDoubleRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));