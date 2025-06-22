// store/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: null,
  currentSection: null,
  completedVideos: [],
  videoProgress: {}, // { videoId: progress }
  notes: {}, // { videoId: note }
  isPlaying: false,
  volume: 1,
  playbackRate: 1
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    markVideoComplete: (state, action) => {
      const videoId = action.payload;
      if (!state.completedVideos.includes(videoId)) {
        state.completedVideos.push(videoId);
      }
    },
    setVideoProgress: (state, action) => {
      const { videoId, progress } = action.payload;
      state.videoProgress[videoId] = progress;
    },
    saveVideoNote: (state, action) => {
      const { videoId, note } = action.payload;
      state.notes[videoId] = note;
    },
    setPlaybackState: (state, action) => {
      const { isPlaying, volume, playbackRate } = action.payload;
      if (isPlaying !== undefined) state.isPlaying = isPlaying;
      if (volume !== undefined) state.volume = volume;
      if (playbackRate !== undefined) state.playbackRate = playbackRate;
    },
    resetPlayerState: (state) => {
      return initialState;
    }
  }
});

export const {
  setCurrentVideo,
  setCurrentSection,
  markVideoComplete,
  setVideoProgress,
  saveVideoNote,
  setPlaybackState,
  resetPlayerState
} = playerSlice.actions;

export default playerSlice.reducer;
