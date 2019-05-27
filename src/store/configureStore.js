import { createStore, combineReducers } from 'redux';
import searchReducer from '../reducers/search';
import genresReducer from '../reducers/genres';

export default () => {
    const store = createStore(
        combineReducers({
            query: searchReducer,
            genres: genresReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
