import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
import { getRecordType } from '../../utils/helper';
import style from './Show.less';

const Item = List.Item;
const Brief = Item.Brief;

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {}
    }
  }
  componentWillMount = async () => {
    const id = window.location.hash.split('/').pop();
    await this.props.dispatch({
      type: 'balance/show',
      payload: {
        id: id
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  render() {
    return (
      <div className={style.content}>

        <List renderHeader={() => '交易信息'} className="my-list">
          <Item extra={
            <span
              className={`${this.state.current.receipt_type === 1 ? 'green' : ''}`}
              style={{ fontSize: '20px' }}>
              {this.state.current.receipt_type === 1 ? '+' : '-'}{this.state.current.amount}</span>}>交易金额
            </Item>
          <Item extra={getRecordType(this.state.current.record_type)}>交易类型</Item>
          <Item extra={this.state.current.created_at}>交易时间</Item>
          <Item extra={this.state.current.record_number}>流水单号</Item>
          <Item>交易备注<Brief>&nbsp;{this.state.current.comment}</Brief></Item>
        </List>
      </div>
    );
  }
}


export default connect()(Show);
