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

// reset auth of the person on logout
export const resetAuth = data => {
  localStorage.removeItem('accessToken');

  return {
    type: 'RESET_AUTH',
  }
};
