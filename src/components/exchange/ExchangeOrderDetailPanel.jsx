import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace, List, WingBlank, Steps, Badge } from 'antd-mobile';
// import { delCookie } from '../../utils/helper';
import { Table } from 'antd';
import style from './ExchangeOrderDetailPanel.less';

const Item = List.Item;
class ExchangeOrderDetailPanel extends Component {
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
    const columns = [{
      title: '委托时间',
      dataIndex: 'datetime',
      key: 'datetime',
    }, {
      title: '委托',
      dataIndex: 'consign',
      key: 'consign',
      render: (text) => {
        if (text) {
          return <Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
        } else {
          return <Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
        }
      }
    }, {
      title: '本金',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
    }, {
      title: '盈亏',
      dataIndex: 'profit',
      key: 'profit',
      align: 'right',
      render: (text) => {
        if (text > 0) {
          return <span className="green">{text}</span>
        } else {
          return <span className="red">{text}</span>
        }
      }
    }];
    const data = [{
      key: '1',
      datetime: '05-16 20:15',
      consign: 1,
      profit: -50000,
      balance: 50000,
    }, {
      key: '2',
      datetime: '05-16 20:15',
      consign: 1,
      profit: -200,
      balance: -200,
    }, {
      key: '3',
      datetime: '05-16 20:15',
      consign: 0,
      profit: 50000,
      balance: 50000,
    }];
    return (
      <div className={style.content}>
        <List renderHeader={() => '进度信息'} className="my-list">
          <Item>
            <WhiteSpace size="xl" />
            <Steps size="small" current={5}>
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
          <Item extra={'BTC/USDT (比特币)'}>交易对象</Item>
          <Item extra={'100倍'}>杠杆倍数</Item>
          <Item extra={'火币网 www.huobipro.com'}>交易所</Item>
          <Item extra={'3.7% (本金)'}>手续费</Item>
          <Item extra={'2018-05-16 20:30'}>开盘时间</Item>
          <Item extra={'±1% (BTC/USDT价格)'}>结算条件</Item>
        </List>
        <List renderHeader={() => '结算信息'} className="my-list">
          <Item extra={'2018-05-16 20:30'}>配资时间</Item>
          <Item extra={'7150.01'}>配资价格(USDT)</Item>
          <Item extra={'2018-05-16 20:30'}>结算时间</Item>
          <Item extra={
            <label><span className="red">6810.52</span></label>
          }>结算价格(USDT)</Item>
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


export default connect()(ExchangeOrderDetailPanel);
