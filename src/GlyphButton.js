import React from 'react';

class GlyphButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glyphIcon: props.glyphIcon,
      disable: props.disable,
      onClick: props.handleClick
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({disable: nextProps.disable})
  }

  handleClick (event){
    this.props.onClick(event)
  }

  render() {
    return(
        <div className="col-md-4 col-sm-4 col-xs-4">
          <div className={"num " + (this.state.disable ? "disable" : "")}>
            <div className="txt" onClick={this.handleClick}>
              <div className={"glyphicon " + this.state.glyphIcon}></div>
            </div>
          </div>
        </div>
    )
  }

}
export default GlyphButton;