import React, { Component } from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Badge, Tabs } from 'antd-mobile';
import style from './ListOrder.less';
import ItemOrder from './ItemOrder';
import ItemRecord from './ItemRecord';

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
    const ParticipateList = [];
    ParticipateData.forEach((item, index) => {
      ParticipateList.push(<ItemOrder key={item.id} data={item} />);
      ParticipateList.push(<WhiteSpace key={-index} size="md" />);
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
    const participateProps = {
      params: {
        is_participate: 1,
        per_page: 10
      }
    }
    return (
      <div className={style.content}>
        <Tabs tabs={[
          { title: <Badge text={''}>参与</Badge> },
        ]}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          useOnPan={false}
        >
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemRecord {...participateProps} />
            {/*<WingBlank>
              <WhiteSpace size="xl" />
              <div style={{ textAlign: 'center' }}>
                <span
                  onClick={() => this.props.dispatch(routerRedux.push('/app/exchange_record'))}
                  style={{ color: 'rgb(51, 163, 244)' }}>查看历史</span>
              </div>
              <WhiteSpace size="xl" />
            </WingBlank>*/}
          </div>
        </Tabs>
      </div>
    );
  }
}

export default connect()(ListOrder);
