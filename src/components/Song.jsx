import React from 'react';

type Props = {
    currentSong: any
}

const Song = ({ currentSong }: Props): JSX.Element => (
    <div className="song-container">
        <img src={currentSong.cover} alt={currentSong.name} />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>
);

export default Song;