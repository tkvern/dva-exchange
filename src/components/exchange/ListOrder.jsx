import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WingBlank, WhiteSpace, Flex, Card, Badge, Tabs } from 'antd-mobile';
import style from './ListOrder.less';

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.white}>
          <Tabs tabs={[
            { title: <Badge text={'2'}>参与</Badge> },
            { title: <Badge text={'2'}>进行中</Badge> },
            { title: <Badge text={'今日(3)'}>已结算</Badge> },
          ]}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            useOnPan={false}
          >
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#e7f9f4'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1/order'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="下单价格" style={{ color: '#888' }}>下单价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="我的委托" style={{ color: '#888' }}>我的委托: </label><br />
                            <label>
                              <Badge text="买涨 100CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                              <Badge text="买跌 500CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                              <Badge text="买涨 120CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                            </label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#e7f9f4'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1/order'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="下单价格" style={{ color: '#888' }}>下单价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="我的委托" style={{ color: '#888' }}>我的委托: </label><br />
                            <label>
                              <Badge text="买跌 5000CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                              <Badge text="买涨 100CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                              <Badge text="买跌 5000CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                              <Badge text="买涨 100CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                            </label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#f1f1f1'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="gray">已结算</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1/order'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="下单价格" style={{ color: '#888' }}>下单价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label><span className="red">6810.52</span></label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="我的委托" style={{ color: '#888' }}>我的委托: </label><br />
                            <label>
                              <Badge text="买跌 5000CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                              <Badge text="买跌 5000CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                              <Badge text="买涨 100CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                            </label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="xl" />
                <div style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                    style={{ color: 'rgb(51, 163, 244)' }}>查看全部</span>
                </div>
                <WhiteSpace size="xl" />
              </WingBlank>
            </div>
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#e7f9f4'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#e7f9f4'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="green">进行中</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label>等待中...</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="xl" />
                <div style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                    style={{ color: 'rgb(51, 163, 244)' }}>查看全部</span>
                </div>
                <WhiteSpace size="xl" />
              </WingBlank>
            </div>
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#f1f1f1'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="gray">已结算</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label><span className="red">6810.52</span></label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    style={{
                      backgroundColor: '#f1f1f1'
                    }}
                    title={
                      <div style={{ fontSize: '14px' }}>
                        <span>BTC/USDT </span>
                        <span className="gray">已结算</span>
                      </div>
                    }
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange/1'))}
                    extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
                  />
                  <Card.Body>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="开始下注" style={{ color: '#888' }}>开始下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="停止下注" style={{ color: '#888' }}>停止下注: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                            <label>币价 ±1%</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="交易所下单" style={{ color: '#888' }}>交易所下单: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="配资价格" style={{ color: '#888' }}>下单价格: </label>
                            <label>7105.54</label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Flex>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                            <label>08-15 20:15</label>
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                          <div className={style.itemLabel}>
                            <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                            <label><span className="green">7210.52</span></label>
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                  </Card.Body>
                </Card>
                <WhiteSpace size="xl" />
                <div style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                    style={{ color: 'rgb(51, 163, 244)' }}>查看全部</span>
                </div>
                <WhiteSpace size="xl" />
              </WingBlank>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect()(ListOrder);
