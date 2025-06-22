import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  background: var(--background-dark);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  margin: 1rem 0;
  max-width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: var(--box-shadow-hover);
    transform: translateY(-2px);
  }
  
  /* Random color changing background shadow */
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(45deg, var(--primary), var(--primary-dark));
    border-radius: 16px;
    z-index: -1;
    opacity: 0.6;
    animation: randomColorPulse 4s ease-in-out infinite;
    box-shadow: 
      0 0 30px rgba(255, 0, 150, 0.4),
      0 0 60px rgba(0, 255, 255, 0.3),
      0 0 90px rgba(255, 255, 0, 0.2);
  }
  
  /* Additional background layer for more color variety */
  &::after {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 18px;
    z-index: -2;
    opacity: 0.3;
    animation: randomColorShift 6s ease-in-out infinite reverse;
    box-shadow: 
      0 0 40px rgba(255, 100, 0, 0.5),
      0 0 80px rgba(100, 0, 255, 0.4),
      0 0 120px rgba(0, 255, 100, 0.3);
  }
  
  @keyframes randomColorPulse {
    0% {
      box-shadow: 
        0 0 30px rgba(255, 0, 150, 0.4),
        0 0 60px rgba(0, 255, 255, 0.3),
        0 0 90px rgba(255, 255, 0, 0.2);
      transform: scale(1);
    }
    16.66% {
      box-shadow: 
        0 0 35px rgba(0, 255, 150, 0.5),
        0 0 70px rgba(255, 0, 255, 0.4),
        0 0 100px rgba(0, 150, 255, 0.3);
      transform: scale(1.01);
    }
    33.33% {
      box-shadow: 
        0 0 40px rgba(255, 150, 0, 0.6),
        0 0 80px rgba(150, 255, 0, 0.5),
        0 0 110px rgba(255, 0, 100, 0.4);
      transform: scale(1.02);
    }
    50% {
      box-shadow: 
        0 0 45px rgba(0, 100, 255, 0.7),
        0 0 90px rgba(255, 100, 150, 0.6),
        0 0 120px rgba(100, 255, 200, 0.5);
      transform: scale(1.03);
    }
    66.66% {
      box-shadow: 
        0 0 40px rgba(200, 0, 255, 0.6),
        0 0 80px rgba(0, 200, 100, 0.5),
        0 0 110px rgba(255, 200, 0, 0.4);
      transform: scale(1.02);
    }
    83.33% {
      box-shadow: 
        0 0 35px rgba(100, 255, 0, 0.5),
        0 0 70px rgba(255, 0, 200, 0.4),
        0 0 100px rgba(0, 255, 150, 0.3);
      transform: scale(1.01);
    }
    100% {
      box-shadow: 
        0 0 30px rgba(255, 0, 150, 0.4),
        0 0 60px rgba(0, 255, 255, 0.3),
        0 0 90px rgba(255, 255, 0, 0.2);
      transform: scale(1);
    }
  }
  
  @keyframes randomColorShift {
    0% {
      box-shadow: 
        0 0 40px rgba(255, 100, 0, 0.5),
        0 0 80px rgba(100, 0, 255, 0.4),
        0 0 120px rgba(0, 255, 100, 0.3);
    }
    20% {
      box-shadow: 
        0 0 45px rgba(0, 255, 200, 0.6),
        0 0 85px rgba(200, 100, 0, 0.5),
        0 0 125px rgba(100, 0, 200, 0.4);
    }
    40% {
      box-shadow: 
        0 0 50px rgba(255, 0, 100, 0.7),
        0 0 90px rgba(0, 200, 255, 0.6),
        0 0 130px rgba(200, 255, 0, 0.5);
    }
    60% {
      box-shadow: 
        0 0 45px rgba(100, 255, 150, 0.6),
        0 0 85px rgba(255, 150, 100, 0.5),
        0 0 125px rgba(150, 0, 255, 0.4);
    }
    80% {
      box-shadow: 
        0 0 40px rgba(0, 150, 255, 0.5),
        0 0 80px rgba(255, 0, 150, 0.4),
        0 0 120px rgba(150, 255, 100, 0.3);
    }
    100% {
      box-shadow: 
        0 0 40px rgba(255, 100, 0, 0.5),
        0 0 80px rgba(100, 0, 255, 0.4),
        0 0 120px rgba(0, 255, 100, 0.3);
    }
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
  background: var(--background-dark);
  cursor: pointer;
`;

const ControlsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(10, 14, 11, 0.9));
  padding: 20px 12px 12px;
  transform: translateY(${props => props.hidden ? '100%' : '0'});
  transition: all 0.25s ease;
  opacity: ${props => props.hidden ? '0' : '1'};
`;

const ProgressContainer = styled.div`
  position: relative;
  height: 3px;
  background: var(--border-color);
  border-radius: 2px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: height 0.15s ease;
  
  &:hover {
    height: 5px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 230, 118, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 4px;
    z-index: -1;
    animation: progressRandomGlow 3s ease-in-out infinite;
  }
  
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
    transition: all 0.2s ease;
    animation: thumbRandomPulse 2s ease-in-out infinite;
  }
  
  ${ProgressContainer}:hover &::after {
    opacity: 1;
  }
  
  @keyframes progressRandomGlow {
    0% {
      box-shadow: 
        0 0 15px rgba(255, 0, 100, 0.6),
        0 0 30px rgba(0, 255, 200, 0.4);
    }
    25% {
      box-shadow: 
        0 0 20px rgba(100, 255, 0, 0.7),
        0 0 40px rgba(255, 100, 200, 0.5);
    }
    50% {
      box-shadow: 
        0 0 25px rgba(0, 100, 255, 0.8),
        0 0 50px rgba(200, 0, 255, 0.6);
    }
    75% {
      box-shadow: 
        0 0 20px rgba(255, 200, 0, 0.7),
        0 0 40px rgba(0, 255, 100, 0.5);
    }
    100% {
      box-shadow: 
        0 0 15px rgba(255, 0, 100, 0.6),
        0 0 30px rgba(0, 255, 200, 0.4);
    }
  }
  
  @keyframes thumbRandomPulse {
    0% {
      box-shadow: 
        0 0 15px rgba(255, 0, 150, 0.8),
        0 0 30px rgba(0, 255, 100, 0.6);
    }
    33% {
      box-shadow: 
        0 0 20px rgba(100, 255, 0, 0.9),
        0 0 40px rgba(255, 0, 200, 0.7);
    }
    66% {
      box-shadow: 
        0 0 25px rgba(0, 150, 255, 1.0),
        0 0 50px rgba(200, 100, 0, 0.8);
    }
    100% {
      box-shadow: 
        0 0 15px rgba(255, 0, 150, 0.8),
        0 0 30px rgba(0, 255, 100, 0.6);
    }
  }
`;

const BufferBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--text-secondary);
  border-radius: 2px;
  width: ${props => props.buffer}%;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--primary);
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: var(--primary);
    transform: scale(1.1);
    box-shadow: 
      0 0 20px rgba(0, 230, 118, 0.3),
      0 0 40px rgba(0, 230, 118, 0.1);
    
    &::before {
      opacity: 0.1;
      transform: scale(1);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 0 8px rgba(0, 230, 118, 0.5));
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;

