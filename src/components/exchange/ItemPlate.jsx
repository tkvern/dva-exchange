import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Numeral from 'numeral';
import moment from 'moment';
import { WingBlank, WhiteSpace, Flex, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from './ListPlate.less';

class ItemPlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      user: this.props.user,
      datetime: this.props.datetime
    }
  }

  componentWillMount = () => {
    // this.autoTime(this.state.data.bet_stop_time);
  }
  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    // this.timer && clearTimeout(this.timer);
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }
  // autoTime = (time) => {
  //   let mtime = moment(time).diff(moment(), 'seconds');
  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       timestep: this.getTimeStep(mtime)
  //     })
  //     this.autoTime(time);
  //   }, 1000);
  // }
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
  onSubmit(data) {
    const { price } = this.props.form.getFieldsValue();
    if (!price) {
      this.props.form.resetFields();
      return Toast.info('请输入正确的金额!');
    }
    if (this.state.user.balance - price < 0) {
      return Toast.info('不能大于余额!');
    }
    this.props.dispatch({
      type: 'exchange/create',
      payload: {
        ...data,
        amount: parseFloat(price)
      }
    });
    this.props.form.resetFields();
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={style.white}>
        <WhiteSpace size="xl" />
        <WingBlank>
          <div className={`${style.formItem} ${style.antRow}`}>
            <Flex style={{ alignItems: 'baseline' }}>
              <Flex.Item style={{ flex: '3 1 0%' }}>
                <label style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>{this.state.data.title}</label>
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
                  <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                  <label>
                  {this.state.data.exchange_bet_time ?
                    moment(this.state.data.exchange_bet_time.exp).format('MM-DD HH:mm') : ''}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                  <label>{moment(this.state.data.bet_time).format('MM-DD hh:mm')}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                  <label>{this.state.data.settlement_condition_text}</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="买对收益" style={{ color: '#888' }}>买对收益: </label>
                  <label>{this.state.data.win_income_rate * 100}%</label>
                </div>
                <div className={style.itemLabel}>
                  <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                  <label><span className="red">{
                    this.getTimeStep(moment(this.state.data.bet_stop_time).diff(this.state.datetime, 'seconds'))}</span></label>
                </div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <form>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="账户余额">账户余额: {Numeral(this.state.user.balance).format('0,0.00')} CNY</label>
                  </div>
                  <WhiteSpace size="xs" />
                  <InputItem
                    {...getFieldProps('price', {
                      rules: [
                        { required: true, message: '金额最小为100' },
                      ],
                    })}
                    name="price"
                    type="number"
                    placeholder="0"
                    pattern="[0-9]*"
                    min={1}
                    maxLength={5}
                    clear
                    error={!!getFieldError('price')}
                    onErrorClick={() => {
                      Toast.info('请输入正确的金额!');
                    }}
                    extra="CNY"
                  />
                </div>
                <WhiteSpace size="lg" />
                <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                  <Button
                    className="am-green"
                    type="default"
                    onClick={() => {
                      this.onSubmit({ type: 0, bet_id: this.state.data.id });
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买涨</Button>
                  <Button
                    className="am-red"
                    type="default"
                    onClick={() => {
                      this.onSubmit({ type: 1, bet_id: this.state.data.id });
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买跌</Button>
                </div>
                <WhiteSpace size="md" />
              </form>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default connect()(createForm()(ItemPlate));
