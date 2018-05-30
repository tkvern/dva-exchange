import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { NavBar, Icon } from 'antd-mobile';
import SingleLayout from '../components/layout/SingleLayout';
import SettingPanel from '../components/user/SettingPanel';
import style from './Setting.less';

function Setting({ dispatch, auth }) {
  const { user } = auth;
  const settingPanelProps = {
    user: user
  }
  return (
    <SingleLayout>
      <NavBar
        className={style.navbarFixed}
        mode="light"
        onLeftClick={() => {
          dispatch(routerRedux.push('/app/user'))
        }}
        leftContent={
          [<Icon type="left" key="1" />,
          <label key="2" style={{ color: "#000" }}>设置</label>]
        }
      />
      <SettingPanel {...settingPanelProps} />
    </SingleLayout>
  )
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Setting);
