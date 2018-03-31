//API Endpoints
const local = `http://localhost:${process.env.PORT || 3001}`;

export function getApiEndpoint() {
  console.log(process.env);
  if (process.env.NODE_ENV === "production") {
    return 'https://aqueous-reef-14051.herokuapp.com'
  } else {
    return local;
  }
}

export const apiEndpoint = getApiEndpoint();
