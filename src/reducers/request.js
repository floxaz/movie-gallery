const initialState = {
    isLargeScreen: false,
    doubleRequestMade: false
}

const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LARGE_SCREEN':
            return {
                ...state,
                isLargeScreen: true
            };
        case 'NO_LARGE_SCREEN':
            return {
                ...state,
                isLargeScreen: false
            };
        case 'MAKE_DOUBLE_REQUEST':
            return {
                ...state,
                doubleRequestMade: true
            };
        case 'UNMAKE_DOUBLE_REQUEST':
            return {
                ...state,
                doubleRequestMade: false
            };
        default:
            return state;
    }
};

export default requestReducer;