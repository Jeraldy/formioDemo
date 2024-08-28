
export const makeApiCallAuthenticated = async (method, path, body) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }

    const params = { method, headers, body: JSON.stringify(body), }
    if (["GET", "DELETE"].includes(method)) delete params.body;

    const response = await fetch(url(path), params);
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
    const response = await fetch(url(path), {
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

const localUrl = (path) => `http://localhost:8080/api/v1/`;
const url = (path) => `${process.env.BASE_URL || localUrl(path)}${path}`;
