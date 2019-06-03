import { createStore, combineReducers } from 'redux';
import searchReducer from '../reducers/search';
import genresReducer from '../reducers/genres';
import homeReducer from '../reducers/home';
import configurationReducer from '../reducers/configuration';

export default () => {
    const store = createStore(
        combineReducers({
            configuration: configurationReducer,
            search: searchReducer,
            genres: genresReducer,
            home: homeReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
