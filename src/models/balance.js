import { parse } from 'qs';
import { show } from '../services/balance';

export default {
  namespace: 'balance',
  state: {
    current: {},
  },
  reducers: {
    showSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    * show({ payload }, { call, put }) {
      const { data } = yield call(show, parse(payload));
      if (data && data.err_code === 0) {
        yield put({
          type: 'showSuccess',
          payload: {
            current: data.balance_record
          }
        });
      }
    },
  },
  subscriptions: {
  },
}
