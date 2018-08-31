
// Common utilities.

export function parseFetchedJson (response) {
    return response.json();
}

export function checkFetchStatus (response) {
    if (response.ok) {
        if (response.status === 200) {
            return response;
        } else if (response.status === 204) {
            throw new Error('204');
        } else {
            throw new Error(response.status + ': ' + response.statusText);
        }
    }
    throw new Error(response.status);
}

export function fetchError(e) {
    console.error('fetch error:', e);
}
