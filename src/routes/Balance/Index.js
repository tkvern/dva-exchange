import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import BalanceIndex from '../../components/balance/Index';
import style from './Index.less';

function Index({ dispatch }) {
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
          <label key="2" style={{ color: "#000" }}>余额明细</label>]
        }
      />
      <BalanceIndex />
    </SingleLayout>
  )
}

export default connect()(Index);
