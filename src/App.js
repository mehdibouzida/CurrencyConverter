import React, {Component} from 'react';
import TimeTicker from './Component/TimeTicker';
import Utils from './utils/Utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';



class CurrencyConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      inputValue: '',
      fromKey: 'USD',
      toKey: 'EUR',
      outputValue: '',
      unitRate: '0.83',
      symbol: '$'
    }
  }

  convertCurrency() {
    this.prepareToMakeApiCall();
  }

  prepareToMakeApiCall() {
    var baseUrl = 'http://api.fixer.io/latest';

    var queryStringData = {
      base: this.state.fromKey,
      symbols: this.state.toKey
    };

    var querystring = Object.keys(queryStringData)
      .map(key => key + '=' + encodeURIComponent(queryStringData[key]))
      .join('&');

    var url = baseUrl + "?" + querystring;
    this.makeApiCall(url);
  }

  makeApiCall(query) {
    console.log(query);
    this.setState({
      isLoading: true
    });

    fetch(query)
      .then(response => response.json())
      .then(responseData => this.handleCurrencyResponse(responseData))
  }

  handleCurrencyResponse(response) {
    this.setState({
      isLoading: false
    });
    var rates = response.rates;

    var result = this.state.inputValue * rates[this.state.toKey];

    this.setState({
      outputValue: result
    });
    this.setState({
      unitRate: rates[this.state.toKey]
    });
    this.setState({
      symbol: Utils.symbol[this.state.toKey]
    });
    console.log(this.state.fromKey, this.state.toKey, this.state.outputValue);
  }

  handleFromChange(event) {
    event.preventDefault();
    this.setState({
      fromKey: event.nativeEvent.target.textContent
    });
    console.log(this.state.fromKey);
  }

  handleToChange(event) {
    event.preventDefault();
    this.setState({
      toKey: event.nativeEvent.target.textContent
    });
    console.log(this.state.toKey);
  }

  handleInputValueChange(event) {
    if (isNaN(event.target.value)) {
      alert("Must input numbers");
      return false;
    }
    this.setState({
      inputValue: event.target.value
    });

    console.log(this.state.inputValue);
  }

  handleConvertButtonPressed() {
    if (this.state.inputValue == "") {
      alert("Please enter an amount");
      return false;
    }
    this.convertCurrency();
  }



  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Currency Converter" />
          <center>
          <h4 className="muted"> Based on real-time currency rates <TimeTicker /> </h4>
          <br />
          <br />
          <br />
              <SelectField
              value={ this.state.fromKey }
              onChange={ this.handleFromChange.bind(this) }
              floatingLabelText="From"
              floatingLabelFixed={ true }
              errorText={ this.state.fromKey }
              errorStyle={ { color: 'purple' } }>
                  { Utils.options }
              </SelectField>

              <TextField
              id="text-field-controlled"
              value={ this.state.inputValue }
              inputStyle={ { textAlign: 'center' } }
              hintStyle={ { width: '600px', textAlign: 'center' } }
              hintText="Enter Amount" style={ { width: '600px' } }
              onChange={ this.handleInputValueChange.bind(this)} />

              <SelectField
              value="select .."
              onChange={ this.handleToChange.bind(this) }
              floatingLabelText="To"
              floatingLabelFixed={ true }
              errorText={ this.state.toKey }
              errorStyle={ { color: 'blue' } }>
                { Utils.options }
              </SelectField>
              <br />

              <FlatButton
              type="submit"
              label="Convert"
              secondary={ true }
              onClick={ this.handleConvertButtonPressed.bind(this) } />

              <br />
              <h4> { this.state.inputValue } { this.state.fromKey } = { this.state.outputValue } { this.state.toKey }</h4>
              <h7> 1 { this.state.fromKey } equals { this.state.unitRate } { this.state.toKey }</h7>
          </center>
          </MuiThemeProvider>
      </div>

    );
  }
}




export default CurrencyConverter;
