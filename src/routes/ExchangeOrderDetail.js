import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../components/layout/SingleLayout';
import style from './ExchangeOrderDetail.less';
import ExchangeOrderDetailPanel from '../components/exchange/ExchangeOrderDetailPanel';

function ExchangeOrderDetail({ dispatch }) {
  // const { user } = auth;
  // const settingPanelProps = {
  //   user: user
  // }
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.push('/app/exchange'))
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>BTC/USDT</label>]
        }
      />
      <ExchangeOrderDetailPanel />
    </SingleLayout>
  )
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ExchangeOrderDetail);
