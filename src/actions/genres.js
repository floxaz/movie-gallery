export const addGenres = ( genres = []) => ({
    type: 'GENRES',
    genres
});

export const chooseGenre = (genreID = undefined) => ({
    type: 'CHOOSE_GENRE',
    genreID
});

export const removeChosenGenre = () => ({
    type: 'REMOVE_CHOSEN_GENRE'
});