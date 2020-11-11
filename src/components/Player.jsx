import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>Start time</p>
                <input type="range" />
                <p>End time</p>
            </div>

            <div className="play-control">
            <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} icon={faPlay} size="2x"/>
                <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
};

export default Player;