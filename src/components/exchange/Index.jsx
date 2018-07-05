import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'antd-mobile';
import F2 from '@antv/f2';
import $ from "jquery";
import moment from 'moment';
import ListPlate from './ListPlate';
import ListOrder from './ListOrder';
// import TickerPanel from './TickerPanel';
import style from './Index.less';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ticker_price: this.props.ticker_price,
      ticker_percent: this.props.ticker_percent,
      ticker_change: this.props.ticker_change,
      ticker_direction: this.props.ticker_direction,
      ticker_24direction: this.props.ticker_24direction,
      cnyusd: this.props.cnyusd,
      disabled: !!this.props.disabled,
      user: this.props.user,
      canbetList: this.props.canbetList,
      participateList: this.props.participateList,
      processingList: this.props.processingList,
      settledList: this.props.settledList,
    }
  }
  componentWillMount = () => {
    this.props.dispatch({
      type: 'exchange/query',
      payload: {
        per_page: 300,
        datetime: 'today',
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ ...nextProps });
  }
  componentDidMount() {
    const chart = new F2.Chart({
      id: 'mountNode',
      pixelRatio: window.devicePixelRatio, // 指定分辨率
      padding: 'auto'
    });
    $.getJSON('/assets/data/huobi_btc_usdt_1min.json', function (data) {
      data = data.slice(10, 45); // 仅显示100 个
      data.sort(function (obj1, obj2) {
        return obj1.id > obj2.id ? 1 : -1;
      });
      data.forEach(function (obj) {
        obj.range = [obj.open, obj.close, obj.high, obj.low];
        obj.trend = obj.open <= obj.close ? 0 : 1;
        obj.time = moment(new Date(obj.id * 1000)).format('HH:mm');
      });
      chart.axis('time', {
        label: function label(text, index, total) {
          var cfg = {
            textAlign: 'center'
          };
          // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
          if (index === 0) {
            // cfg.textAlign = 'start';
          }
          if (index > 0 && index === total - 1) {
            // cfg.textAlign = 'end';
          }
          return cfg;
        },
        tickLine: {
          lineWidth: 1,
          length: 5,
          stroke: '#666'
        },
        line: {
          stroke: '#666',
          lineWidth: 1,
          top: true
        }
      });

      chart.axis('range', {
        line: {
          stroke: '#666',
          lineWidth: 1,
          top: true
        }
      });
      chart.source(data, {
        range: {
          tickCount: 5
        },
        time: {
          tickCount: 5
        }
      });
      chart.legend({
        itemWidth: null,
        items: [{
          name: '上涨',
          marker: 'circle',
          fill: '#3cbc98'
        }, {
          name: '下跌',
          marker: 'circle',
          fill: '#ff4a68'
        }]
      });
      chart.tooltip(false);
      chart.schema().position('time*range').color('trend', function (trend) {
        return ['#3cbc98', '#ff4a68'][trend];
      }).shape('candle').style('trend', {
        stroke: function stroke(val) {
          if (val === 1) {
            return '#ff4a68';
          }
        }
      });
      chart.render();
    });
  }
  render() {
    const listPlateProps = {
      user: this.state.user,
      canbetList: this.state.canbetList,
    }
    const listOrderProps = {
      participateList: this.state.participateList,
      processingList: this.state.processingList,
      settledList: this.state.settledList,
    }
    return (
      <div>
        {/*<TickerPanel {...this.state} />*/}
        <div className={style.chartWrapper}>
          <canvas id="mountNode" style={{ width: '100%', height: '240px' }}></canvas>
        </div>
        <WhiteSpace size="md" />
        {/*<iframe
          src="/tradingView.html"
          frameBorder="0"
          title="tradingView"
          style={{ width: '100%', height: 253, overflow: 'hidden' }}
        />*/}
        <ListPlate {...listPlateProps} />
        <ListOrder {...listOrderProps} />
      </div>
    );
  }
}

export default connect()(Index);
