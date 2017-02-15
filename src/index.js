
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import './index.css';
import './Numpad.css';


class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tokenLength: 4,
    };
  }

  onNumberClick = (event) => {
    const newValue = event.target.innerHTML;
    this.setState((prevState) => {
      const currentTokenLength = prevState.token.length
      if (currentTokenLength < this.state.tokenLength) {
          return {token: prevState.token + newValue};
      }

       document.getElementById('myModal').modal('show')
    });
  }

  onClear = (event) => {
    this.setState((prevState) => {
      return {token: ''};
    });
  }

  onEnter = (event) => {
    var token = this.state.token;
    if (token == "") {
      alert("Có cái gì đâu mà enter mạy")
      return
    }
  }

  render (){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 bg-white">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group input-group-lg full-width pad-top-10 pad-bot-30">
                    <input type="text" className="form-control" name="token" id="token" value={this.state.token} />
                  </div>
                  <div className="num-pad">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">1</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">2</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">3</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">4</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">5</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">6</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">7</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">8</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                        <div className="txt">9</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onClear}>
                        <div className="txt">
                          <div className="glyphicon glyphicon-remove"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onNumberClick}>
                          <div className="txt">0</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <div className="num" onClick={this.onEnter}>
                          <div className="txt">
                            <div className="glyphicon glyphicon-ok"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

class View extends React.Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    return <div onClick={this.handleClick}>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <h1>Dialog Content</h1>
            <p>More Content. Anything goes here</p>
          </ModalDialog>
        </ModalContainer>
      }
    </div>;
  }
}

ReactDOM.render(
  <Numpad />,
  document.getElementById('root')
);
