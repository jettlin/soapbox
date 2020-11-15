import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Slider, TextField } from '@material-ui/core';

import Controls from './controls';
import Overlay from './overlay';

const Root = styled.div`
  position: relative;
`;

const VideoDisplay = styled.video`
  transform: rotate(${props => props['data-rotate']}deg);
`;

const RotateContainer = styled.div`
  position: fixed;
  right: -150px;
  top: 50%;
  transform: translateY(-50%);
  height: 360px;
`;

const RotateInput = styled(TextField)`
  width: 85px;
`;

const Video = ({ src, duration, showControls = false, onChange = (_val) => {} }) => {
  const ref = useRef();

  const [rotate, setRotate] = useState(0);
  const [trim, setTrim] = useState({ start: 0, end: duration });
  const [overlay, setOverlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [vol, setVol] = useState(50);

  useEffect(() => {
    setTrim({ start: 0, end: duration});
  }, [duration]);

  useEffect(() => {
    const changes = [];
    if (rotate > 0) changes.push({ type: 'rotate', scale: rotate });
    if (trim.start > 0 || trim.end < Math.round(duration)) changes.push({ ...trim, type: 'trim' });

    onChange(changes);
  }, [rotate, trim.start, trim.end]);

  const handleTrimChange = (val) => {
    setTrim({ start: val[0], end: val[2] });
    setCurrentTime(val[1]);

    if (ref.current) {
      ref.current.currentTime = val[1];

      if (ref.current.currentTime < val[0]) ref.current.currentTime = val[0];
      if (ref.current.currentTime > val[2]) ref.current.currentTime = val[1];
    }
  }

  const handleUpdate = () => {
    if (!ref.current) return;

    setCurrentTime(ref.current.currentTime);

    if (ref.current.currentTime > trim.end) {
      ref.current.pause();
      ref.current.currentTime = trim.start;
      setOverlay(true);
    }
  };

  const handleClickOverlay = () => {
    setOverlay(false);
    if (ref.current) {
      ref.current.volume = vol/100;
      ref.current.play();
    }
  };

  const handleVolumeChange = (val) => {
    setVol(val);
    ref.current.volume = val/100;
  }

  const handleVideoClick = () => {
    if (!ref.current) return;

    if (ref.current.paused)
      ref.current.play();
    else
      ref.current.pause();

    setOverlay(ref.current.paused);
  }

  const handleRotate = (val) => {
    let updateVal = val;
    while (updateVal >= 360)
      updateVal -= 360;

    setRotate(updateVal);
  }

  const controls = (
    <>
      <Controls
        playing={!!!ref.current?.paused}
        currentTime={currentTime}
        trim={trim}
        onChange={handleTrimChange}
        duration={duration}
        volume={vol}
        onVolumeChange={handleVolumeChange}
        onPlayClick={handleVideoClick}
      />
      <RotateContainer>
        <RotateInput label="rotate (deg)" value={rotate} onChange={(e) => handleRotate(e.target.value)} />
        <br />
        <br />
        <Slider
          value={rotate || 0}
          onChange={(_e, val) => handleRotate(val)}
          max={359}
          orientation="vertical"
        />
      </RotateContainer>
    </>
  );

  return (
    <Root>
      <Overlay show={overlay} onClick={handleClickOverlay} />
      <VideoDisplay width="100%" data-rotate={rotate} ref={ref} onTimeUpdate={handleUpdate} onClick={handleVideoClick}>
        <source src={src} />
      </VideoDisplay>
      {showControls && controls}
    </Root>
  )
};

export default Video;
