import { createStore } from 'redux';

export default () => {
    const store = createStore((state = { query: '' }, action) => {
        switch (action.type) {
            case 'SEARCH':
                if (action.query !== state.query) {
                    return { query: action.query };
                }
            default:
                return state;
        }
    },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
