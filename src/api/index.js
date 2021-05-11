import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

const keyFetchData = 'data';
const keyFetchDailyData = 'dailyData';
const keyFetchCountries = 'countries';

const expiry = {
  FIVE_MINUTES: 300000,
  FIFTEEN_MINUTES: 900000,
  ONE_HOUR: 3600000,
};

export const fetchData = async () => {
  if (retriveFromLocalStorage(keyFetchData) !== null) {
    return retriveFromLocalStorage(keyFetchData);
  } else {
    try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
      //alternative is const response = await axios.get(url);
      //then use response.data, response.data.confirmed, etc.

      const requiredData = { confirmed, recovered, deaths, lastUpdate };

      saveToLocalStorage(keyFetchData, requiredData, expiry.FIVE_MINUTES);

      return requiredData;
    } catch (error) {
      console.log(error);
    }
  }
};


export const fetchCountryData = async (country) => {
  if (country) {
    const apiUrl = `${url}/countries/${country}`;
    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(apiUrl);
        
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      console.log(error);
    }
  }
};


export const fetchDailyData = async () => {
  if (retriveFromLocalStorage(keyFetchDailyData) !== null) {
    return retriveFromLocalStorage(keyFetchDailyData);
  } else {
    try {
      const { data } = await axios.get(`${url}/daily`);

      const modifiedData = data.map((dailyData) => ({
        //instant return
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));

      saveToLocalStorage(keyFetchDailyData, modifiedData, expiry.FIFTEEN_MINUTES);

      return modifiedData;
    } catch (error) {
      console.log(error);
    }
  }
};


export const fetchCountries = async () => {

  if (retriveFromLocalStorage(keyFetchCountries) !== null) {
    return retriveFromLocalStorage(keyFetchCountries);

  } else {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);

      saveToLocalStorage(keyFetchCountries, countries, expiry.ONE_HOUR);

      return countries;
    } catch (error) {
      console.log(error);
    }
  }
};


const saveToLocalStorage = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};


const retriveFromLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
