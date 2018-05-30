import { Component } from "react";
import { connect } from "dva";
import styleo from './ExchangeOrderPanel.less';

class ExchangeResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: this.props.result.price,
      dirct: this.props.result.dirct
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      price: nextProps.result.price,
      dirct: nextProps.result.dirct
    });
  }
  render() {
    return (
      <span className={`${styleo.value} ${this.state.dirct ? styleo.up : styleo.down}`}>{this.state.price}</span>
    )
  }
}
export default connect()(ExchangeResult);
