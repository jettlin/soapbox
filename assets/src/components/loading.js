import React from 'react';
import styled from 'styled-components';

import { Grid, CircularProgress, Typography } from '@material-ui/core';

const FullHeight = styled(Grid)`
  height: 100%;
`;

const Loading = ({ msg = 'Loading' }) => (
  <FullHeight container spacing={0} alignItems="center">
    <Grid item xs={4} />
    <Grid item xs={4}>
      <Typography align="center" variant="h3">{msg}</Typography>
      <br />
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={5} />
        <Grid item xs={2}>
          <CircularProgress />
        </Grid>
        <Grid item xs={5} />
      </Grid>
    </Grid>
    <Grid item xs={4} />
  </FullHeight>
);

export default Loading;
