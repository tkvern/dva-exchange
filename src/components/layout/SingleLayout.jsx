import { connect } from 'dva';

const SingleLayout = ({ children, dispatch }) => {

  return (
    <div>
      {children}
    </div>
  )
}

export default connect()(SingleLayout);
