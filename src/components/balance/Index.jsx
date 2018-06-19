import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// import { getScoresType } from '../../utils/helper';
import { List, ListView, Tabs, Badge } from 'antd-mobile';
import ItemBalance from './ItemBalance';
import style from './Index.less';

class BalancePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const itemAllProps = {
      params: {
        per_page: 15
      }
    }
    const itemIncomeProps = {
      params: {
        per_page: 15,
        receipt_type: 1
      }
    }
    const itemPayProps = {
      params: {
        per_page: 15,
        receipt_type: 0
      }
    }
    return (
      <div className={style.content}>
        <Tabs tabs={[
          { title: <Badge>全部</Badge> },
          { title: <Badge>收入</Badge> },
          { title: <Badge>支出</Badge> },
        ]}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          useOnPan={false}
        >
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemBalance {...itemAllProps} />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemBalance {...itemIncomeProps} />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemBalance {...itemPayProps} />
          </div>
        </Tabs>
      </div>
    );
  }
}


export default connect()(BalancePanel);
