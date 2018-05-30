import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Steps } from 'antd-mobile';
import style from './ExchangeDetailPanel.less';

const Item = List.Item;
class ExchangeDetailPanel extends Component {
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
          <Item extra={'BTC/USDT (比特币)'}>交易对象</Item>
          <Item extra={'100倍'}>杠杆倍数</Item>
          <Item extra={'火币网 www.huobipro.com'}>交易所</Item>
          <Item extra={'3.7% (本金)'}>手续费</Item>
          <Item extra={'±1% (BTC/USDT价格)'}>结算波动</Item>
        </List>
        <List renderHeader={() => '结算信息'} className="my-list">
          <Item extra={'2018-05-16 20:30'}>配资时间</Item>
          <Item extra={'处理中'}>配资价格</Item>
          <Item extra={'预计30分钟内'}>结算时间</Item>
          <Item extra={'处理中'}>结算价格</Item>
        </List>
        <WhiteSpace size="xl" />
      </div>
    );
  }
}


export default connect()(ExchangeDetailPanel);
