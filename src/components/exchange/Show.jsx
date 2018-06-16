import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Steps, Badge } from 'antd-mobile';
import { Table } from 'antd';
import moment from 'moment';
import style from './Show.less';

const Item = List.Item;
class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current
    }
  }
  componentWillMount = () => {
    const id = window.location.hash.split('/').pop();
    this.props.dispatch({
      type: 'exchange/show',
      payload: {
        id: id
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  render() {
    const columns = [{
      title: '委托时间',
      dataIndex: 'created_at',
      render: (text) => {
        return moment(text).format('MM-DD HH:mm:ss')
      },
    }, {
      title: '委托',
      dataIndex: 'type',
      render: (text) => {
        if (text) {
          return <Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
        } else {
          return <Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
        }
      }
    }, {
      title: '本金',
      dataIndex: 'amount',
      align: 'right',
    }, {
      title: '盈亏',
      dataIndex: 'profit',
      align: 'right',
      render: (text) => {
        if (text > 0) {
          return <span className="green">{text}</span>
        } else {
          return <span className="red">{text}</span>
        }
      }
    }];
    const data = this.state.current.bet_orders || [];
    data.forEach((item) => {
      item['key'] = item.id
    });
    return (
      <div className={style.content} >
        <List renderHeader={() => '进度信息'} className="my-list">
          <Item>
            <WhiteSpace size="xl" />
            <Steps size="small" current={2}>
              <Steps.Step title="开始" description={
                <div>
                  <span>05-15 12:30 开放下单</span><br />
                  <span>05-15 12:31 创建订单</span><br />
                  <span>05-15 13:30 停止下单</span>
                </div>
              } />
              <Steps.Step title="配资" description={
                <div>
                  <span>05-15 14:30 配资中</span><br />
                  <span>05-15 14:31 完成配资</span>
                </div>
              } />
              <Steps.Step title="交易所下单" description={
                <div>
                  <span>05-15 15:30 提交订单</span><br />
                  <span>05-15 16:30 订单提交完成</span><br />
                </div>
              } />
              <Steps.Step title="结算" description={
                <div>
                  <span>05-15 18:30 完成结算</span>
                </div>
              } />
            </Steps>
          </Item>
        </List>
        <List renderHeader={() => '盘口信息'} className="my-list">
          <Item extra={this.state.current.title}>交易名称</Item>
          <Item extra={this.state.current.margin_ratio}>杠杆倍数</Item>
          <Item extra={this.state.current.exchange}>交易所</Item>
          <Item extra={this.state.current.rate_text}>手续费</Item>
          <Item extra={
            moment(this.state.current.bet_time).format('YYYY-MM-DD HH:mm')
          }>开始下注</Item>
          <Item extra={
            moment(this.state.current.bet_stop_time).format('YYYY-MM-DD HH:mm')
          }>停止下注</Item>
          <Item extra={this.state.current.settlement_condition_text}>结算波动</Item>
        </List>
        <List renderHeader={() => '结算信息'} className="my-list">
          <Item extra={
            this.state.current.bet_price ?
              this.state.current.bet_price :
              '等待中...'
          }>下单价格(USDT)</Item>
          <Item extra={
            this.state.current.settlement_time ?
              moment(this.state.current.settlement_time).format('MM-DD HH:mm') :
              '等待中...'
          }>结算时间</Item>
          <Item extra={
            this.state.current.settlement_price ?
              this.state.current.settlement_price :
              '等待中...'
          }>结算价格</Item>
        </List>
        <List renderHeader={() => '委托信息'} className="my-list">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </List>
      </div>
    );
  }
}


export default connect()(Show);
