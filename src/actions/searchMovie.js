export const searchMovie = (query = '') => ({
    type: 'SEARCH',
    query
});

export const removeSearch = () => ({
    type: 'REMOVE_SEARCH'
});

export const gotQueryFromStorage = () => ({
    type: 'GOT_QUERY_FROM_STORAGE'
});

export const cancelQueryFromStorage = () => ({
    type: 'CANCEL_QUERY_FROM_STORAGE'
});