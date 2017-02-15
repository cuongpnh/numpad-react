
import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import GlyphButton from './GlyphButton';
import './index.css';
import './Numpad.css';



class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tokenLength: 4,
      showNumericButton: true,
      showClearButton: false,
      showEnterButton: false,
    };

  }

  onNumberClick = (event) => {
    const newValue = event.target.innerHTML;

    if (this.isTokenValid()) {
      return;
    }

    this.setState((prevState) => {
      const newToken = prevState.token + newValue;
      const showNumericButton = (newToken.length !== this.state.tokenLength);

      return {token: prevState.token + newValue, showNumericButton};
    });
  }

  onClear = (event) => {
    this.initState();
  }

  onEnter = (event) => {
    if (!this.isTokenValid()) {
      return
    }
    this.sendRequestToServer()
  }

  isTokenValid() {
    return this.state.token.length === this.state.tokenLength;
  }

  sendRequestToServer() {
    this.initState();
    console.log("Sending request....");
  }

  initState(){
    this.setState({
      token: '',
      showNumericButton: true,
      showClearButton: false,
      showEnterButton: false,
    });
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
                  <div className="num-pad">
                    {
                      [1,2,3,4,5,6,7,8,9].map((e) =>
                        <Button disable={ !this.state.showNumericButton } key={e} value={e} onClick={this.onNumberClick}/>
                      )
                    }

                    <GlyphButton key="clearBtn" glyphIcon="glyphicon-remove" onClick={this.onClear}/>
                    <Button disable={ !this.state.showNumericButton } key="0" value="0" onClick={this.onNumberClick}/>
                    <GlyphButton key="okBtn" glyphIcon="glyphicon-ok" onClick={this.onEnter}/>
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
