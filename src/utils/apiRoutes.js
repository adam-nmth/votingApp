import { apiEndpoint } from './envHelper';

const host = apiEndpoint;

export const routes = {
  API_CREATE_POLL: `${host}/api/create/poll`,
  API_PERSONAL: `${host}/api/personal`,
  LOGIN: `${host}/login`,
  API_POLLS: `${host}/api/polls`,
  REGISTER: `${host}/register`,
  API_POLL_ID: pollId => `${host}/api/poll/${pollId}`,
  API_VOTE_ID: pollId => `${host}/api/vote/${pollId}`
};
