import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WingBlank, WhiteSpace, Flex, Card, Badge, Tabs } from 'antd-mobile';
import style from './ListOrder.less';
import ItemOrder from './ItemOrder';

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participateList: this.props.participateList,
      processingList: this.props.processingList,
      settledList: this.props.settledList,
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }
  render() {
    const ParticipateData = this.state.participateList;
    const ProcessingData = this.state.processingList;
    const SettledData = this.state.settledList;
    const ParticipateList = [];
    const ProcessingList = [];
    const SettledList = [];
    ParticipateData.forEach((item, index) => {
      ParticipateList.push(<ItemOrder key={item.id} data={item} />);
      ParticipateList.push(<WhiteSpace key={-index} size="md" />);
    });
    ProcessingData.forEach((item, index) => {
      ProcessingList.push(<ItemOrder key={item.id} data={item} />);
      ProcessingList.push(<WhiteSpace key={-index} size="md" />);
    });
    SettledData.forEach((item, index) => {
      SettledList.push(<ItemOrder key={item.id} data={item} />);
      SettledList.push(<WhiteSpace key={-index} size="md" />);
    });
    if (ParticipateList.length <= 0) {
      ParticipateList.push(
        <div key="1" className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank style={{ textAlign: 'center' }}>
            <h3>当前没有参与数据</h3>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>);
    }
    if (ProcessingList.length <= 0) {
      ProcessingList.push(
        <div key="1" className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank style={{ textAlign: 'center' }}>
            <h3>当前没有进行中数据</h3>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>);
    }
    if (SettledList.length <= 0) {
      SettledList.push(
        <div key="1" className={style.white}>
          <WhiteSpace size="xl" />
          <WingBlank style={{ textAlign: 'center' }}>
            <h3>当前没有已结算数据</h3>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>);
    }
    return (
      <div className={style.content}>
        <div className={style.white}>
          <Tabs tabs={[
            { title: <Badge text={''}>参与</Badge> },
            { title: <Badge text={''}>进行中</Badge> },
            { title: <Badge text={''}>已结算</Badge> },
          ]}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            useOnPan={false}
          >
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                {ParticipateList}
                <WhiteSpace size="xl" />
                <div style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                    style={{ color: 'rgb(51, 163, 244)' }}>查看历史</span>
                </div>
                <WhiteSpace size="xl" />
              </WingBlank>
            </div>
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <WhiteSpace size="xl" />
              <WingBlank>
                {ProcessingList}
                <WhiteSpace size="xl" />
                <div style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                    style={{ color: 'rgb(51, 163, 244)' }}>查看历史</span>
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
                    style={{ color: 'rgb(51, 163, 244)' }}>查看历史</span>
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
