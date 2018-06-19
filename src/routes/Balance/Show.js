import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import BalanceShow from '../../components/balance/Show';
import style from './Show.less';

function Show({ dispatch, balance }) {
  // const { user } = auth;
  // const settingPanelProps = {
  //   user: user
  // }
  const { current } = balance;
  const balanceShowProps = {
    current: current
  }
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
          <label key="2" style={{ color: "#000" }}>余额详情</label>]
        }
      />
      <BalanceShow {...balanceShowProps} />
    </SingleLayout>
  )
}

function mapStateToProps({ balance }) {
  return { balance };
}

export default connect(mapStateToProps)(Show);
