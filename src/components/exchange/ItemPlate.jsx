import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Numeral from 'numeral';
import moment from 'moment';
import { WingBlank, WhiteSpace, Flex, Toast, InputItem, Button } from 'antd-mobile';
import style from './ListPlate.less';

class ItemPlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      timestep: this.getTimeStep(moment(this.props.data.end_time).diff(moment(), 'seconds'))
    }
  }

  componentWillMount = () => {
    this.autoTime(this.state.data.end_time);
  }
  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  autoTime = (time) => {
    let mtime = moment(time).diff(moment(), 'seconds');
    let _self = this;
    this.timer = setTimeout(function () {
      _self.setState({
        timestep: _self.getTimeStep(mtime)
      })
      _self.autoTime(time);
    }, 1000);
  }
  getTimeStep = (total) => {
    let timestep = "";
    if (total <= 0) {
      timestep = "00:00:00";
    } else {
      var hh = Math.floor(total / 3600) % 60;
      var mm = Math.floor(total / 60) % 60;
      var ss = Math.floor(total % 60);
      hh = hh < 10 ? '0' + hh : hh;
      mm = mm < 10 ? '0' + mm : mm;
      ss = ss < 10 ? '0' + ss : ss;
      timestep = hh + ':' + mm + ':' + ss
    }
    return timestep;
  }

  sumExpected(price, odds, magnitude) {
    let expected;
    switch (magnitude) {
      case "1":
        expected = price * odds * 0.01;
        break;
      case "2":
        expected = price * odds * 0.02;
        break;
      case "5":
        expected = price * odds * 0.05;
        break;
      case "4":
        expected = price * odds * 0.01;
        break;
      case "10":
        expected = price * odds * 0.01;
        break;
      case "24":
        expected = price * odds * 0.01;
        break;
      default: ;
    }
    return this.setState({ expected: Numeral(expected).format('0,0.00') });
  }
  render() {
    return (
      <div className={style.white}>
        <WhiteSpace size="xl" />
        <WingBlank>
          <div className={`${style.formItem} ${style.antRow}`}>
            <Flex style={{ alignItems: 'baseline' }}>
              <Flex.Item style={{ flex: '3 1 0%' }}>
                <label style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>{this.state.data.title} 交易盘</label>
              </Flex.Item>
              <Flex.Item
                style={{ textAlign: 'right' }}
                onClick={() => { this.props.dispatch(routerRedux.push(`/app/exchange/${this.state.data.id}`)) }}>
                <span style={{ color: 'rgb(51, 163, 244)' }} >详情</span>
              </Flex.Item>
            </Flex>
          </div>
          <Flex align="start">
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="开盘时间" style={{ color: '#888' }}>开盘时间: </label>
                  <label>{moment(this.state.data.bet_time).format('MM-DD hh:mm')}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                  <label>{this.state.data.settlement_conditions}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="买对收益" style={{ color: '#888' }}>买对收益: </label>
                  <label>{this.state.data.income}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="距离封盘" style={{ color: '#888' }}>距离封盘: </label>
                  <label><span className="red">{this.state.timestep}</span></label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${style.formItem} ${style.antRow}`}>
                <div className={style.itemLabel}>
                  <label title="账户余额">账户余额: {Numeral(this.state.maxPrice).format('0,0.00')} CNY</label>
                </div>
                <WhiteSpace size="xs" />
                <InputItem
                  name="price"
                  type="money"
                  placeholder="0"
                  min={1}
                  clear
                  error={this.state.hasPriceError}
                  onErrorClick={() => {
                    if (this.state.hasPriceError) {
                      Toast.info('可用金额不足!');
                    }
                  }}
                  extra="CNY"
                  value={this.state.price}
                  onChange={(price) => {
                    let cprice = Numeral(price).value() || 0;
                    cprice > this.state.maxPrice ?
                      this.setState({ hasPriceError: true }) : this.setState({ hasPriceError: false });
                    this.setState({ price: cprice.toString() });
                    this.sumExpected(cprice, this.state.odds, this.state.magnitude);
                  }}
                />
                <div className={style.itemTip} style={{ marginTop: 5 }}>
                  <label title="usdt">买对收益≈ {Numeral(this.state.price / this.state.cnyusd).format('0,0.00')} CNY</label>
                </div>
              </div>
              <WhiteSpace size="md" />
              <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                <Button
                  className="am-green"
                  type="default"
                  onClick={() => {
                    // this.onSubmit('up');
                  }}
                  inline
                  size="small"
                  disabled={this.state.disabled}
                >买涨</Button>
                <Button
                  className="am-red"
                  type="default"
                  onClick={() => {
                    // this.onSubmit('down');
                  }}
                  inline
                  size="small"
                  disabled={this.state.disabled}
                >买跌</Button>
              </div>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default connect()(ItemPlate);
