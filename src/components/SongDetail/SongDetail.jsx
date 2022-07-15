import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as api from '../../api/index';
import Loading from '../loading/Loading';
// import ReactAudioPlayer from 'react-audio-player';
import AudioControls from '../AudioControls/AudioControls';

import './songdetail.css';
import NotFound from './../NotFound/NotFound';
import { ReactComponent as ReturnIcon } from '../../assets/return.svg';

const SongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef();
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const checkIndexForCurrentSong = (id) => {
    let currentIndex = -1;
    songs.map((item, index) => {
      // console.log('item is', item);
      if (item.id == id) {
        currentIndex = index;
      }
    });
    return currentIndex;
  };

  useEffect(() => {
    // Check the songs in list songs to get index
    async function setSong() {
      const resp = await api.getSong();
      setSongs(resp?.object);
    }
    setSong();
  }, []);

  useEffect(() => {
    if (songs.length != 0) {
      const currentIndex = checkIndexForCurrentSong(id);
      setCurrentIndex(currentIndex);
    }
  }, [songs]);

  // useEffect(() => {
  //   console.log('the songs get is', songs);
  // }, [songs]);

  const toPrevTrack = () => {
    if (currentIndex == 0) {
      alert('This is the first song in the list');
    } else {
      navigate(`../song/${songs[currentIndex - 1].id}`);

      window.location.reload();
    }
  };

  const countTimer = () => {};

  const toNextTrack = () => {
    if (currentIndex == songs.length - 1) {
      alert('This is the end song.');
    } else {
      navigate(`../song/${songs[currentIndex + 1].id}`);
      window.location.reload();
    }
  };
  // define background
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #7CFC00), color-stop(${currentPercentage}, #777))
  `;

  const getSongDetail = async () => {
    const data = await api.getSongById(id);

    return data.object;
  };

  const { isLoading, isError, data, error } = useQuery(
    'songDetail',
    getSongDetail,
  );

  // Change the slider
  const onChangeRange = (value) => {
    // Clear any timers already running
    // clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (isPlaying && audioRef) {
      audioRef.current.play();
    } else {
      if (audioRef) {
        audioRef?.current?.pause();
      }
    }
  }, [isPlaying]);

  const transferTime = (totalSeconds) => {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds - minutes * 60);
    if (seconds < 10) return minutes + ':0' + seconds;
    return minutes + ':' + seconds;
  };

  const setMuted = () => {
    // if (audioRef.current?.volume == 0) {
    //   audioRef.current?.volume = 1;
    // } else {
    //   audioRef.current?.volume = 0;
    // }
  };

  return (
    <div className="flex bg-green-100 grow">
      {isLoading || songs.length == 0 ? (
        <Loading />
      ) : (
        <div className="grow">
          {data ? (
            <div className="px-4 relative">
              <ReturnIcon
                onClick={() => {
                  navigate('/');
                }}
              />
              <div className="song-detail-container h-full">
                <div className="info-container">
                  <div className="shadow-2xl rounded-full max-w-xs">
                    <img
                      src={data.thumbnail}
                      className="object-conver rounded-full "
                    />
                  </div>
                  <div className="music-description">
                    <div className="flex">
                      <p className="text-center font-bold text-xl mt-2e pr-2">
                        {data.name}
                      </p>
                      <span className="material-icons pointer">
                        {isPlaying ? 'volume_up' : 'volume_mute'}
                      </span>
                    </div>
                    <p className="text-center font-normal">
                      {data.author.name}
                    </p>
                  </div>
                </div>
                <audio
                  autoPlay
                  ref={audioRef}
                  src={data.src}
                  onLoadedData={(e) => {
                    const audio = audioRef.current;
                    var resp = audio.play();
                    if (resp !== undefined) {
                      resp
                        .then((_) => {
                          setIsPlaying(true);
                          // autoplay starts!
                        })
                        .catch((error) => {
                          //show error
                        });
                    }
                    console.log('currentTarget event'.e);
                    setDuration(e.currentTarget.duration);
                  }}
                  onTimeUpdate={(e) => {
                    setTrackProgress(e.currentTarget.currentTime);
                    console.log('current volume', audioRef.current.volume);
                  }}
                />
                <AudioControls
                  isPlaying={isPlaying}
                  onPrevClick={toPrevTrack}
                  onNextClick={toNextTrack}
                  onPlayPauseClick={setIsPlaying}
                />

                <div className="slider-container" style={{ width: '100wh' }}>
                  <input
                    className="slider-input"
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    // className="progress"
                    onChange={(e) => onChangeRange(e.target.value)}
                    // onMouseUp={onChangeRangeEnd}
                    // onKeyUp={onChangeRangeEnd}
                    style={{
                      background: trackStyling,
                      width: '100%',
                    }}
                  />
                </div>
                <div className="inline-flex items-center justify-between w-full">
                  <p className="font-medium">{transferTime(trackProgress)}</p>
                  <p className="font-medium">{transferTime(duration)} </p>
                </div>
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      )}
    </div>
  );
};

export default SongDetail;
