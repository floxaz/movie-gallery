export const addGenres = (genres = []) => ({
    type: 'GENRES',
    genres
});

export const selectGenre = chosenGenre => ({
    type: 'CHOOSE_GENRE',
    chosenGenre
})

export const removeChosenGenre = () => ({
    type: 'REMOVE_CHOSEN_GENRE'
});