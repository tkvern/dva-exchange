import React, { Component } from 'react';
import { connect } from 'dva';
import F2 from '@antv/f2';
import moment from 'moment';
import style from './Index.less';

class Kline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      klines: this.props.klines,
      close: '0000.00'
    }
    // console.log(this.props.data);
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...nextProps,
      close: nextProps.klines[0].close
    });

    this.chart.legend({
      custom: true,
      itemWidth: null,
      items: [{
        name: 'BTC/USDT',
        marker: '',
        fill: '#999'
      }, {
        name: '火币网近半小时报价',
        marker: '',
        fill: '#999'
      }, {
        name: nextProps.klines[0].close,
        marker: '',
        fill: '#40a9ff'
      }]
    });
    let data = this.dataSourceFilter(nextProps.klines);
    this.chart.changeData(data);
  }
  componentDidMount() {
    this.chart = new F2.Chart({
      id: 'mountNode',
      pixelRatio: window.devicePixelRatio, // 指定分辨率
      padding: 'auto'
    });
    let data = this.dataSourceFilter(this.state.klines);
    this.chart.axis('time', {
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
    this.chart.axis('range', {
      line: {
        stroke: '#666',
        lineWidth: 1,
        top: true
      }
    });
    this.chart.source(data, {
      range: {
        tickCount: 5
      },
      time: {
        tickCount: 2
      }
    });
    this.chart.legend({
      custom: true,
      itemWidth: null,
      items: [{
        name: 'BTC/USDT',
        marker: '',
        fill: '#999'
      }, {
        name: '火币网近半小时报价',
        marker: '',
        fill: '#999'
      }, {
        name: this.state.close,
        marker: '',
        fill: '#40a9ff'
      }]
    });
    this.chart.tooltip(false);
    this.chart.schema().position('time*range').color('trend', function (trend) {
      return ['#3cbc98', '#ff4a68'][trend];
    }).shape('candle').style('trend', {
      stroke: function stroke(val) {
        if (val === 1) {
          return '#ff4a68';
        }
      }
    });
    this.chart.render();
  }
  dataSourceFilter(data) {
    data.sort(function (obj1, obj2) {
      return obj1.timestamp > obj2.timestamp ? 1 : -1;
    });
    data.forEach(function (obj) {
      obj.range = [obj.open, obj.close, obj.high, obj.low];
      obj.trend = obj.open <= obj.close ? 0 : 1;
      obj.time = moment(new Date(obj.timestamp * 1000)).format('HH:mm');
    });
    return data;
  }

  render() {
    return (
      <div className={style.content}>
        <div className={style.chartWrapper}>
          <canvas id="mountNode" style={{ width: '100%', height: '240px' }}></canvas>
        </div>
      </div>
    );
  }
}

export default connect()(Kline);
