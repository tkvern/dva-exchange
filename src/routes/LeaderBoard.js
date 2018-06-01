import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import LeaderBoardIndex from '../components/leaderBoard/Index';

function LeaderBoard() {
  return (
    <MainLayout>
      <LeaderBoardIndex />
    </MainLayout>
  );
}

export default connect()(LeaderBoard);
