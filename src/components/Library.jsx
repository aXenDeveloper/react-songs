import React from 'react';
import LibarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus && "active-library"}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibarySong setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} id={song.id} songs={songs} setCurrentSong={setCurrentSong} key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
};

export default Library;