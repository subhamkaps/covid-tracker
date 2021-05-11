import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import './GridCard.css';

const GridCard = ({ type, heading, counterEnd, lastUpdateDate, desc }) => {
  let formattedDate = new Date(lastUpdateDate).toDateString();
  return (
    <Grid item component={Card} xs={12} md={3} className={`card ${type}`}>
      <CardContent>
        <Typography className="heading" color="textSecondary" gutterBottom>{heading}</Typography>
        <Typography className="data" variant="h5">
          <CountUp start={0} end={counterEnd} duration={2} separator="," />
        </Typography>
        <Typography className="date" color="textSecondary">{formattedDate}</Typography>
        <Typography className="desc" variant="body2">{desc}</Typography>
      </CardContent>
    </Grid>
  );
};

export default GridCard;
