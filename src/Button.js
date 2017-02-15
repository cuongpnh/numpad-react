import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      disable: false,
      onClick: props.handleClick
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event){
    this.props.onClick(event)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({disable: nextProps.disable})
  }

  render() {
    return(
        <div className="col-md-4 col-sm-4 col-xs-4">
          <div className={"num " + (this.state.disable ? "disable" : "")} onClick={this.handleClick}>
              <div className="txt">{this.state.value}</div>
          </div>
        </div>
    )
  }

}
export default Button;