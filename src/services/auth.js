import request from '../utils/request';
import config from '../config';

export async function login(params) {
  return request(`${config.host}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function query(params) {
  return request(`${config.host}/api/auth/me`, {
    method: 'POST'
  });
}
