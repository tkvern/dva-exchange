import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import ExchangePanel from '../components/exchange/ExchangePanel';
import style from './Exchange.less';

function Exchange({ auth, exchange }) {
  const { user } = auth;
  const {
    ticker_price,
    ticker_percent,
    ticker_change,
    ticker_direction,
    ticker_24direction,
    cnyusd,
    currentOrders
  } = exchange;
  const exchangePanelProps = {
    user: user,
    ticker_price: ticker_price,
    ticker_percent: ticker_percent,
    ticker_change: ticker_change,
    ticker_direction: ticker_direction,
    ticker_24direction: ticker_24direction,
    cnyusd: cnyusd,
    currentOrders: currentOrders
  }
  return (
    <MainLayout>
      <div className={style.flexContainer}>
        <ExchangePanel {...exchangePanelProps} />
      </div>
    </MainLayout>
  );
}
function mapStateToProps({ auth, exchange }) {
  return { auth, exchange };
}
export default connect(mapStateToProps)(Exchange);
