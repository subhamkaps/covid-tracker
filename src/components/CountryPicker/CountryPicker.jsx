import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import './CountryPicker.css';

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCountries(await fetchCountries());
    };
    fetchData();
  }, [setCountries]);

  return (
    <FormControl className="cpFormControl">
      <NativeSelect className="cpNativeSelect" defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        
        <option className="cpNativeOption" value="">Global</option>
        {countries
          ? countries.map((country, i) => (
              <option className="cpNativeOption" key={i} value={country.name}>
                {country.name}
              </option>
            ))
          : null}

      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
