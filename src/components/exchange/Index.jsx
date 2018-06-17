import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import ListPlate from './ListPlate';
import ListOrder from './ListOrder';
import TickerPanel from './TickerPanel';
// import style from './Index.less';

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
        size: 100,
        datetime: 'today',
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
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
        <TickerPanel {...this.state} />
        <WhiteSpace size="md" />
        <ListPlate {...listPlateProps} />
        <WhiteSpace size="md" />
        <ListOrder {...listOrderProps} />
      </div>
    );
  }
}

export default connect()(Index);
