import { createStore } from 'redux';

export default () => {
    const store = createStore((state = { query: '', genres: [] }, action) => {
        switch (action.type) {
            case 'SEARCH':
                if (action.query !== state.query) {
                    return { query: action.query };
                }
            case 'GENRES':
                return { genres: action.genres };
            default:
                return state;
        }
    },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
