import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { ListView, Badge } from 'antd-mobile';
import qs from 'qs';
import request from '../../utils/request';
import moment from 'moment';
// import { getRecordType } from '../../utils/helper';
import config from '../../config';
import style from './ItemOrder.less';

class ItemOrder extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      height: document.documentElement.clientHeight - 88,
      refreshing: false,
      dataSource,
      isLoading: true,
      useBodyScroll: false,
      current: 1,
      has_more_page: true,
      params: this.props.params
    }
    // console.log(this.props.data);
  }
  async componentWillMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    const { list, has_more_page } = await this.genData({
      ...this.state.params,
    });
    this.rData = list;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
      has_more_page: has_more_page
    });
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  onEndReached = async (event) => {
    if (!this.state.has_more_page) {
      return;
    }
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    const { list, current, has_more_page } = await this.genData({
      page: this.state.current + 1,
      ...this.state.params,
    });

    this.rData = [...this.rData, ...list];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
      current: current,
      has_more_page: has_more_page
    });
  };

  async genData(params) {
    const { data } = await request(`${config.host}/api/bet_orders?${qs.stringify(params)}`);
    return data;
  }
  render() {
    const rows = (row) => {
      let typeCell = <span></span>;
      let profitCell = <span></span>;
      if (row.type === 0) {
        typeCell = <Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
      } else if (row.type === 1) {
        typeCell = <Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
      }

      if (parseInt(row.profit, 10) > 0) {
        profitCell = <span className="green">{row.profit}</span>
      } else if (parseInt(row.profit, 10) < 0) {
        profitCell = <span className="red">{row.profit}</span>
      } else if (parseInt(row.profit, 10) === 0) {
        profitCell = <span className="gray">{row.profit}</span>
      }
      return (
        <div className={style.CusTable}>
          <div className={style.CusCell} style={{ textAlign: 'center' }}>
            {typeCell}
          </div>
          <div className={style.CusCell} style={{ textAlign: 'center' }}>{moment(row.created_at).format('MM-DD HH:mm:ss')}</div>
          <div className={style.CusCell} style={{ textAlign: 'right' }}>{row.amount}</div>
          <div className={style.CusCell} style={{ textAlign: 'right' }}>
            {profitCell}
          </div>
        </div>
      );
    }
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.paIsLoading ? '加载中...' : '加载完成'}
        </div>)}
        renderRow={row => (rows(row))}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={15}
        onScroll={() => { }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default connect()(ItemOrder);
