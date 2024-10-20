import { makeApiCall, makeApiCallAuthenticated } from './helpers';

export const Login = (payload) => makeApiCall('POST', 'user/login', payload);
export const GetUsers = () => makeApiCallAuthenticated('GET', 'user', {});
