import React, { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Libary from './components/Library';
import data from './data';
import Nav from './components/Nav';

const App = (): React.ReactElement => {
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[2]);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0
	});
	const [libraryStatus, setLibraryStatus] = useState<boolean>(false);

	const timeUpdateHendler = (e: React.ChangeEvent<any>): void => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	return (
		<div className='children'>
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>
			<Song currentSong={currentSong} />
			<Player
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
			<Libary
				libraryStatus={libraryStatus}
				isPlaying={isPlaying}
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<audio
				onLoadedMetadata={timeUpdateHendler}
				onTimeUpdate={timeUpdateHendler}
				ref={audioRef}
				src={currentSong.audio}></audio>
		</div>
	);
};

export default App;
