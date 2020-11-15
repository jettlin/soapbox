import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'videos',
  initialState: {
    list: null,
    loading: false,
    error: null,
    edits: [],
    assetId: null,
    videoId: null,
  },
  reducers: {
    loadVideos: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadVideoSuccess: (state, action) => {
      state.list = action.payload.videoList;
      state.error = null;
      state.loading = false;
    },
    loadVideoError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setEdits: (state, action) => {
      state.assetId = action.payload.assetId;
      state.videoId = action.payload.videoId;
      state.edits = action.payload.edits;
    },
    update: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.error = null;
      state.list = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    }
  },
});

export const {
  loadVideos,
  loadVideoSuccess,
  loadVideoError,
  setLoading,
  setEdits,
  update,
  updateSuccess,
  updateFailure,
} = slice.actions;

export default slice.reducer;
