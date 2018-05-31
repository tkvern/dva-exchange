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
      currentOrders: this.props.currentOrders,
      timestep: '',
    }
  }
  render() {
    return (
      <div>
        <TickerPanel {...this.state} />
        <WhiteSpace size="md" />
        <ListPlate />
        <ListOrder />
      </div>
    );
  }
}

export default connect()(Index);
