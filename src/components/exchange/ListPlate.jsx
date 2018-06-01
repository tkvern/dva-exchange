import React, { Component } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import ItemPlate from './ItemPlate';
import style from './ListPlate.less';

class ListPlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const ListData = [
      {
        "id": 1,
        "title": "BTC/USDT",
        "bet_time": "2018-05-30 12:00:00",
        "settlement_conditions": "币价 ±1%",
        "income": "+87%",
        "end_time": "2018-06-01 19:00:00",
        "can_order": true
      },
      {
        "id": 2,
        "title": "EOS/USDT",
        "bet_time": "2018-05-30 13:00:00",
        "settlement_conditions": "币价 ±1%",
        "income": "+87%",
        "end_time": "2018-06-01 17:15:00",
        "can_order": false
      },
      // {
      //   "id": 3,
      //   "title": "HT/USDT交易盘",
      //   "bet_time": "08-15 10:15",
      //   "settlement_conditions": "币价 ±5%",
      //   "income": "+87%",
      //   "end_time": "2018-05-31 16:20:00",
      //   "can_order": true
      // }
    ];
    const ListItem = [];
    ListData.forEach((item, index) => {
      ListItem.push(<ItemPlate key={item.id} data={item} />);
      ListItem.push(<WhiteSpace key={-index} size="md" />);
    });
    return (
      <div className={style.content}>
        {ListItem}
      </div>
    );
  }
}

export default connect()(ListPlate);
