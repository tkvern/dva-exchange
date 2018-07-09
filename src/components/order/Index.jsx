import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Badge } from 'antd-mobile';
import ItemOrder from './ItemOrder';
import style from './Index.less';

class OrderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const itemAllProps = {
      params: {
        per_page: 20
      }
    }
    return (
      <div className={style.content}>
        <Tabs tabs={[
          { title: <Badge>全部</Badge> },
        ]}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          useOnPan={false}
        >
          <div style={{ minHeight: '326px', backgroundColor: '#fff' }}>
            <ItemOrder {...itemAllProps} />
          </div>
        </Tabs>
      </div>
    );
  }
}


export default connect()(OrderPanel);
