import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Fab } from '@material-ui/core';

import { Video, Loading } from '../../components';
import { videoList, getLoading, getEdits } from './selectors';
import { loadVideos, setEdits, update } from './slice';

const Root = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  position: relative;
`;

const SaveButton = styled(Fab)`
  && {
    position: absolute;
    bottom: 0;
    right: 16px;
  }
`;

const VideoDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -60%);
  width: 60%;
`;

const Edit = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState({});

  const dispatch = useDispatch();
  const list = useSelector(videoList);
  const loading = useSelector(getLoading);
  const edits = useSelector(getEdits);

  useEffect(() => {
    const video = (list || []).find(v => (v.id === Number(id)));

    if(video && video.assets && video.assets.length > 0) {
      const lastAsset = video.assets.slice().sort((a, b) => b.id - a.id)[0];
      setAsset(lastAsset);
    }
  }, [id, list]);

  if (!loading && !list) dispatch(loadVideos());

  if (loading) return <Loading />;

  const handleChange = (val) => {
    if (val.length === 0 && edits.length === 0) return;
    dispatch(setEdits({ assetId: asset.id, videoId: id, edits: val }));
  }

  return (
    <Root>
      <VideoDisplay>
        <Video src={asset.src} duration={asset.duration} showControls onChange={handleChange} />
      </VideoDisplay>
      {edits.length > 0 && <SaveButton color="primary" variant="extended" onClick={() => dispatch(update())}>Save</SaveButton>}
    </Root>
  );
};

export default Edit;
