import React, { Component } from 'react';
import { connect } from 'dva';
// import ReactDOM from 'react-dom';
import { ListView, WingBlank, WhiteSpace } from 'antd-mobile';
import ItemOrder from './ItemOrder';
import qs from 'qs';
import request from '../../utils/request';
import config from '../../config';
// import style from './ItemOrder.less';

class ItemRecord extends Component {
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

  // onRefresh = () => {
  //   this.setState({ refreshing: true, isLoading: true });
  //   // simulate initial Ajax
  //   setTimeout(() => {
  //     this.rData = genData();
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //       refreshing: false,
  //       isLoading: false,
  //     });
  //   }, 1000);
  // };

  async genData(params) {
    const { data } = await request(`${config.host}/api/bets?${qs.stringify(params)}`);
    return data;
  }
  render() {
    const rows = (row) => {
      return (
        <WingBlank>
          <ItemOrder key={row.id} data={row} />
          <WhiteSpace size="md" />
        </WingBlank>
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
        renderHeader={() => (
          <div style={{ textAlign: 'center' }}>
            <span>已显示最新数据</span>
          </div>
        )}
        pageSize={10}
        onScroll={() => { }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default connect()(ItemRecord);
