import React from 'react';

class GlyphButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glyphIcon: props.glyphIcon,
      onClick: props.handleClick
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event){
    this.props.onClick(event)
  }

  render() {
    return(
        <div className="col-md-4 col-sm-4 col-xs-4">
          <div className="num" onClick={this.handleClick}>
            <div className="txt">
              <div className={"glyphicon " + this.state.glyphIcon}></div>
            </div>
          </div>
        </div>
    )
  }

}
export default GlyphButton;