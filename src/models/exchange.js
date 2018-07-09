import { parse } from 'qs';
import { query, create, show, rate, currentOrders, klines } from '../services/exchange';
import { setLocalStorage, getLocalStorage } from '../utils/helper';
import { Toast } from 'antd-mobile';
import moment from 'moment';

export default {
  namespace: 'exchange',
  state: {
    ticker_price: 0,
    ticker_percent: 0.00,
    ticker_change: 0,
    ticker_direction: '',
    ticker_24direction: '',
    cnyusd: 0,
    canbetList: [],
    participateList: [],
    processingList: [],
    settledList: [],
    current: {},
    klines: []
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    updateTicker(state, action) {
      return { ...state, ...action.payload };
    },
    showSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    recoredSuccess(state, action) {
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
    * query({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data && data.err_code === 0) {
        const canbetList = data.list.filter((item) => {
          return moment(item.bet_stop_time).diff(moment(), 'seconds') > 0 &&
            moment(item.bet_time).diff(moment(), 'seconds') < 0 &&
            item.state === 0;
        });
        yield put({
          type: 'querySuccess',
          payload: {
            canbetList: canbetList,
          },
        });
      }
    },
    * participate({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data && data.err_code === 0) {
        const participateList = data.list.filter((item) => {
          return item.bet_orders.length > 0;
        });
        yield put({
          type: 'querySuccess',
          payload: {
            participateList: participateList,
          },
        });
      }
    },
    * klines({ payload }, { call, put }) {
      const { data } = yield call(klines, parse(payload));
      if (data && data.err_code === 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            klines: data.list
          }
        });
      }
    },
    * create({ payload }, { call, put }) {
      const { data } = yield call(create, parse(payload));
      if (data && data.err_code === 0) {
        Toast.success("下注成功", 1.5);
        // yield put({
        //   type: 'query',
        //   payload: {
        //     per_page: 10,
        //     datetime: 'now',
        //     state: 0,
        //     order_mode: 'asc'
        //   }
        // });
        yield put({
          type: 'participate',
          payload: {
            per_page: 100,
            datetime: 'today',
            is_participate: 1
          }
        });
        const user = getLocalStorage('user');
        user.balance = user.balance - payload.amount;
        setLocalStorage('user', user);
        yield put({
          type: 'auth/loginSuccess',
          payload: {
            user: user,
          }
        });
      } else {
        Toast.fail(data.err_msg, 1.5);
      }
    },
    * show({ payload }, { call, put }) {
      const { data } = yield call(show, parse(payload));
      if (data && data.err_code === 0) {
        yield put({
          type: 'showSuccess',
          payload: {
            current: data.bet
          }
        });
      }
    },
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
