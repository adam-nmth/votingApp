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

