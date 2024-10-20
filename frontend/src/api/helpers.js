
const URL = `http://${window.location.hostname}:8090/api/v1`;

export const makeApiCallAuthenticated = async (method, path, body) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    const params = { method, headers, body: JSON.stringify(body), }
    if (["GET", "DELETE"].includes(method)) delete params.body;

    const response = await fetch(`${URL}/${path}`, params);
    if (method === "DELETE" && response.ok) {
      return { status: "success" }
    }
    return response.json()
  } catch (error) {
    console.error(error.message);
  }
  return Promise.resolve();
};

export const makeApiCall = async (method, path, body) => {
  try {
    const response = await fetch(`${URL}/${path}`, {
      method, body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
  return Promise.resolve();
};


export const CrudApi = (path) => {
  return {
    Create: (payload) => makeApiCallAuthenticated('POST', path, payload),
    Update: (id, payload) => makeApiCallAuthenticated('PATCH', `${path}/${id}`, payload),
    GetAll: (params='') => makeApiCallAuthenticated('GET', `${path}/?${params}`, {}),
    GetOne: (id) => makeApiCallAuthenticated('GET', `${path}/${id}`, {}),
    DeleteOne: (id) => makeApiCallAuthenticated('DELETE', `${path}/${id}`, {})
  }
}
