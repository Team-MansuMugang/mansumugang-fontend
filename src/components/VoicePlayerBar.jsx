import React, { useState, useRef, useEffect } from 'react';
import './VoicePlayerBar.css';
import '../index.css';
import StopIcon from '../assets/svg/stop-circle.svg?react';
import PlayIcon from '../assets/svg/play-circle.svg?react';
import PauseIcon from '../assets/svg/pause-circle.svg?react';

const VoicePlayerBar = ({ profileImage, name, date, time, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    };
    const audioElement = audioRef.current;
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="voice-player-bar">
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-date-time">{`${date} . ${time}`}</div>
        </div>
      </div>

      <div className="audio-controls">
        {!isPlaying && (
          <>
            <span className="play-label">재생하기</span>
            <button className="play-pause-btn" onClick={togglePlayPause} aria-label="Play">
              <PlayIcon />
            </button>
          </>
        )}
        {isPlaying && (
          <>
            <div className="audio-time">
              <span className="duration">{formatTime(duration)}</span>
              {isPlaying && ' '}
              <span className="current-time">{formatTime(currentTime)}</span>
            </div>
            <button
              className="play-pause-btn"
              onClick={togglePlayPause}
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
            <button className="stop-btn" onClick={stopAudio} aria-label="Stop">
              <StopIcon />
            </button>
          </>
        )}
      </div>
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate}></audio>
    </div>
  );
};

export default VoicePlayerBar;
