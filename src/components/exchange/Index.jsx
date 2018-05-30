import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';
import Numeral from 'numeral';
import ListPlate from './ListPlate';
import ListOrder from './ListOrder';
import style from './Index.less';

let aggTradeSocket;
let tickerSocket;
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      odds: 20,
      magnitude: '1',
      expected: '0.00',
      maxPrice: this.props.user.balance,
      hasPriceError: false,
      ticker_price: this.props.ticker_price,
      ticker_percent: this.props.ticker_percent,
      ticker_change: this.props.ticker_change,
      ticker_direction: this.props.ticker_direction,
      ticker_24direction: this.props.ticker_24direction,
      cnyusd: this.props.cnyusd,
      disabled: !!this.props.disabled,
      user: this.props.user,
      currentOrders: this.props.currentOrders,
      timestep: '',
    }
  }

  componentWillMount = () => {
    const that = this;
    aggTradeSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@aggTrade");
    tickerSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    aggTradeSocket.onmessage = function (evt) {
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
    tickerSocket.onmessage = function (evt) {
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

  // componentDidMount = () => {
  //   let total = 120 * 1000; // 6秒
  //   let timestep = "";
  //   let updateTimestep = this.updateTimestep;
  //   let timer = setInterval(function () {
  //     total = total - 57;
  //     if (total <= 0) {
  //       clearInterval(timer);
  //       // tiktock.innerHTML = "0:00";
  //       timestep = "0:00.000";
  //     } else {
  //       var ss = Math.floor(total / 1000) % 60;
  //       var mm = Math.floor((total / 1000) / 60);
  //       var ms = total - Math.floor(total / 1000) * 1000;
  //       // tiktock.innerHTML = ss + ":" + ms;
  //       ss = ss < 10 ? '0' + ss : ss;
  //       mm = mm < 10 ? '0' + mm : mm;
  //       ms = ms < 100 ? '0' + ms : ms;
  //       timestep = mm + ':' + ss + '.' + ms;
  //     }
  //     updateTimestep(timestep);
  //   }, 57);
  // }

  componentWillUnmount = () => {
    aggTradeSocket.close();
    tickerSocket.close();
  }

  updateTimestep = (timestep) => {
    this.setState({
      timestep: timestep
    });
  }

  sumExpected(price, odds, magnitude) {
    let expected;
    switch (magnitude) {
      case "1":
        expected = price * odds * 0.01;
        break;
      case "2":
        expected = price * odds * 0.02;
        break;
      case "5":
        expected = price * odds * 0.05;
        break;
      case "4":
        expected = price * odds * 0.01;
        break;
      case "10":
        expected = price * odds * 0.01;
        break;
      case "24":
        expected = price * odds * 0.01;
        break;
      default: ;
    }
    return this.setState({ expected: Numeral(expected).format('0,0.00') });
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
      <div>
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
        <WhiteSpace size="md" />
        <ListPlate />
        <WhiteSpace size="md" />
        <ListOrder />
      </div>
    );
  }
}

export default connect()(Index);
