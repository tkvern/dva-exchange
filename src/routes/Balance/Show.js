import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import BalanceShow from '../../components/balance/Show';
import style from './Show.less';

function Show({ dispatch }) {
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
          dispatch(routerRedux.goBack())
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>余额详情</label>]
        }
      />
      <BalanceShow />
    </SingleLayout>
  )
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Show);
