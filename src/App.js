import React from 'react';

import { Cards, Chart, CountryPicker } from './components/';
import { fetchData, fetchCountryData } from './api';

import './App.css';

import Logo from './images/ct-logo.png';

class App extends React.Component {
  state = {
    confirmed: null,
    recovered: null,
    deaths: null,
    lastUpdate: null,
    country: '',
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({
      ...this.state,
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    });
  }

  handleCountryChange = async (country) => {
    if (!country) {
      //country picker set to global, repeating the componentDidMount thing
      const data = await fetchData();
      this.setState({
        ...this.state,
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate,
        country: ''
      });
      
    } else {
      const countryData = await fetchCountryData(country);
      this.setState({
        ...this.state,
        confirmed: countryData.confirmed,
        recovered: countryData.recovered,
        deaths: countryData.deaths,
        lastUpdate: countryData.lastUpdate,
        country: country,
      });
    }
  };

  render() {
    const { confirmed, recovered, deaths, lastUpdate, country } = this.state;

    return (
      <div className="app">
        <img className="logo" src={Logo} alt="logo" />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          lastUpdate={lastUpdate}
        />
        <Chart confirmed={confirmed} recovered={recovered} deaths={deaths} country={country} />
      </div>
    );
  }
}

export default App;
