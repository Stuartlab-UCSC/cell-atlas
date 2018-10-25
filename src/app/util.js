
// Common utilities.

export const parseFetchedJson = response => {
    return response.json();
}

export const checkFetchStatus = response => {
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

export const fetchError = e => {
    console.error('fetch error:', e);
}

export const isoToday = () => {

    // Get todays date in ISO format such as 2018-08-31.
    let date = new Date()
    let month = date.getMonth() + 1
    month = (month < 10) ? '0' + month : month.toString()
    let day = date.getDate()
    day = (day < 10) ? '0' + day : day.toString()
    return date.getFullYear() + '-' + month + '-' + day
}
