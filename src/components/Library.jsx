import React from 'react';
import LibarySong from './LibrarySong';

const Library = ({ songs }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibarySong key={song.name} song={song} />
                ))}
            </div>
        </div>
    );
};

export default Library;