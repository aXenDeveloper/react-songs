import React from 'react';
import Player from './components/Player';
import Song from './components/Song';

const App = () => {
	return (
		<div className='children'>
			<Song />
			<Player />
		</div>
	);
};

export default App;
