// SEARCH REDUCER

const initialState = {
    query: '',
    queryFromStorage: false
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH':
            if (action.query !== state.query) {
                return {
                    ...state,
                    query: action.query
                }
            }
        case 'REMOVE_SEARCH':
            return {
                ...state,
                query: ''
            };
        case 'GOT_QUERY_FROM_STORAGE':
            return {
                ...state,
                queryFromStorage: true
            }
        case 'CANCEL_QUERY_FROM_STORAGE':
            return {
                ...state,
                queryFromStorage: false
            }
        default:
            return state;
    }
};

export default searchReducer;