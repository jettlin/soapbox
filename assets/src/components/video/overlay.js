import React from 'react';
import styled from 'styled-components';

import { IconButton } from '@material-ui/core';
import { PlayCircleOutline, PauseCircleOutline } from '@material-ui/icons';

const Root = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 40px;
  left: 0;
  z-index: 9999;
  opacity: 1;
`;

const PlayButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & .MuiSvgIcon-fontSizeLarge {
    font-size: 7rem;
    color: white;
  }
`;

const Overlay = ({ show = true, onClick, bg = true }) => {
  if (!show) return null;

  return (
    <Root onClick={onClick}>
      <PlayButton size="small">
        {bg ? <PlayCircleOutline fontSize="large" /> : <PauseCircleOutline fontSize="large" />}
      </PlayButton>
    </Root>
  );
};

export default Overlay;
