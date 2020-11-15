import React from 'react';
import { playAudio } from '../util';

const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) => {
    const songSelectHandle = () => {
        const selectSong = songs.filter(state => state.id === id);
        setCurrentSong(selectSong[0]);

        const newSong = songs.map(song => {
            if(song.id === id) {
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

        playAudio(isPlaying, audioRef);
        
    }


    return (
        <div onClick={songSelectHandle} className={`library-song ${song.active && 'selected'}`}>
            <img src={song.cover} alt={song.name} />
            <div className="library-song_description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
};

export default LibrarySong;