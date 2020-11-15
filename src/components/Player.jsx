import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo }): JSX.Element => {
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

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration ? songInfo.duration : 0} value={songInfo.currentTime} onChange={dragHendler} type="range" />
                <p>{getTime(songInfo.duration ? songInfo.duration : 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Player;