const VolumeButton = styled(PlayButton)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 3px;
  background: var(--border-color);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px rgba(0, 230, 118, 0.3);
  }
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 0 10px rgba(0, 230, 118, 0.4);
    
    &:hover {
      transform: scale(1.3);
      box-shadow: 
        0 0 15px rgba(0, 230, 118, 0.6),
        0 0 30px rgba(0, 230, 118, 0.3);
    }
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 230, 118, 0.4);
  }
`;

const TimeDisplay = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
  font-family: 'Roboto Mono', monospace;
  margin-left: auto;
  margin-right: 8px;
  user-select: none;
`;

const FullscreenButton = styled(PlayButton)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SettingsButton = styled(PlayButton)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: 
    spin 1s linear infinite, 
    spinnerRandomGlow 2.5s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes spinnerRandomGlow {
    0% {
      box-shadow: 
        0 0 20px rgba(255, 0, 100, 0.6),
        0 0 40px rgba(0, 255, 200, 0.4);
      border-top-color: rgba(255, 100, 0, 1);
    }
    16.66% {
      box-shadow: 
        0 0 25px rgba(100, 255, 0, 0.7),
        0 0 50px rgba(255, 0, 150, 0.5);
      border-top-color: rgba(0, 255, 100, 1);
    }
    33.33% {
      box-shadow: 
        0 0 30px rgba(0, 150, 255, 0.8),
        0 0 60px rgba(200, 100, 255, 0.6);
      border-top-color: rgba(150, 0, 255, 1);
    }
    50% {
      box-shadow: 
        0 0 35px rgba(255, 200, 0, 0.9),
        0 0 70px rgba(100, 255, 150, 0.7);
      border-top-color: rgba(255, 0, 200, 1);
    }
    66.66% {
      box-shadow: 
        0 0 30px rgba(200, 0, 255, 0.8),
        0 0 60px rgba(0, 255, 100, 0.6);
      border-top-color: rgba(100, 200, 0, 1);
    }
    83.33% {
      box-shadow: 
        0 0 25px rgba(0, 255, 200, 0.7),
        0 0 50px rgba(255, 100, 0, 0.5);
      border-top-color: rgba(200, 100, 255, 1);
    }
    100% {
      box-shadow: 
        0 0 20px rgba(255, 0, 100, 0.6),
        0 0 40px rgba(0, 255, 200, 0.4);
      border-top-color: rgba(255, 100, 0, 1);
    }
  }
