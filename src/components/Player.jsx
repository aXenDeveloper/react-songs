import React, { useEffect } from 'react';
import { playAudio } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setCurrentSong, setSongs }): JSX.Element => {

    useEffect(() => {
        const newSong = songs.map(song => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSong);
    }, [currentSong]);

    const playSongHandler = (e: MouseEvent): any => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        };
    };

    const getTime = time => `${Math.floor(time / 60)} : ${("0" + Math.floor(time % 60)).slice(-2)}`;

    const dragHendler = e => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipDragHandler = direction => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);
        
        if(direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }

        if(direction === 'skip-back') {
            if((currentIndex - 1 ) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration ? songInfo.duration : 0} value={songInfo.currentTime} onChange={dragHendler} type="range" />
                <p>{getTime(songInfo.duration ? songInfo.duration : 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" onClick={() => skipDragHandler('skip-back')} icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" onClick={() => skipDragHandler('skip-forward')} icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Player;