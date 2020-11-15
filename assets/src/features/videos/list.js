import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { List as MuiList, Fab, Snackbar, SnackbarContent } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import * as selectors from './selectors';
import { loadVideos, setLoading } from './slice';
import { Loading } from '../../components';
import UploadModal from './upladModal';
import VideoRow from './videoRow';
import { upload } from './api';

const AddButton = styled(Fab)`
  && {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;

const List = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectors.videoList);
  const loading = useSelector(selectors.getLoading);
  const [uploadError, setUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!loading && !list) dispatch(loadVideos());

  if (loading) return <Loading />;

  const listDisplay = (list || []).map(v => <VideoRow key={v.id} video={v} />);

  const onUpload = (file) => {
    dispatch(setLoading({ loading: true }));

    upload(file).catch(err => {
      setUploadError(err);
      console.error(err);
    }).finally(() => {
      dispatch(loadVideos());
    });
  };

  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') return;

    setUploadError(null);
  }

  const errMsg = (
    <Snackbar autoHideDuration={4000} onClose={handleClose}>
      <SnackbarContent>Something went wrong!  Could not upload video!</SnackbarContent>
    </Snackbar>
  );

  return (
    <>
      <MuiList>
        {listDisplay}
      </MuiList>
      <AddButton color="primary" onClick={() => setShowModal(true)}>
        <Add />
      </AddButton>
      <UploadModal show={showModal} onClose={() => setShowModal(false)} onUpload={onUpload} />
      {uploadError && errMsg}
    </>
  )
};

export default List;