`;

const CenterPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(10, 14, 11, 0.9);
  border: 2px solid var(--primary);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  color: var(--primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
  animation: centerRandomPulse 3.5s ease-in-out infinite;
  
  &:hover {
    background: rgba(10, 14, 11, 0.95);
    transform: translate(-50%, -50%) scale(1.15);
    color: var(--heading-color);
    animation-play-state: paused;
    box-shadow: 
      0 0 40px rgba(255, 100, 200, 0.8),
      0 0 80px rgba(100, 255, 0, 0.6),
      inset 0 0 20px rgba(0, 200, 255, 0.4);
  }
  
  &:active {
    transform: translate(-50%, -50%) scale(1.05);
  }
  
  @keyframes centerRandomPulse {
    0% {
      box-shadow: 
        0 0 25px rgba(255, 0, 150, 0.6),
        0 0 50px rgba(0, 255, 100, 0.4);
      border-color: rgba(255, 100, 0, 0.8);
    }
    20% {
      box-shadow: 
        0 0 30px rgba(100, 255, 0, 0.7),
        0 0 60px rgba(255, 0, 200, 0.5);
      border-color: rgba(0, 255, 150, 0.9);
    }
    40% {
      box-shadow: 
        0 0 35px rgba(0, 150, 255, 0.8),
        0 0 70px rgba(200, 100, 255, 0.6);
      border-color: rgba(255, 200, 0, 1.0);
    }
    60% {
      box-shadow: 
        0 0 40px rgba(255, 100, 150, 0.9),
        0 0 80px rgba(150, 255, 0, 0.7);
      border-color: rgba(100, 0, 255, 0.8);
    }
    80% {
      box-shadow: 
        0 0 35px rgba(200, 0, 255, 0.8),
        0 0 70px rgba(0, 255, 200, 0.6);
      border-color: rgba(255, 150, 100, 0.9);
    }
    100% {
      box-shadow: 
        0 0 25px rgba(255, 0, 150, 0.6),
        0 0 50px rgba(0, 255, 100, 0.4);
      border-color: rgba(255, 100, 0, 0.8);
    }
  }
  
  svg {
    width: 32px;
    height: 32px;
    margin-left: 3px;
    filter: drop-shadow(0 0 15px rgba(255, 200, 100, 0.8));
    animation: iconColorShift 2.5s ease-in-out infinite;
  }
  
  @keyframes iconColorShift {
    0% { filter: drop-shadow(0 0 15px rgba(255, 0, 150, 0.8)); }
    25% { filter: drop-shadow(0 0 15px rgba(0, 255, 100, 0.8)); }
    50% { filter: drop-shadow(0 0 15px rgba(100, 0, 255, 0.8)); }
    75% { filter: drop-shadow(0 0 15px rgba(255, 200, 0, 0.8)); }
    100% { filter: drop-shadow(0 0 15px rgba(255, 0, 150, 0.8)); }
  }
`;

const QualityBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--card-background);
  color: var(--text-light);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
`;

const CenterVideoIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(10, 14, 11, 0.8);
  border-radius: 50%;
  border: 3px solid var(--primary);
  backdrop-filter: blur(8px);
  animation: centerIconPulse 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(10, 14, 11, 0.9);
    animation-play-state: paused;
  }
  
  @keyframes centerIconPulse {
    0%, 100% {
      box-shadow: 
        0 0 30px rgba(0, 230, 118, 0.6),
        0 0 60px rgba(0, 230, 118, 0.3),
        inset 0 0 30px rgba(0, 230, 118, 0.1);
      border-color: var(--primary);
    }
    50% {
      box-shadow: 
        0 0 50px rgba(0, 230, 118, 0.8),
        0 0 100px rgba(0, 230, 118, 0.5),
        inset 0 0 50px rgba(0, 230, 118, 0.2);
      border-color: var(--primary-dark);
    }
  }
  
  svg {
    width: 48px;
    height: 48px;
    color: var(--primary);
    filter: drop-shadow(0 0 20px rgba(0, 230, 118, 0.8));
    margin-left: 4px;
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

      <QualityBadge>HD</QualityBadge>

      {isLoading && <LoadingSpinner />}

      {!isPlaying && !isLoading && (
        <CenterVideoIcon onClick={togglePlay}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </CenterVideoIcon>
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

          <SettingsButton>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
            </svg>
          </SettingsButton>

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
