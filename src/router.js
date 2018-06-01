import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import ExchangeIndex from './routes/Exchange/Index';
import ExchangeShow from './routes/Exchange/Show';
import ExchangeShowOrder from './routes/Exchange/ShowOrder';
import ExchangeIndexRecord from './routes/Exchange/IndexRecord';

import BalanceIndex from './routes/Balance/Index';
import BalanceShow from './routes/Balance/Show';

import MessageSubscriptionIndex from './routes/MessageSubscription/Index';
import MessageSubscriptionCreate from './routes/MessageSubscription/Create';
import MessageSubscriptionEdit from './routes/MessageSubscription/Edit';

import Login from './routes/Login';
import User from './routes/User';
import Setting from './routes/Setting';
import Order from './routes/Order';
import Kline from './routes/Kline';
import LeaderBoard from './routes/LeaderBoard';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/app/exchange" exact component={ExchangeIndex} />
        <Route path="/app/exchange/:id" exact component={ExchangeShow} />
        <Route path="/app/exchange/:id/order/" exact component={ExchangeShowOrder} />
        <Route path="/app/exchange_record" exact component={ExchangeIndexRecord} />

        <Route path="/app/balance" exact component={BalanceIndex} />
        <Route path="/app/balance/:id" exact component={BalanceShow} />

        <Route path="/app/message_subscription" exact component={MessageSubscriptionIndex} />
        <Route path="/app/message_subscription/create" exact component={MessageSubscriptionCreate} />
        <Route path="/app/message_subscription/:id/edit" exact component={MessageSubscriptionEdit} />

        <Route path="/app/kline" exact component={Kline} />
        <Route path="/app/leaderboard" exact component={LeaderBoard} />
        <Route path="/app/user" exact component={User} />
        <Route path="/app/setting" exact component={Setting} />
        <Route path="/app/order" exact component={Order} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
