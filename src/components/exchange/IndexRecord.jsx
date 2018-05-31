import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ListView, Tabs, Badge, Card, Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import style from './IndexRecord.less';

let pageIndex = 0

const data = [
  {
    "id": 1,
    "title": "BTC/USDT",
    "bet_time": "2018-05-30 11:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": false,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": null,
    "settlement_price": null,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
  {
    "id": 2,
    "title": "BTC/USDT",
    "bet_time": "2018-05-30 12:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": false,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": null,
    "settlement_price": null,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
  {
    "id": 3,
    "title": "EOS/USDT",
    "bet_time": "2018-05-30 13:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": false,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": null,
    "settlement_price": null,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
  {
    "id": 4,
    "title": "ETH/USDT",
    "bet_time": "2018-05-30 14:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": false,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": null,
    "settlement_price": null,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
  {
    "id": 5,
    "title": "BTC/USDT",
    "bet_time": "2018-05-30 15:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": true,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": "2018-05-31 18:00:00",
    "settlement_price": 7322.26,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
  {
    "id": 6,
    "title": "HT/USDT",
    "bet_time": "2018-05-30 18:00:00",
    "settlement_conditions": "币价 ±1%",
    "income": "+87%",
    "end_time": "2018-05-31 19:00:00",
    "is_settlement": true,
    "replenishment_time": "2018-05-31 19:00:00",
    "replenishment_price": 7231.52,
    "settlement_time": "2018-05-31 18:00:00",
    "settlement_price": 6822.26,
    "orders": [
      {
        price: 5000,
        is_down: true
      },
      {
        price: 200,
        is_down: false
      },
      {
        price: 1288,
        is_down: true
      }
    ]
  },
];

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

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
    }
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }


  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  }
  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 1000);
  };

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    let index = data.length - 1;
    const rows = ({ rowData, sectionID, rowID }) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[(data.length - 1 - index--)];
      console.log(obj);
      return (
        <WingBlank>
          <Card key={rowID}>
            <Card.Header
              style={{
                backgroundColor: (obj.is_settlement ? '#f1f1f1' : '#e7f9f4')
              }}
              title={
                <div style={{ fontSize: '14px' }}>
                  <span>{obj.title}</span>
                  {obj.is_settlement ?
                    <span className="gray"> 已结算</span> :
                    <span className="green"> 进行中</span>
                  }
                </div>
              }
              onClick={() => this.props.dispatch(routerRedux.push(`/app/exchange/${obj.id}/order`))}
              extra={<span style={{ fontSize: '14px', color: 'rgb(51, 163, 244)' }}>详情</span>}
            />
            <Card.Body>
              <Flex>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="开盘时间" style={{ color: '#888' }}>开盘时间: </label>
                      <label>08-15 20:15</label>
                    </div>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="结算条件" style={{ color: '#888' }}>结算条件: </label>
                      <label>币价 ±1%</label>
                    </div>
                  </div>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="配资时间" style={{ color: '#888' }}>配资时间: </label>
                      <label>08-15 20:15</label>
                    </div>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="配资价格" style={{ color: '#888' }}>配资价格: </label>
                      <label>7105.54</label>
                    </div>
                  </div>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="结算时间" style={{ color: '#888' }}>结算时间: </label>
                      <label>等待中...</label>
                    </div>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="结算价格" style={{ color: '#888' }}>结算价格: </label>
                      <label>等待中...</label>
                    </div>
                  </div>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <div className={`${style.formItem} ${style.antRow}`} style={{ minHeight: '26px' }}>
                    <div className={style.itemLabel}>
                      <label title="我的委托" style={{ color: '#888' }}>我的委托: </label><br />
                      <label>
                        <Badge text="买涨 100CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                        <Badge text="买跌 500CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                        <Badge text="买涨 120CNY" style={{ marginTop: 5, marginRight: 5, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                      </label>
                    </div>
                  </div>
                </Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
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
        >
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>

            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
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
                  <span>已显示最新数据</span>
                </div>
              )}
              pageSize={10}
              onScroll={() => { }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>

            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
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
                  <span>已显示最新进行中数据</span>
                </div>
              )}
              pageSize={10}
              onScroll={() => { }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>

            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
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
            />
          </div>
        </Tabs>
      </div>
    );
  }
}


export default connect()(IndexRecord);
