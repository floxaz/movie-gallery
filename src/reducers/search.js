// SEARCH REDUCER

const searchReducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH':
            if (action.query !== state) {
                return action.query;
            }
        case 'REMOVE_SEARCH':
            return '';
        default:
            return state;
    }
};

export default searchReducer;