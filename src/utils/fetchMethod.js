const fetchMethod = (method, url, body = {}, oauth_token, stringify = true, language = 'de') => {
    const contentType = (body instanceof FormData) ? "multipart/form-data" : "application/json";

    let data = {
        method: method,
        headers: {
          //  'Accept': 'application/json',
            'Content-Type': contentType,
        }
    };

    // allow making requests without setting Authorization field, that could lead to errors
    if(!!oauth_token)
      data.headers['Authorization'] = oauth_token;

    if(method !== 'GET')
        data.body = stringify ? JSON.stringify(body) : body;

    return fetch(url, data)
        //response to json
        .then(response => response.json())
}

export default fetchMethod;
