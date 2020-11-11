import React, { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';

const App = (): JSX.Element => {
	const [song, setSong] = useState(data());
	const [currentSong, setCurrentSong] = useState(song[2]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className='children'>
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
		</div>
	);
};

export default App;
