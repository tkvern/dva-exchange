import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
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
    return (
      <div>
        {/*<TickerPanel {...this.state} />*/}
        <Kline />
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
