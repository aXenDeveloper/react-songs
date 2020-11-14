import React, { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Libary from './components/Library';
import data from './data';

const App = (): JSX.Element => {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[2]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className='children'>
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
			<Libary songs={songs} />
		</div>
	);
};

export default App;
