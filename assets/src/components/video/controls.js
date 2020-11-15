import React from 'react';
import styled from 'styled-components';

import { Grid, IconButton, Slider, Typography } from '@material-ui/core';
import { VolumeDown, VolumeMute, VolumeUp, PlayArrow, Pause } from '@material-ui/icons';

const Root = styled(Grid)`
  width: 100%;
  background-color: black;
  color: white;
  opacity: .75;
  padding: 0 16px;
`;

const TrimSlider = styled(Slider)`
  & .MuiSlider-thumb {
    border-radius: 0;
    width: 6px;
  }

  & .MuiSlider-track {
    background: linear-gradient(to right, red ${props => props['data-current']}%, currentColor ${props => props['data-current']}%);
  }
`;

const ControlButton = styled(IconButton)`
  & .MuiSvgIcon-root {
    color: white;
  }
`;

const Controls = ({ playing, currentTime, duration, trim, onChange, volume, onVolumeChange, onPlayClick }) => {
  const value = [trim.start, currentTime, Math.round(trim.end || 0)];

  let timeStr = new Date(currentTime * 1000).toISOString().substr(11, 8);
  if (timeStr.startsWith('00:')) timeStr = timeStr.replace(/^00:/, '');

  const current = ((currentTime - trim.start)/((trim.end || 0) - trim.start)) * 100;

  let icon = <VolumeUp />;
  if (volume < 40) icon = <VolumeDown />;
  if (volume === 0) icon = <VolumeMute />;

  const formatData = (val) => {
    let retVal = new Date(val * 1000).toISOString().substr(11, 8);
    return (retVal.startsWith('00:') ? retVal.replace(/^00:/, '') : retVal);
  }

  return (
    <Root container spacing={1} alignItems="center">
      <Grid item xs={1}>
        <ControlButton onClick={onPlayClick} size="small">
          {playing ? <Pause /> : <PlayArrow />}
        </ControlButton>
      </Grid>
      <Grid item xs={7}>
        <TrimSlider
          value={value}
          onChange={(_e, v) => onChange(v)}
          max={duration}
          valueLabelDisplay="auto"
          data-current={current || 0}
          valueLabelFormat={formatData}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography align="center">{timeStr}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={4}>
            {icon}
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={volume}
              onChange={(_e, v) => onVolumeChange(v)}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
};

export default Controls;
