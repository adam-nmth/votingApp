//API Endpoints
const local = `http://localhost:${process.env.PORT || 3001}`;

export function getApiEndpoint() {
  console.log(process.env);
  if (process.env.PORT) {
    return local
  } else {
    return local;
  }
}

export const apiEndpoint = getApiEndpoint();
