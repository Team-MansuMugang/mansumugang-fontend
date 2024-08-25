import React, { useState, useRef, useEffect } from 'react';
import './VoicePlayerBar.css';
import '../index.css';
import StopIcon from '../assets/svg/stop-circle.svg?react';
import PlayIcon from '../assets/svg/play-circle.svg?react';
import PauseIcon from '../assets/svg/pause-circle.svg?react';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';
import { parseLocalDateTime } from '../utility/dates';

const VoicePlayerBar = ({ profileImage, name, uploadedTime, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const { formattedDate, formattedTime } = parseLocalDateTime(uploadedTime);

  useEffect(() => {
    const onLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const onAudioEnd = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
    audioElement.addEventListener('ended', onAudioEnd);

    return () => {
      audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioElement.removeEventListener('ended', onAudioEnd);
    };
  }, [audioSrc]);

  const handlePlayPauseToggle = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleStopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const onTimeUpdate = () => {
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
        {profileImage !== null ? (
          <img className="profile-image" src={profileImage} />
        ) : (
          <div className="profile-image-wrapper">
            <AccountCircleIcon />
          </div>
        )}
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-date-time">{`${formattedDate} · ${formattedTime}`}</div>
        </div>
      </div>

      <div className="audio-controls">
        {!isPlaying && (
          <>
            <span className="play-label">재생하기</span>
            <button className="play-pause-btn" onClick={handlePlayPauseToggle} aria-label="Play">
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
              onClick={handlePlayPauseToggle}
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
            <button className="stop-btn" onClick={handleStopAudio} aria-label="Stop">
              <StopIcon />
            </button>
          </>
        )}
      </div>
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={onTimeUpdate}></audio>
    </div>
  );
};

export default VoicePlayerBar;
