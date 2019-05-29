const initialState = {
    userAtHomePage: true
}

const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_CLICKED_GENRES':
            return {
                userAtHomePage: false
            }
        case 'USER_WENT_HOME':
            return {
                userAtHomePage: true
            }
        default:
            return state;
    }
}

export default homeReducer;