import React, { Component } from 'react';
import { connect } from 'dva';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';
import Numeral from 'numeral';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import style from './TickerPanel.less';

class TickerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  componentWillMount = () => {
    const that = this;
    this.aggTradeSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
    this.tickerSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    this.aggTradeSocket.onmessage = function (evt) {
      const ticker_cache = getLocalStorage('ticker');
      const received_msg = JSON.parse(evt.data);
      const diff = received_msg['p'] - that.state.ticker_price;
      let direction = '';
      if (diff > 0) {
        direction = 'up';
      } else {
        direction = 'down'
      };
      that.setState({
        ticker_price: received_msg['p'],
        ticker_direction: direction
      })
      setLocalStorage('ticker', {
        ...ticker_cache,
        ticker_price: received_msg['p'],
        ticker_direction: direction
      });
    };
    this.tickerSocket.onmessage = function (evt) {
      const ticker_cache = getLocalStorage('ticker');
      const received_msg = JSON.parse(evt.data);
      let ticker_24direction = '';
      if (received_msg['P'] >= 0) {
        ticker_24direction = 'up'
      } else {
        ticker_24direction = 'down'
      };
      that.setState({
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p'],
        ticker_24direction: ticker_24direction
      })
      setLocalStorage('ticker', {
        ...ticker_cache,
        ticker_percent: received_msg['P'],
        ticker_change: received_msg['p'],
        ticker_24direction: ticker_24direction
      });
    };
  }
  componentWillUnmount = () => {
    this.aggTradeSocket.close();
    this.tickerSocket.close();
  }
  onSubmit = (direction) => {
    Toast.loading('Loading...', 2);
    this.setState({
      disabled: true
    })
    const { price, odds, magnitude, maxPrice, cnyusd, ticker_price } = this.state;
    let user = this.state.user;
    if (price > maxPrice || price < 100) {
      this.setState({
        disabled: false,
      });
      return Toast.fail((<span>请输入正确的金额<br />最低100 CNY</span>), 1);
    }
    this.props.dispatch({
      type: 'exchange/create',
      payload: {
        price: price,
        odds: odds,
        magnitude: magnitude,
        rate: cnyusd,
        ticker_price: ticker_price,
        user_id: user.id,
        direction: direction
      }
    })
    user.balance = user.balance - price;
    setLocalStorage('user', user);
    setTimeout(() => {
      clearTimeout(this);
      Toast.success("下单成功！", 1);
      const currentOrders = getLocalStorage('currentOrders');
      this.setState({
        disabled: false,
        price: 0,
        odds: 20,
        magnitude: '1',
        expected: '0.00',
        currentOrders: currentOrders,
        user: user,
        maxPrice: user.balance
      })
    }, 2000);
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.white}>
          <WingBlank>
            <WhiteSpace size="xl" />
            <div className={`${style.formItem} ${style.antRow}`}>
              <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
              </div>
              <div className={style.embedWrapperBody}>
                <div className={style.tickerContainer}>
                  <div className={style.tickerRow}>
                    <div className={style.tickerItem}>
                      <div className={style.tickerItemHead}>
                        <span className={style.tickerItemTitle}>BTC/USDT</span>
                        <span
                          className={`${style.tickerItemLast} ${this.state.ticker_direction === 'up' ? style.growing : style.falling}`}>
                          ${Numeral(this.state.ticker_price).format('0,0.00')} ≈ ¥{Numeral(this.state.ticker_price * this.state.cnyusd).format('0,0.00')}
                        </span>
                      </div>
                      <div className={`${style.tickerItemBody} ${style[this.state.ticker_percent >= 0 ? 'up' : 'down']}`}>
                        <span className={style.tickerItemChangeDirection}>
                          {this.state.ticker_percent >= 0 ? '↑' : '↓'}
                        </span>
                        <span className={style.tickerItemChangePercent}>{Numeral(this.state.ticker_percent).format('0.00')}%</span>
                        <span className={style.tickerChange}>{Numeral(this.state.ticker_change).format('0,0.00')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default connect()(TickerPanel);
