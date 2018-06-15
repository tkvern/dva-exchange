import request, { requestClean } from '../utils/request';
import qs from 'qs';
import config from '../config';

export async function rate() {
  return requestClean('http://data.fixer.io/api/latest?access_key=b8b834deefb5c3da00b829f29197e53c');
}

export async function currentOrders(params) {
  return request(`/api/orders/current`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function query(params) {
  return request(`${config.host}/api/bets?${qs.stringify(params)}`);
}

// export async function create(params) {
//   return request(`/api/orders/create`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//   })
// }
