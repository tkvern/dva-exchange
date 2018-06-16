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
                {SettledList}
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
