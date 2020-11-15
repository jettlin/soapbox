import React from 'react';
import styled from 'styled-components';

import { ListItem, Typography, Grid } from '@material-ui/core';

const Text = styled(Typography)`
  padding: 8px;
`;

const VideoRow = ({ video }) => (
  <ListItem button onClick={() => window.location.href = `/videos/${video.id}`} alignItems="center">
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <img width="100%" src={`/videos/${video.id}/screenshot.jpg`} alt={video.name} />
      </Grid>
      <Grid item xs={10}>
        <Text variant="h6">{video.name}</Text>
      </Grid>
    </Grid>
  </ListItem>
);

export default VideoRow;
