import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, Card, Badge } from 'antd-mobile';
import moment from 'moment';
import style from './ItemOrder.less';

class ItemOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
    // console.log(this.props.data);
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }
  getStateText(state) {
    let obj = {};
    if (state === 0) {
      obj = { text: "投注中", color: 'red' };
    } else if (state === 1) {
      obj = { text: "进行中", color: 'green' };
    } else if (state === 2) {
      obj = { text: "已结算", color: 'gray' };
    }
    return (<span className={`${obj.color}`}>{obj.text}</span>);
  }
  getStateHeader() {
    const { state } = this.state.data;
    if (state === 0) {
      return '#e7f9f4';
    } else if (state === 1) {
      return '#e7f9f4';
    } else if (state === 2) {
      return '#f1f1f1';
    }
  }
  render() {
    const ordersList = [];
    const ordersDate = this.state.data.bet_orders || [];
    ordersDate.forEach((item, index) => {
      if (item.type === 0) {
        ordersList.push(<Badge key={index} text={`${item.profit >= 0 ? item.profit > 0 ? '√' : '' : '✕'} ${item.amount} CNY`}
          style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />)
      } else if (item.type === 1) {
        ordersList.push(<Badge key={index} text={`${item.profit >= 0 ? item.profit > 0 ? '√' : '' : '✕'} ${item.amount} CNY`}
          style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />)
      }
    });
    return (
      <Card>
        <Card.Header
          style={{
            backgroundColor: this.getStateHeader()
          }}
          title={
            <div style={{ fontSize: '14px' }}>
              <span style={{ marginRight: 4 }}>{this.state.data.title}</span>
              {this.getStateText(this.state.data.state)}
            </div>
          }
          onClick={() => this.props.dispatch(routerRedux.push(`/app/exchange/${this.state.data.id}`))}
          extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
        />
        <Card.Body>
          <Flex>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                  <label>
                    {this.state.data.exchange_bet_time ?
                      moment(this.state.data.exchange_bet_time.exp).format('MM-DD HH:mm') : ''}
                  </label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                  <label>{moment(this.state.data.bet_time).format('MM-DD HH:mm')}</label>
                </div>
              </div>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                  <label>{this.state.data.settlement_condition_text}</label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                  <label>{moment(this.state.data.bet_stop_time).format('MM-DD HH:mm')}</label>
                </div>
              </div>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="买涨成交" style={{ color: '#888' }}>买涨成交: </label>
                  <label>{this.state.data.bet_price ? this.state.data.bet_price.long : ''}
                  </label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="买跌成交" style={{ color: '#888' }}>买跌成交: </label>
                  <label>
                    {this.state.data.bet_price ? this.state.data.bet_price.short : ''}
                  </label>
                </div>
              </div>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="买涨结算" style={{ color: '#888' }}>买涨结算: </label>
                  <label>
                    {this.state.data.settlement_price ? this.state.data.settlement_price.long : ''}
                  </label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="买跌结算" style={{ color: '#888' }}>买跌结算: </label>
                  <label>
                    {this.state.data.settlement_price ? this.state.data.settlement_price.short : ''}
                  </label>
                </div>
              </div>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow} `} style={{ minHeight: '26px' }}>
                <div className={style.itemLabel}>
                  <label title="我的委托" style={{ color: '#888' }}>我的委托: </label><br />
                  <label>
                    {ordersList}
                  </label>
                </div>
              </div>
            </Flex.Item>
          </Flex>
        </Card.Body>
      </Card>
    );
  }
}

export default connect()(ItemOrder);
