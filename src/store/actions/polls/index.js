import { routes } from '../../../utils/apiRoutes';
import fetchMethod from '../../../utils/fetchMethod';

/**********
 * Synchronous actions
 **********/

// set all the polls upon pageload
export const setPolls = data => ({
    type: 'SET_POLLS',
    data
});

// add new poll to the all polls list
export const addNewPoll = data => (dispatch, getState) => {
  const allPolls = getState().polls.all;
  const updatedList = [
    ...allPolls,
    ...data
  ];

  dispatch(setPolls(updatedList));
};

// delete specific poll
export const deletePoll = publicUrl => (dispatch, getState) => {
  const allPolls = getState().polls.all;
  const idx = allPolls.findIndex(x => x.public_url == publicUrl);

  const updatedList = [
    ...allPolls.slice(0, idx),
    ...allPolls.slice(idx + 1)
  ];

  dispatch(setPolls(updatedList))
};

// async actions below

export function fetchCreatePoll(data) {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_CREATE_POLL;

      return fetchMethod(
        "POST",
        url,
        data,
        auth.accessToken,
      )
      .catch(err => console.error(err));
    };
}

export function fetchAllPolls() {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_POLLS;

      return fetchMethod(
        "GET",
        url,
        {},
        auth.accessToken,
      )
      .then((resp) => {
        if (resp.status == 'ok') {
          dispatch(setPolls(resp.data));
        }
      })
      .catch(err => console.error(err));
    };
}

export function fetchSinglePoll(pollId) {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_POLL_ID(pollId);

      return fetchMethod(
        "GET",
        url,
        {},
        auth.accessToken,
      )
      .catch(err => console.error(err));
    };
}

export function fetchVote(vote, pollId) {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_VOTE_ID(pollId);

      return fetchMethod(
        "POST",
        url,
        { vote },
        auth.accessToken,
      )
      .catch(err => console.error(err));
    };
}

export function fetchDeletePoll(pollId) {
    return function(dispatch, getState) {
      const { auth } = getState();
      const url = routes.API_POLL_ID(pollId);

      return fetchMethod(
        "DELETE",
        url,
        {},
        auth.accessToken,
      )
      .catch(err => console.error(err));
    };
}

