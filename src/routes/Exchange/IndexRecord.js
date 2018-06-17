import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import ExchangeIndexRecord from '../../components/exchange/IndexRecord';
import style from './IndexRecord.less';

function IndexRecord({ dispatch }) {
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.goBack())
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>交易盘</label>]
        }
      />
      <ExchangeIndexRecord />
    </SingleLayout>
  )
}
export default connect()(IndexRecord);
