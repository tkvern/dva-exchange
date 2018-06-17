import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Badge } from 'antd-mobile';
import ItemRecord from './ItemRecord';
import style from './IndexRecord.less';

class IndexRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
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

  render() {
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
            <ItemRecord />
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
