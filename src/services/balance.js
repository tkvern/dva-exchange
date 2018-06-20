import request from '../utils/request';
// import qs from 'qs';
import config from '../config';

export async function show(params) {
  return request(`${config.host}/api/balance_records/${params.id}`);
}
