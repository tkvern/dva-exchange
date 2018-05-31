import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
// import KlinePanel from '../components/kline/KlinePanel';

function LeaderBoard() {
  return (
    <MainLayout>
      <h1>这里是排行榜</h1>
      {/*<KlinePanel />*/}
    </MainLayout>
  );
}

export default connect()(LeaderBoard);
