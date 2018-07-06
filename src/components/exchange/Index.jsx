import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace, Toast } from 'antd-mobile';
import { Button } from 'antd';
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
    }
  }
  componentWillMount = () => {
    this.props.dispatch({
      type: 'exchange/query',
      payload: {
        per_page: 300,
        datetime: 'today',
      }
    });
    this.props.dispatch({
      type: 'exchange/klines',
      payload: {
        per_page: 30,
        name: 'btc'
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }
  componentDidMount() {
  }
  render() {
    const listPlateProps = {
      user: this.state.user,
      canbetList: this.state.canbetList,
    }
    const listOrderProps = {
      participateList: this.state.participateList,
      processingList: this.state.processingList,
      settledList: this.state.settledList,
    }
    const klineProps = {
      klines: this.state.klines
    }
    return (
      <div>
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
                  per_page: 300,
                  datetime: 'today',
                }
              });
              this.props.dispatch({
                type: 'exchange/klines',
                payload: {
                  per_page: 30,
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
        <WhiteSpace size="md" />
        {/*<iframe
          src="/tradingView.html"
          frameBorder="0"
          title="tradingView"
          style={{ width: '100%', height: 253, overflow: 'hidden' }}
        />*/}
        <ListPlate {...listPlateProps} />
        <ListOrder {...listOrderProps} />
      </div>
    );
  }
}

export default connect()(Index);
