import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { WhiteSpace, WingBlank, Badge, Tabs, Pagination } from 'antd-mobile';
import { Table } from 'antd';
import style from './List.less';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const columns = [{
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      align: 'center',
      render: (text) => {
        let icon_custom;
        switch (text) {
          case 1:
            icon_custom = <i className="iconfont"
              style={{
                color: '#f8b403'
              }}>&#xe653;</i>
            break;
          case 2:
            icon_custom = <i className="iconfont"
              style={{
                color: '#8faddb'
              }}>&#xe652;</i>
            break;
          case 3:
            icon_custom = <i className="iconfont"
              style={{
                color: '#f0c198'
              }}>&#xe651;</i>
            break;
          default:
            icon_custom = text
        }
        return icon_custom;
      }
    }, {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    }, {
      title: '财富',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
    }, {
      title: '操作记录',
      align: 'right',
      dataIndex: 'key',
      key: 'key',
      render: (text) => {
        return <span style={{ color: 'rgb(51, 163, 244)' }}>详情</span>
      }
    }];
    const data = [{
      key: '1',
      rank: 1,
      username: 'zshuang',
      balance: 50000,
    }, {
      key: '2',
      rank: 2,
      username: 'zc',
      balance: 40000,
    }, {
      key: '3',
      rank: 3,
      username: 'tkvern',
      balance: 30000,
    }, {
      key: '4',
      rank: 4,
      username: 'danel',
      balance: 29000,
    }, {
      key: '5',
      rank: 5,
      username: 'danel',
      balance: 29000,
    }, {
      key: '6',
      rank: 6,
      username: 'danel',
      balance: 29000,
    }, {
      key: '7',
      rank: 7,
      username: 'danel',
      balance: 29000,
    }, {
      key: '8',
      rank: 8,
      username: 'danel',
      balance: 29000,
    }, {
      key: '9',
      rank: 9,
      username: 'danel',
      balance: 29000,
    }, {
      key: '10',
      rank: 10,
      username: 'danel',
      balance: 29000,
    }];
    const locale = {
      prevText: '上一页',
      nextText: '下一页',
    };
    return (
      <div className={style.content}>
        <div className={style.white}>
          <Tabs tabs={[
            { title: <Badge>富豪榜</Badge> },
            { title: <Badge>实力榜</Badge> },
          ]}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            useOnPan={false}
          >
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <div className="am-list-header">
                <div style={{ textAlign: 'center' }}>
                  <span>8月1日更新</span>
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <WhiteSpace size="md" />
              <WingBlank>
                <Pagination total={10} current={1} locale={locale} />
              </WingBlank>
              <WhiteSpace size="md" />
            </div>
            <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
              <div className="am-list-header">
                <div style={{ textAlign: 'center' }}>
                  <span>8月1日更新</span>
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <WhiteSpace size="md" />
              <WingBlank>
                <Pagination total={10} current={1} locale={locale} />
              </WingBlank>
              <WhiteSpace size="md" />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect()(List);
