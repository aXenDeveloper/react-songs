import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPause,
	faAngleLeft,
	faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	setCurrentSong,
	setSongs
}): JSX.Element => {
	const activeLibraryHandel = nextPrev => {
		const newSong = songs.map(song => {
			if (song.id === nextPrev.id) {
				return {
					...song,
					active: true
				};
			} else {
				return {
					...song,
					active: false
				};
			}
		});
		setSongs(newSong);
	};

	const playSongHandler = (e: MouseEvent): any => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const getTime = time =>
		`${Math.floor(time / 60)} : ${('0' + Math.floor(time % 60)).slice(-2)}`;

	const dragHendler = (e): void => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipDragHandler = async (direction: string): void => {
		let currentIndex = songs.findIndex(song => song.id === currentSong.id);

		if (direction === 'skip-forward') {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandel(songs[(currentIndex + 1) % songs.length]);
		}

		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandel(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeLibraryHandel(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>

				<input
					min={0}
					max={songInfo.duration ? songInfo.duration : 0}
					value={songInfo.currentTime}
					onChange={dragHendler}
					type='range'
				/>

				<p>{getTime(songInfo.duration ? songInfo.duration : 0)}</p>
			</div>

			<div className='play-control'>
				<FontAwesomeIcon
					className='skip-back'
					onClick={() => skipDragHandler('skip-back')}
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					className='play'
					onClick={playSongHandler}
					icon={isPlaying ? faPause : faPlay}
					size='2x'
				/>
				<FontAwesomeIcon
					className='skip-forward'
					onClick={() => skipDragHandler('skip-forward')}
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
