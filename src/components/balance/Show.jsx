import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import style from './Show.less';

const Item = List.Item;
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      user: this.props.user
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    // this.setState({
    //   [key]: true,
    // });
  }

  render() {
    return (
      <div className={style.content}>

        <List renderHeader={() => '交易信息'} className="my-list">
          <Item extra={<span className="green" style={{ fontSize: '20px' }}>+1500</span>}>交易金额</Item>
          <Item extra={'充值'}>交易类型</Item>
          <Item extra={'2018-05-08 16:18:23'}>交易时间</Item>
          <Item extra={'892312FNFA812GEFB'}>流水单号</Item>
          <Item extra={'客服充值'}>交易备注</Item>
        </List>
      </div>
    );
  }
}


export default connect()(Show);
