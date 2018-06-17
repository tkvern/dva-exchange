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
      datetime: 0
    }
  }
  componentWillMount() {
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
  render() {
    const ListData = this.state.canbetList;
    const ListItem = [];
    ListData.forEach((item, index) => {
      ListItem.push(
        <ItemPlate
          key={item.id}
          data={item}
          user={this.state.user}
          datatime={this.state.datetime} />);
      ListItem.push(<WhiteSpace key={-index} size="md" />);
    });
    if (ListItem.length <= 0) {
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
