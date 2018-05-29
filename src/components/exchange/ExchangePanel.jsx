import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, Flex, Card, Badge, Tabs } from 'antd-mobile';
import { Table } from 'antd';
import style from './ExchangePanel.less';
import Numeral from 'numeral';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';
import ExchangeOrderPanel from './ExchangeOrderPanel';

let aggTradeSocket;
let tickerSocket;
class ExchangePanel extends PureComponent {
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
    const columns = [{
      title: '下单时间',
      dataIndex: 'datetime',
      key: 'datetime',
    }, {
      title: '委托',
      dataIndex: 'consign',
      key: 'consign',
      render: (text) => {
        if (text) {
          return <Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
        } else {
          return <Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
        }
      }
    }, {
      title: '盈亏',
      dataIndex: 'profit',
      key: 'profit',
      align: 'right',
      render: (text) => {
        if (text > 0) {
          return <span className="green">{text}</span>
        } else {
          return <span className="red">{text}</span>
        }
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">详情</a>
        </span>
      ),
    }];
    const data = [{
      key: '1',
      datetime: '05-16 20:15',
      consign: 1,
      profit: 4785,
    }, {
      key: '2',
      datetime: '05-16 20:15',
      consign: 1,
      profit: -325,
    }, {
      key: '3',
      datetime: '05-16 20:15',
      consign: 0,
      profit: 584,
    }];
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
                      <div className={`${style.tickerItemBody} ${style[this.state.ticker_24direction]}`}>
                        <span className={style.tickerItemChangeDirection}>
                          {this.state.ticker_24direction === 'up' ? '↑' : '↓'}
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
        <div className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank>
            <div className={`${style.formItem} ${style.antRow}`}>
              <Flex style={{ alignItems: 'baseline' }}>
                <Flex.Item style={{ flex: '3 1 0%' }}>
                  <label style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>BTC-USDT交易盘</label>
                </Flex.Item>
                <Flex.Item style={{ textAlign: 'right' }} onClick={() => { Toast.info("正在施工！", 1) }}>
                  <span style={{ color: 'rgb(51, 163, 244)' }}>详情</span>
                </Flex.Item>
              </Flex>
            </div>
            <Flex align="start">
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                    <label>08-15 20:15</label>
                  </div>
                  {/*<div className={style.itemLabel}>
                    <label title="配资交易所">配资交易所: 火币</label>
                  </div>
                  <div className={style.itemLabel}>
                    <label title="交易手续费">交易手续费: 3.7% (本金)</label>
                  </div*/}
                  <WhiteSpace size="lg" />
                  <div className={style.itemLabel}>
                    <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                    <label>涨1% 或 跌1%</label>
                  </div>
                  {/*<WhiteSpace size="lg" />
                  <div className={style.itemLabel}>
                    <label title="杠杆倍数" style={{ color: '#888' }}>杠杆倍数: </label>
                    <label>100倍</label>
                  </div>*/}
                  <WhiteSpace size="lg" />
                  <div className={style.itemLabel}>
                    <label title="买对收益" style={{ color: '#888' }}>买对收益: </label>
                    <label>+87%</label>
                  </div>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="账户余额">账户余额: {Numeral(this.state.maxPrice).format('0,0.00')} CNY</label>
                  </div>
                  <InputItem
                    name="price"
                    type="money"
                    placeholder="0"
                    min={1}
                    clear
                    error={this.state.hasPriceError}
                    onErrorClick={() => {
                      if (this.state.hasPriceError) {
                        Toast.info('可用金额不足!');
                      }
                    }}
                    extra="CNY"
                    value={this.state.price}
                    onChange={(price) => {
                      let cprice = Numeral(price).value() || 0;
                      cprice > this.state.maxPrice ?
                        this.setState({ hasPriceError: true }) : this.setState({ hasPriceError: false });
                      this.setState({ price: cprice.toString() });
                      this.sumExpected(cprice, this.state.odds, this.state.magnitude);
                    }}
                  />
                  <WhiteSpace size="xs" />
                  <div className={style.itemTip}>
                    <label title="usdt">买对收益≈ {Numeral(this.state.price / this.state.cnyusd).format('0,0.00')} CNY</label>
                  </div>
                </div>
                <WhiteSpace size="md" />
                <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                  <Button
                    className="am-green"
                    type="default"
                    onClick={() => {
                      this.onSubmit('up');
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买涨</Button>
                  <Button
                    className="am-red"
                    type="default"
                    onClick={() => {
                      this.onSubmit('down');
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买跌</Button>
                  {/*<label title="tip" className="red">下单时间: {this.state.timestep}</label>*/}
                </div>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </div>

        <WhiteSpace size="md" />
        <div className={style.white}>
          <Tabs tabs={[
            { title: <Badge text={'2'}>进行中</Badge> },
            { title: <Badge text={'今日(3)'}>已结算</Badge> },
          ]}
            initialPage={1}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div style={{ minMeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                <Card>
                  <Card.Header
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC-USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>8417.65 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算波动" style={{ color: '#888' }}>结算波动: </label>
                            <label>币价 5%</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="当前价格" style={{ color: '#888' }}>当前价格: </label>
                            <label><span className="red">8417.65 -0.1%</span></label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="我的操作" style={{ color: '#888' }}>我的操作: </label>
                            <label><Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} /></label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                            <label>8417.65</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC-USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>8417.65 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算波动" style={{ color: '#888' }}>结算波动: </label>
                            <label>币价 5%</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="当前价格" style={{ color: '#888' }}>当前价格: </label>
                            <label><span className="green">8417.65 +0.1%</span></label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="我的操作" style={{ color: '#888' }}>我的操作: </label>
                            <label><Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} /></label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                            <label>8417.65</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
              </WingBlank>
            </div>
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                footer={() => <span style={{ color: 'rgb(51, 163, 244)' }}>查看全部</span>}
              />
            </div>
          </Tabs>
          <WhiteSpace size="xl" />
        </div>
      </div>
    );
  }
}

export default connect()(ExchangePanel);
