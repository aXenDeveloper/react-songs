import React, { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';

const App = () => {
	const [song, setSong] = useState(data());

	return (
		<div className='children'>
			<Song />
			<Player />
		</div>
	);
};

export default App;
