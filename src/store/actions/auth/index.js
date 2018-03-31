import { routes } from '../../../utils/apiRoutes';
import fetchMethod from '../../../utils/fetchMethod';

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

// async actions below

export function fetchPersonalData() {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_PERSONAL;

      return fetchMethod(
        "GET",
        url,
        {},
        auth.accessToken,
      )
      .then(res => {
        if(res.status == 'ok'){
          dispatch(setPersonalData(res.data));
        }

        return res;
      })
    };
}

export function fetchLogin(data) {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.LOGIN;

      return fetchMethod(
        "POST",
        url,
        data,
        auth.accessToken,
      )
      .then(({ token }) => {
        if(token){
          localStorage.setItem('accessToken', token);
          dispatch(setAccessToken(token));
        }
      })
    };
}

export function fetchRegister(data) {
    return function(dispatch, getState) {
      const url = routes.REGISTER;

      return fetchMethod(
        "POST",
        url,
        data,
      )
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('accessToken', token);
          dispatch(setAccessToken(token));
          return token;
        }
      });
    };
}
