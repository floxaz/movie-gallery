const configurationReducer = (state = {}, action) => {
    switch(action.type) {
        case 'CONFIGURE':
            return { ...action.images };
        default:
            return state;
    }
}

export default configurationReducer;