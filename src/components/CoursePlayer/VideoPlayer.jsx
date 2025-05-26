import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  background: var(--background-dark);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  margin: 1rem 0;
  max-width: 100%;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
  background: #000;
`;

const ControlsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 16px 16px;
  transform: translateY(${props => props.hidden ? '100%' : '0'});
  transition: transform 0.3s ease;
`;

const ProgressContainer = styled.div`
  position: relative;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-bottom: 12px;
  cursor: pointer;
  
  &:hover {
    height: 8px;
    margin-bottom: 10px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border-radius: 3px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  ${ProgressContainer}:hover &::after {
    opacity: 1;
  }
`;

const BufferBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  width: ${props => props.buffer}%;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-light);
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeButton = styled(PlayButton)``;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`;

const TimeDisplay = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  font-family: monospace;
  margin-left: auto;
`;

const FullscreenButton = styled(PlayButton)``;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const CenterPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

function VideoPlayer({
  src = "video.mp4",
  poster,
  autoPlay = false,
  muted = false,
  loop = false
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showCenterPlay, setShowCenterPlay] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const updateBuffer = () => {
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(0) / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('progress', updateBuffer);
    video.addEventListener('canplay', () => setIsLoading(false));
    video.addEventListener('waiting', () => setIsLoading(true));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('progress', updateBuffer);
      video.removeEventListener('canplay', () => setIsLoading(false));
      video.removeEventListener('waiting', () => setIsLoading(true));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowCenterPlay(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <VideoContainer
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(isPlaying ? false : true)}
    >
      <VideoElement
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onClick={togglePlay}
      />

      {isLoading && <LoadingSpinner />}

      {showCenterPlay && !isPlaying && (
        <CenterPlayButton onClick={togglePlay}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </CenterPlayButton>
      )}

      <ControlsOverlay hidden={!controlsVisible}>
        <ProgressContainer onClick={handleProgressClick}>
          <BufferBar buffer={buffered} />
          <ProgressBar progress={progress} />
        </ProgressContainer>

        <ControlsRow>
          <PlayButton onClick={togglePlay}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </PlayButton>

          <VolumeContainer>
            <VolumeButton onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume > 0.5 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                </svg>
              )}
            </VolumeButton>
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </VolumeContainer>

          <TimeDisplay>
            {formatTime(currentTime)} / {formatTime(duration)}
          </TimeDisplay>

          <FullscreenButton onClick={toggleFullscreen}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </FullscreenButton>
        </ControlsRow>
      </ControlsOverlay>
    </VideoContainer>
  );
}

export default VideoPlayer;