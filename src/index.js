import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import GlyphButton from './GlyphButton';
import './Numpad.css';

class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tokenLength: 4,
      disableNumericButton: false,
      disableClearButton: true,
      disableEnterButton: true,
      errorMsg: ''
    };

  }

  onNumberClick = (event) => {
    this.hideAlert();

    const newValue = event.target.innerHTML;

    if (this.isTokenValid()) {
      return;
    }

    this.setState((prevState) => {
      const newToken = prevState.token + newValue;

      const disableClearButton = false;
      const disableEnterButton = (newToken.length !== this.state.tokenLength);
      const disableNumericButton = (newToken.length === this.state.tokenLength);

      return {token: prevState.token + newValue, disableNumericButton, disableClearButton, disableEnterButton};
    });
  }

  onClear = (event) => {
    if (this.state.disableClearButton) {
      return;
    }
    this.initState();
  }

  onEnter = (event) => {
    if (this.state.disableEnterButton) {
      return;
    }

    if (!this.isTokenValid()) {
      return
    }
    this.sendRequestToServer()
  }

  isTokenValid() {
    return this.state.token.length === this.state.tokenLength;
  }

  sendRequestToServer() {
    const url = 'http://localhost:3001/api/machine/dispense/' + this.state.token;
    const method = 'POST';
    const header = {'Content-Type': 'application/x-www-form-urlencoded'}

    fetch(url, {
      method: method,
      headers: header,
    })
    .then((response) => {
      if (!response.ok) {
        this.showAlert();
        return
      }

      return response.json();
    })
    .then((responseJson) => {
      if (!responseJson.success) {
        this.showAlert('Token is wrong or expired');
      }
    })
    .catch((error) => {
      this.showAlert();
    });

    this.initState();
  }

  initState(){
    this.setState({
      token: '',
      disableNumericButton: false,
      disableClearButton: true,
      disableEnterButton: true,
      errorMsg: ''
    });
  }

  showAlert(errorMsg = 'An error has occur. Please try again') {
    this.setState({errorMsg: errorMsg});
  }

  hideAlert() {
   this.setState({errorMsg: ''});
  }

  render (){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 bg-white">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group input-group-lg full-width pad-top-10 pad-bot-30">
                    <input type="text" className="form-control" name="token" id="token" value={this.state.token} placeholder="XXXX"/>
                  </div>

                  <div className={"alert alert-danger " + ((this.state.errorMsg === '') ? "hide" : "")}>
                    <strong>{this.state.errorMsg}</strong>
                  </div>

                  <div className="num-pad">
                    {
                      [1,2,3,4,5,6,7,8,9].map((e) =>
                        <Button disable={ this.state.disableNumericButton } key={e} value={e} onClick={this.onNumberClick}/>
                      )
                    }

                    <GlyphButton disable={ this.state.disableClearButton } key="clearBtn" glyphIcon="glyphicon-remove" onClick={this.onClear}/>
                    <Button disable={ this.state.disableNumericButton } key="0" value="0" onClick={this.onNumberClick}/>
                    <GlyphButton disable={ this.state.disableEnterButton } key="okBtn" glyphIcon="glyphicon-ok" onClick={this.onEnter}/>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Numpad />,
  document.getElementById('root')
);
