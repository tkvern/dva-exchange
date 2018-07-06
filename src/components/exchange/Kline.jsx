import React, { Component } from 'react';
import { connect } from 'dva';
import F2 from '@antv/f2';
import $ from "jquery";
import moment from 'moment';
import { getCookie } from '../../utils/helper';
import config from '../../config';
import style from './Index.less';

class Kline extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    // console.log(this.props.data);
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
    const access_token = getCookie('access_token');
    $.ajax({
      url: config.host + '/api/klines',
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
      data: {
        per_page: 30,
        name: 'btc'
      },
      success: function (data) {
        data = data.list;
        data.sort(function (obj1, obj2) {
          return obj1.timestamp > obj2.timestamp ? 1 : -1;
        });
        data.forEach(function (obj) {
          obj.range = [obj.open, obj.close, obj.high, obj.low];
          obj.trend = obj.open <= obj.close ? 0 : 1;
          obj.time = moment(new Date(obj.timestamp * 1000)).format('HH:mm');
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
            tickCount: 2
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
      }
    });
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
