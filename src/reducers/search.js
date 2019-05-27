// SEARCH REDUCER

const searchReducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH':
            if (action.query !== state) {
                return action.query;
            }
        default:
            return state;
    }
};

export default searchReducer;