import { parse } from 'qs';
import { rate, currentOrders } from '../services/exchange';
import { setLocalStorage, getLocalStorage } from '../utils/helper';

export default {
  namespace: 'exchange',
  state: {
    ticker_price: 0,
    ticker_percent: 0.00,
    ticker_change: 0,
    ticker_direction: '',
    ticker_24direction: '',
    cnyusd: 0,
    currentOrders: [],
  },
  reducers: {
    updateTicker(state, action) {
      return { ...state, ...action.payload };
    },
    updateCnyusd(state, action) {
      return { ...state, ...action.payload };
    },
    updateCurrenrOrders(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    * rate({ payload }, { call, put }) {
      const { data } = yield call(rate);
      if (data && data.rates) {
        setLocalStorage('rates', data.rates);
        yield put({
          type: 'updateCnyusd',
          payload: {
            cnyusd: data.rates['CNY'] / data.rates['USD'],
          }
        })
      }
    },
    * currentOrders({ payload }, { call, put }) {
      const { data } = yield call(currentOrders, parse(payload));
      if (data && data.success) {
        setLocalStorage('currentOrders', data.data);
        yield put({
          type: 'updateCurrenrOrders',
          payload: {
            currentOrders: data.data,
          }
        })
      }
    },
    * checkCache({ payload }, { select, call, put }) {
      const ticker = getLocalStorage('ticker');
      const rates = getLocalStorage('rates');
      // const corders = getLocalStorage('currentOrders');
      // const user = getLocalStorage('user');
      if (ticker) {
        yield put({
          type: 'updateTicker',
          payload: {
            ticker_price: ticker.ticker_price,
            ticker_percent: ticker.ticker_percent,
            ticker_change: ticker.ticker_change,
            ticker_direction: ticker.ticker_direction
          }
        })
      }
      if (rates) {
        yield put({
          type: 'updateCnyusd',
          payload: {
            cnyusd: rates['CNY'] / rates['USD'],
          }
        });
      } else {
        yield put({
          type: 'rate',
        });
      }
      // if (corders) {
      //   yield put({
      //     type: 'updateCurrenrOrders',
      //     payload: {
      //       currentOrders: corders,
      //     }
      //   })
      // } else {
      //   yield put({
      //     type: 'currentOrders',
      //     payload: {
      //       user_id: user.id,
      //       status: 1
      //     }
      //   })
      // }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('exchange')) {
          dispatch({
            type: 'checkCache',
          });
        }
      });
    },
  },
}
