import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Badge, WhiteSpace, Steps } from 'antd-mobile';
import { Table } from 'antd';
import moment from 'moment';
import style from './Show.less';

const Item = List.Item;
const Brief = Item.Brief;

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        progress_state: {
          list: []
        }
      }
    }
  }
  componentWillMount = async () => {
    const id = window.location.hash.split('/').pop();
    await this.props.dispatch({
      type: 'exchange/show',
      payload: {
        id: id
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }

  formatDataTime(datatime) {
    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    var regExp = new RegExp(reg);
    if (!regExp.test(datatime)) {
      return "等待中";
    } else {
      return moment(datatime).format('MM-DD HH:mm:ss');
    }
  }

  render() {
    const columns = [{
      title: '方向',
      dataIndex: 'type',
      align: 'center',
      render: (text) => {
        if (text === 0) {
          return <Badge text="买涨" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
        } else if (text === 1) {
          return <Badge text="买跌" style={{ marginTop: -2, padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
        }
      }
    }, {
      title: '委托时间',
      dataIndex: 'created_at',
      align: 'center',
      render: (text) => {
        return moment(text).format('MM-DD HH:mm:ss')
      },
    }, {
      title: '本金',
      dataIndex: 'amount',
      align: 'right',
    }, {
      title: '盈亏',
      dataIndex: 'profit',
      align: 'right',
      render: (text) => {
        if (text > 0) {
          return <span className="green">{text}</span>
        } else {
          return <span className="red">{text}</span>
        }
      }
    }];
    const data = this.state.current.bet_orders || [];
    data.forEach((item) => {
      item['key'] = item.id
    });
    let StepList = [];
    const stepData = this.state.current.progress_state.list || [];
    stepData.forEach((item, index) => {
      let SubList = [];
      let subData = item.sub || [];
      subData.forEach((item, index) => {
        SubList.push(
          <span key={index}>{this.formatDataTime(item.datatime)} {item.content}<br /></span>
        );
      });
      StepList.push(
        <Steps.Step title={item.title} key={index} description={
          <div>
            {SubList}
          </div>
        } />
      );
    });
    if (StepList.length <= 0) {
      StepList.push(
        <Steps.Step title="正在准备" key="1" description={
          <div>
            <span>系统处理中</span>
          </div>
        } />
      );
    }
    return (
      <div className={style.content} >
        <List renderHeader={() => '进度信息'} className="my-list">
          <Item>
            <WhiteSpace size="xl" />
            <Steps size="small" current={stepData.length - 1}>
              {StepList}
            </Steps>
          </Item>
        </List>
        <List renderHeader={() => '盘口信息'} className="my-list">
          <Item extra={this.state.current.title}>交易名称</Item>
          <Item extra={this.state.current.margin_ratio}>杠杆倍数</Item>
          <Item extra={this.state.current.exchange}>交易所</Item>
          <Item extra={this.state.current.rate_text}>手续费</Item>
          <Item extra={
            moment(this.state.current.bet_time).format('YYYY-MM-DD HH:mm')
          }>开始下注</Item>
          <Item extra={
            moment(this.state.current.bet_stop_time).format('YYYY-MM-DD HH:mm')
          }>停止下注</Item>
          <Item extra={this.state.current.settlement_condition_text}>结算波动</Item>
          <Item multipleLine>描述<Brief>&nbsp;{this.state.current.describe}</Brief></Item>
        </List>
        <List renderHeader={() => '结算信息'} className="my-list">
          <div className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
            <div className="ant-table-content">
              <div className="ant-table-body">
                <table className="">
                  <thead className="ant-table-thead">
                    <tr>
                      <th><span>交易所下单时间</span></th>
                      <th colSpan="2">
                        <span>
                          {this.state.current.exchange_bet_time ? this.state.current.exchange_bet_time.exp : ''}
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th style={{ "textAlign": "center" }}><span>方向</span></th>
                      <th style={{ "textAlign": "right" }}><span>成交(时间-价格)</span></th>
                      <th style={{ "textAlign": "right" }}><span>结算(时间-价格)</span></th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    <tr>
                      <td style={{ "textAlign": "center" }}>
                        <Badge text="买涨" style={{ padding: '0 3px', backgroundColor: '#3fc295', borderRadius: 2 }} />
                      </td>
                      <td style={{ "textAlign": "right" }}>
                        <span>
                          {this.state.current.exchange_bet_time ?
                            this.formatDataTime(this.state.current.exchange_bet_time.long) : ''}
                        </span><br />
                        <span>
                          {this.state.current.bet_price ? this.state.current.bet_price.long : ''}
                        </span>
                      </td>
                      <td style={{ "textAlign": "right" }}>
                        <span>
                          {this.state.current.settlement_time ?
                            this.formatDataTime(this.state.current.settlement_time.long) : ''}
                        </span><br />
                        <span>
                          {this.state.current.settlement_price ? this.state.current.settlement_price.long : ''}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ "textAlign": "center" }}>
                        <Badge text="买跌" style={{ padding: '0 3px', backgroundColor: '#e14d4e', borderRadius: 2 }} />
                      </td>
                      <td style={{ "textAlign": "right" }}>
                        <span>
                          {this.state.current.exchange_bet_time ?
                            this.formatDataTime(this.state.current.exchange_bet_time.short) : ''}
                        </span><br />
                        <span>
                          {this.state.current.bet_price ? this.state.current.bet_price.short : ''}
                        </span>
                      </td>
                      <td style={{ "textAlign": "right" }}>
                        <span>
                          {this.state.current.settlement_time ?
                            this.formatDataTime(this.state.current.settlement_time.short) : ''}
                        </span><br />
                        <span>
                          {this.state.current.settlement_price ? this.state.current.settlement_price.short : ''}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </List>
        <List renderHeader={() => '委托信息'} className="my-list">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </List>
      </div >
    );
  }
}


export default connect()(Show);
