import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace, WingBlank } from 'antd-mobile';
import moment from 'moment';
import ItemPlate from './ItemPlate';
import style from './ListPlate.less';

class ListPlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canbetList: this.props.canbetList,
      user: this.props.user,
      datetime: this.props.datetime
    }
  }
  componentWillMount() {
    // this.autoTime();
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
    if (nextProps.canbetList.length > 0) {
      const total = moment(nextProps.canbetList[0].bet_stop_time).diff(this.state.datetime, 'seconds');
      if (total <= 0) {
        this.timer = setTimeout(() => {
          console.log('刷新');
          this.props.dispatch({
            type: 'exchange/query',
            payload: {
              per_page: 10,
              datetime: 'now',
              state: 0,
              order_mode: 'asc'
            }
          });
        }, 5000);
      }
    }
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  // autoTime() {
  // this.timer = setTimeout(() => {
  //   this.setState({
  //     datetime: moment()
  //   });
  //   this.autoTime();
  // }, 1000);
  // }
  render() {
    const ListData = this.state.canbetList;
    const ListItem = [];
    ListData.forEach((item, index) => {
      ListItem.push(<WhiteSpace key={-index} size="md" />);
      ListItem.push(
        <ItemPlate
          key={item.id}
          data={item}
          user={this.state.user}
          datatime={this.state.datetime} />);
    });
    if (ListItem.length <= 0) {
      ListItem.push(<WhiteSpace key="0" size="md" />);
      ListItem.push(
        <div key="1" className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank style={{ textAlign: 'center' }}>
            <h3>当前没有可下注交易盘</h3>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>);
    }
    return (
      <div className={style.content}>
        {ListItem}
      </div>
    );
  }
}

export default connect()(ListPlate);
