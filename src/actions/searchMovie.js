const searchMovie = (query = '') => ({
    type: 'SEARCH',
    query
});

export default searchMovie;