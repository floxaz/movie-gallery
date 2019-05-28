// GENRES REDUCER

const initialState = {
    genreOptions: [],
    chosenGenre: ''
}

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GENRES':
            return {
                ...state,
                genreOptions: [...action.genres]
            };
        case 'CHOOSE_GENRE':
            if (action.genreID !== state.chosenGenre) {
                return {
                    ...state,
                    chosenGenre: action.genreID
                }
            }
        case 'REMOVE_CHOSEN_GENRE':
            return {
                ...state,
                chosenGenre: ''
            }
        default:
            return state;
    }
}

export default genresReducer;