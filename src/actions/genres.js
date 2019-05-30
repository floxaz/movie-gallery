export const addGenres = (genres = []) => ({
    type: 'ADD_GENRES',
    genres
});

export const selectGenre = chosenGenre => ({
    type: 'CHOOSE_GENRE',
    chosenGenre
})

export const removeChosenGenre = () => ({
    type: 'REMOVE_CHOSEN_GENRE'
});