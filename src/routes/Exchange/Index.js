import React from 'react';
import { connect } from 'dva';
// import ReactIScroll from 'react-iscroll';
// import iScroll from 'iscroll';
import MainLayout from '../../components/layout/MainLayout';
import ExchangeIndex from '../../components/exchange/Index';
import style from './Index.less';

function Index({ auth, exchange }) {
  const { user } = auth;
  const {
    ticker_price,
    ticker_percent,
    ticker_change,
    ticker_direction,
    ticker_24direction,
    cnyusd,
    canbetList,
    participateList,
    processingList,
    settledList,
  } = exchange;
  const exchangePanelProps = {
    user: user,
    ticker_price: ticker_price,
    ticker_percent: ticker_percent,
    ticker_change: ticker_change,
    ticker_direction: ticker_direction,
    ticker_24direction: ticker_24direction,
    cnyusd: cnyusd,
    canbetList: canbetList,
    participateList: participateList,
    processingList: processingList,
    settledList: settledList,
  }
  return (
    <MainLayout>
      <div className={style.flexContainer}>
        <ExchangeIndex {...exchangePanelProps} />
      </div>
    </MainLayout>
  );
}
function mapStateToProps({ auth, exchange }) {
  return { auth, exchange };
}
export default connect(mapStateToProps)(Index);
