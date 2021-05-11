import React from 'react';
import { Grid } from '@material-ui/core';

import GridCard from './GridCard/GridCard';

import './Cards.css';

const Cards = ({ confirmed, recovered, deaths, lastUpdate }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className="cardContainer">
      <Grid container spacing={3} justify="center">
        <GridCard
          type="infected"
          heading="Infected"
          counterEnd={confirmed.value}
          lastUpdateDate={lastUpdate}
          desc="Number of active cases of Covid-19"
        />
        <GridCard
          type="recovered"
          heading="Recovered"
          counterEnd={recovered.value}
          lastUpdateDate={lastUpdate}
          desc="Number of recoveries from Covid-19"
        />
        <GridCard
          type="deaths"
          heading="Deaths"
          counterEnd={deaths.value}
          lastUpdateDate={lastUpdate}
          desc="Number of deaths caused by Covid-19"
        />
      </Grid>
    </div>
  );
};

export default Cards;
