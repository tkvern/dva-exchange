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
  render() {
    const participateProps = {
      params: {
        is_participate: 1,
        per_page: 10,
      }
    }
    const processingProps = {
      params: {
        state: 1,
        per_page: 10,
      }
    }
    const settledProps = {
      params: {
        state: 2,
        per_page: 10,
      }
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
            <ItemRecord {...participateProps} />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemRecord {...processingProps} />
          </div>
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemRecord {...settledProps} />
          </div>
        </Tabs>
      </div>
    );
  }
}


export default connect()(IndexRecord);
