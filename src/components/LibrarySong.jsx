import React from 'react';

const LibrarySong = ({ song, songs, setCurrentSong, id }) => {
    const songSelectHandle = () => {
        const selectSong = songs.filter(state => state.id === id);
        setCurrentSong(selectSong[0]);
    }


    return (
        <div onClick={songSelectHandle} className="library-song">
            <img src={song.cover} alt={song.name} />
            <div className="library-song_description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
};

export default LibrarySong;