
export const makeApiCallAuthenticated = async (method, path, body, token) => {

  try {

    const headers = {
      Authorization: `Bearer ${token || _token}`,
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

const url = (path) => `http://192.168.118.10:8080/api/v1/${path}`
const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg4ZjdjMWI2YmE5MTljZmQxMTQ4NSIsImlhdCI6MTcwMDQ4MTIwNSwiZXhwIjoxNzA4MjU3MjA1fQ.z9GMXfNtl5S34u3mjLYB5qjn5bjAqEtiWsvqsWrd_7k"
//const url = (path) => `http://ecommerce-dev-1572531343.us-east-1.elb.amazonaws.com/api/v1/${path}`