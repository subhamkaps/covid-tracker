import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import './Chart.css';

const Chart = ({ confirmed, recovered, deaths, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchData();
  }, []);

  let lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  let barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className="chartContainer">{country ? barChart : lineChart}</div>
  )
};

export default Chart;
