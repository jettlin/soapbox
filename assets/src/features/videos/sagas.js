import { put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './slice';

import * as videoApi from './api';
import { getAssetId, getVideoId, getEdits } from './selectors';

function* videoRequest() {
  try {
    const videoList = yield videoApi.all();

    yield put(actions.loadVideoSuccess({ videoList }));
  } catch(err) {
    const error = {
      msg: err.message,
      status: err.status,
    };

    yield put(actions.loadVideoError({ error }));
  }
}

function* updateVideo() {
  try {
    const edits = yield select(getEdits);
    const asset = yield select(getAssetId);
    const video = yield select(getVideoId);

    const data = {
      original: asset,
      edits,
      tag: new Date().toISOString(),
    };

    yield videoApi.update(video, data);
    yield put(actions.updateSuccess());

    window.location.href = '/videos';
  } catch(err) {
    console.error(err);

    const error = {
      msg: err.message,
      status: err.status,
    };

    yield put(actions.updateFailure({ error }))
  }
}

function* watchLoadVideos() {
  yield takeLatest(actions.loadVideos.type, videoRequest);
}

function* watchUpdateVideo() {
  yield takeLatest(actions.update.type, updateVideo);
}

export const sagas = {
  watchLoadVideos,
  watchUpdateVideo,
};
