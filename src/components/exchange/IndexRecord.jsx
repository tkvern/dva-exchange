import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { ListView, Tabs, Badge, WingBlank, WhiteSpace } from 'antd-mobile';
import qs from 'qs';
import ItemOrder from './ItemOrder';
import request from '../../utils/request';
import config from '../../config';
import style from './IndexRecord.less';

class IndexRecord extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 88,
      data: [],
      dataSource,
      isLoading: true,
      useBodyScroll: false,
      recoredParticipateList: this.props.recoredParticipateList,
      recoredProcessingList: this.props.recoredProcessingList,
      recoredSettledList: this.props.recoredSettledList,
      paIsLoading: this.props.paIsLoading,
      prIsLoading: this.props.prIsLoading,
      seIsLoading: this.props.seIsLoading,
    }
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

  async componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    const { list } = await this.genData({ is_participate: 1 });
    this.rData = list;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    });
  }
  componentWillUnmount() {
    document.body.style.overflow = '';
    this.timer && clearTimeout(this.timer);
    this.timer2 && clearTimeout(this.timer2);
  }

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

  onEndReached = (event) => {
    console.log(event);
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });

    this.timer = setTimeout(() => {
      this.rData = [...this.rData, ...this.state.recoredParticipateList];
      console.log(this.rData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  async genData(params) {
    const { data } = await request(`${config.host}/api/bets?${qs.stringify(params)}`);
    return data;
  }

  render() {
    const rows = (row) => {
      console.log(row);
      return (
        <WingBlank>
          <ItemOrder key={row.id} data={row} />
          <WhiteSpace size="md" />
        </WingBlank>
      );
    }
    return (
      <div className={style.content}>
        <Tabs tabs={[
          { title: <Badge>参与</Badge> },
          { title: <Badge>进行中</Badge> },
          { title: <Badge>已结算</Badge> },
        ]}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          useOnPan={false}
        >
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>

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
              pageSize={15}
              onScroll={() => { }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            {/*<ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.prIsLoading ? '加载中...' : '加载完成'}
              </div>)}
              renderRow={row => (rows(row))}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              renderHeader={() => (
                <div style={{ textAlign: 'center' }}>
                  <span>已显示最新进行中数据</span>
                </div>
              )}
              pageSize={10}
              onScroll={() => { }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />*/}
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            {/*<ListView
              ref={el => this.lv = el}
              dataSource={this.state.seIsLoading}
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.isLoading ? '加载中...' : '加载完成'}
              </div>)}
              renderRow={row => (rows(row))}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              renderHeader={() => (
                <div style={{ textAlign: 'center' }}>
                  <span>已显示最新已结算数据</span>
                </div>
              )}
              pageSize={10}
              onScroll={() => { }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />*/}
          </div>
        </Tabs>
      </div>
    );
  }
}


export default connect()(IndexRecord);
