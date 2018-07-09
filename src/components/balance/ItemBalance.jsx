import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ListView, List } from 'antd-mobile';
import qs from 'qs';
import request from '../../utils/request';
import { getRecordType } from '../../utils/helper';
import config from '../../config';
import style from './Index.less';

const Item = List.Item;
const Brief = Item.Brief;

class ItemBalance extends Component {
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
    const { data } = await request(`${config.host}/api/balance_records?${qs.stringify(params)}`);
    return data;
  }
  render() {
    const rows = (row) => {
      return (
        <Item key={row.id} arrow="horizontal"
          multipleLine
          onClick={() => {
            this.props.dispatch(routerRedux.push(`/app/balance/${row.id}`))
          }}
          extra={
            <div className={`${style.extra} ${row.receipt_type === 1 ? 'green' : ''}`}>
              {row.receipt_type === 1 ? '+' : '-'}{row.amount}
            </div>
          }>
          {getRecordType(row.record_type)}<Brief>{row.created_at}</Brief>
        </Item>
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

export default connect()(ItemBalance);
