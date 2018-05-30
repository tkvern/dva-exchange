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

  // updateTimestep = (timestep) => {
  //   this.setState({
  //     timestep: timestep
  //   });
  // }


  render() {
    return (
      <div>
        <TickerPanel {...this.state} />
        <WhiteSpace size="md" />
        <ListPlate />
        <WhiteSpace size="md" />
        <ListOrder />
      </div>
    );
  }
}

export default connect()(Index);
