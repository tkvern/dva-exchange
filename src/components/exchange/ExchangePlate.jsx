import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Numeral from 'numeral';
import { WingBlank, WhiteSpace, Flex, Toast, InputItem, Button } from 'antd-mobile';
import style from './ExchangePlate.less';

class ExchangePlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    }
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank>
            <div className={`${style.formItem} ${style.antRow}`}>
              <Flex style={{ alignItems: 'baseline' }}>
                <Flex.Item style={{ flex: '3 1 0%' }}>
                  <label style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>BTC/USDT交易盘</label>
                </Flex.Item>
                <Flex.Item
                  style={{ textAlign: 'right' }}
                  onClick={() => { this.props.dispatch(routerRedux.push('/app/exchange/1')) }}>
                  <span style={{ color: 'rgb(51, 163, 244)' }} >详情</span>
                </Flex.Item>
              </Flex>
            </div>
            <Flex align="start">
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="开盘时间" style={{ color: '#888' }}>开盘时间: </label>
                    <label>08-15 20:15</label>
                  </div>
                  <div className={style.itemLabel}>
                    <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                    <label>币价 ±1%</label>
                  </div>
                  <div className={style.itemLabel}>
                    <label title="买对收益" style={{ color: '#888' }}>买对收益: </label>
                    <label>+87%</label>
                  </div>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="账户余额">账户余额: {Numeral(this.state.maxPrice).format('0,0.00')} CNY</label>
                  </div>
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
                  <WhiteSpace size="xs" />
                  <div className={style.itemTip}>
                    <label title="usdt">买对收益≈ {Numeral(this.state.price / this.state.cnyusd).format('0,0.00')} CNY</label>
                  </div>
                </div>
                <WhiteSpace size="md" />
                <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                  <Button
                    className="am-green"
                    type="default"
                    onClick={() => {
                      this.onSubmit('up');
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买涨</Button>
                  <Button
                    className="am-red"
                    type="default"
                    onClick={() => {
                      this.onSubmit('down');
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
        <WhiteSpace size="md" />
        <div className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank>
            <div className={`${style.formItem} ${style.antRow}`}>
              <Flex style={{ alignItems: 'baseline' }}>
                <Flex.Item style={{ flex: '3 1 0%' }}>
                  <label style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>EOS/USDT交易盘</label>
                </Flex.Item>
                <Flex.Item
                  style={{ textAlign: 'right' }}
                  onClick={() => { this.props.dispatch(routerRedux.push('/app/exchange/1')) }}>
                  <span style={{ color: 'rgb(51, 163, 244)' }} >详情</span>
                </Flex.Item>
              </Flex>
            </div>
            <Flex align="start">
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="开盘时间" style={{ color: '#888' }}>开盘时间: </label>
                    <label>08-15 20:15</label>
                  </div>
                  <div className={style.itemLabel}>
                    <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                    <label>币价 ±5%</label>
                  </div>
                  <div className={style.itemLabel}>
                    <label title="买对收益" style={{ color: '#888' }}>买对收益: </label>
                    <label>+87%</label>
                  </div>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className={`${style.formItem} ${style.antRow}`}>
                  <div className={style.itemLabel}>
                    <label title="账户余额">账户余额: {Numeral(this.state.maxPrice).format('0,0.00')} CNY</label>
                  </div>
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
                  <WhiteSpace size="xs" />
                  <div className={style.itemTip}>
                    <label title="usdt">买对收益≈ {Numeral(this.state.price / this.state.cnyusd).format('0,0.00')} CNY</label>
                  </div>
                </div>
                <WhiteSpace size="md" />
                <div className={`${style.formItem} ${style.antRow}`} style={{ textAlign: 'center' }}>
                  <Button
                    className="am-green"
                    type="default"
                    onClick={() => {
                      this.onSubmit('up');
                    }}
                    inline
                    size="small"
                    disabled={this.state.disabled}
                  >买涨</Button>
                  <Button
                    className="am-red"
                    type="default"
                    onClick={() => {
                      this.onSubmit('down');
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
      </div>
    );
  }
}

export default connect()(ExchangePlate);
