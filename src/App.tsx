import React, { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Libary from './components/Library';
import data from './data';
import Nav from './components/Nav';

const App = (): JSX.Element => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	type typeSongs = {
		name: string;
		cover: string;
		artist: string;
		audio: string;
		color: string[];
		id: any;
		active: boolean;
	}[];

	const [songs, setSongs] = useState<typeSongs>(data());

	type typeCurrentSong = {
		name: string;
		cover: string;
		artist: string;
		audio: string;
		color: string[];
		id: any;
		active: boolean;
	};

	const [currentSong, setCurrentSong] = useState<typeCurrentSong>(songs[0]);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	type typeSongInfo = {
		currentTime: number;
		duration: number;
	};

	const [songInfo, setSongInfo] = useState<typeSongInfo>({
		currentTime: 0,
		duration: 0
	});

	const [libraryStatus, setLibraryStatus] = useState<boolean>(false);

	const timeUpdateHendler = (e: React.ChangeEvent<any>): void => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	const songEndHendler = async () => {
		let currentIndex = songs.findIndex(song => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play(); // error typescript "Object is possibly 'null'.ts(2531)"
	};

	return (
		<div className='children'>
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>
			<Song currentSong={currentSong} />
			<Player
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setSongs={setSongs}
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
				src={currentSong.audio}
				onEnded={songEndHendler}></audio>
		</div>
	);
};

export default App;
