import React from 'react';
import LibarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibarySong id={song.id} songs={songs} setCurrentSong={setCurrentSong} key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
};

export default Library;