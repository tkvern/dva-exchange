import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { } from 'antd-mobile';
import List from './List';
// import style from './Index.less';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

export default connect()(Index);
