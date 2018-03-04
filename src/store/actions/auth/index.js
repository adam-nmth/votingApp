/**********
 * Synchronous actions
 **********/

// set all the polls upon pageload
export const setAccessToken = data => ({
    type: 'SET_ACCESS_TOKEN',
    data
});

// set all the polls upon pageload
export const setPersonalData = data => ({
    type: 'SET_PERSONAL_DATA',
    data
});
