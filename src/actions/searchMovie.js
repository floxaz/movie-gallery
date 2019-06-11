export const searchMovie = (query = '') => {
    console.log(query);
    return {
        type: 'SEARCH',
        query
    }
};

export const removeSearch = () => ({
    type: 'REMOVE_SEARCH'
});

export const gotQueryFromStorage = () => ({
    type: 'GOT_QUERY_FROM_STORAGE'
});

export const cancelQueryFromStorage = () => ({
    type: 'CANCEL_QUERY_FROM_STORAGE'
});