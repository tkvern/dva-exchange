import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace, Toast } from 'antd-mobile';
import { Button } from 'antd';
import moment from 'moment';
import ListPlate from './ListPlate';
import ListOrder from './ListOrder';
// import TickerPanel from './TickerPanel';
import Kline from './Kline';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ticker_price: this.props.ticker_price,
      ticker_percent: this.props.ticker_percent,
      ticker_change: this.props.ticker_change,
      ticker_direction: this.props.ticker_direction,
      ticker_24direction: this.props.ticker_24direction,
      cnyusd: this.props.cnyusd,
      disabled: !!this.props.disabled,
      user: this.props.user,
      canbetList: this.props.canbetList,
      participateList: this.props.participateList,
      processingList: this.props.processingList,
      settledList: this.props.settledList,
      klines: this.props.klines,
      loading: false,
      datetime: 0
    }
  }
  componentWillMount = () => {
    this.props.dispatch({
      type: 'exchange/query',
      payload: {
        per_page: 10,
        datetime: 'now',
        state: 0,
        order_mode: 'asc'
      }
    });
    this.props.dispatch({
      type: 'exchange/participate',
      payload: {
        per_page: 100,
        datetime: 'today',
        is_participate: 1
      }
    });
    this.autoTime();
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  autoTime() {
    this.timer = setTimeout(() => {
      this.setState({
        datetime: moment()
      });
      this.autoTime();
    }, 1000);
  }

  componentDidMount() {
  }
  render() {
    const listPlateProps = {
      user: this.state.user,
      canbetList: this.state.canbetList,
      datetime: this.state.datetime
    }
    const listOrderProps = {
      participateList: this.state.participateList,
      processingList: this.state.processingList,
      settledList: this.state.settledList,
    }
    const klineProps = {
      klines: this.state.klines,
      datetime: this.state.datetime
    }
    return (
      <div>
        <div style={{
          backgroundColor: '#fff',
          height: 56,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 className="section-title" style={{ margin: '0px' }}><span role="img" aria-label="fire">🔥</span>BTC高倍杠杆代投盘<span role="img" aria-label="fire">🔥</span></h1>
        </div>
        <WhiteSpace size="md" />
        {/*<TickerPanel {...this.state} />*/}
        <div style={{
          width: '34px',
          height: '34px',
          position: 'absolute',
          bottom: 40,
          right: 25,
          zIndex: 999
        }}>
          <Button
            type="primary"
            shape="circle"
            icon="sync"
            size="large"
            loading={this.state.loading}
            onClick={() => {
              this.setState({
                loading: true
              });
              this.props.dispatch({
                type: 'exchange/query',
                payload: {
                  per_page: 10,
                  datetime: 'now',
                  state: 0,
                  order_mode: 'asc'
                }
              });
              this.props.dispatch({
                type: 'exchange/participate',
                payload: {
                  per_page: 100,
                  datetime: 'today',
                  is_participate: 1
                }
              });
              this.props.dispatch({
                type: 'exchange/klines',
                payload: {
                  per_page: 45,
                  name: 'btc'
                }
              });
              Toast.loading('数据更新中...', 1, () => {
                this.setState({
                  loading: false
                });
              });
            }} />
        </div>
        <Kline  {...klineProps} />
        {/*<iframe
          src="/tradingView.html"
          frameBorder="0"
          title="tradingView"
          style={{ width: '100%', height: 253, overflow: 'hidden' }}
        />*/}
        <ListPlate {...listPlateProps} />
        <WhiteSpace size="md" />
        <ListOrder {...listOrderProps} />
      </div>
    );
  }
}

export default connect()(Index);
