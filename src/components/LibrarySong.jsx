import React from 'react';

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


        if(isPlaying) {
            const playPromise = audioRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then(audio => {
                    audioRef.current.play();
                })
            }
        }
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