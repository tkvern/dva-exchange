import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../../components/layout/SingleLayout';
import ExchangeShow from '../../components/exchange/Show';
import style from './Show.less';

function Show({ dispatch, exchange }) {
  const { current } = exchange;
  const exchangeShowProps = {
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
          <label key="2" style={{ color: "#000" }}>详情</label>]
        }
      />
      <ExchangeShow {...exchangeShowProps} />
    </SingleLayout>
  )
}

function mapStateToProps({ exchange }) {
  return { exchange };
}

export default connect(mapStateToProps)(Show);
