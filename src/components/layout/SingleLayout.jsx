import { connect } from 'dva';
import style from './SingleLayout.less';
const SingleLayout = ({ children, dispatch }) => {

  return (
    <div className={style.touch}>
      {children}
    </div>
  )
}

export default connect()(SingleLayout);
