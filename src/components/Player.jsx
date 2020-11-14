import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
    currentSong: any,
    isPlaying: Boolean,
    setIsPlaying: Function
}

const Player = ({ currentSong, isPlaying, setIsPlaying }: Props): JSX.Element => {

    const audioRef = useRef(null);

    const playSongHandler = (e: MouseEvent): any => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        };
    };

    const timeUpdateHendler = e => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    };

    const getTime = time => `${Math.floor(time / 60)} : ${("0" + Math.floor(time % 60)).slice(-2)}`;

    const dragHendler = e => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHendler} type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
            </div>

            <audio onLoadedMetadata={timeUpdateHendler} onTimeUpdate={timeUpdateHendler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;