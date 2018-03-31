//API Endpoints
const local = `http://localhost:${process.env.PORT || 3001}`;

export function getApiEndpoint() {
  if (process.env.API_ENDPOINT) {
    return process.env.API_ENDPOINT;
  } else {
    return local;
  }
}

export const apiEndpoint = getApiEndpoint();
