export const searchMovie = (query = '') => ({
    type: 'SEARCH',
    query
});

export const removeSearch = () => ({
    type: 'REMOVE_SEARCH'
});