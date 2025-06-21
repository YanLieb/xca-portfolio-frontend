import {useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import playBtn from '@/public/svg/play-button.svg';

import './videoComponent.css';

export default function VideoComponent({media, classes, controls = false, autoplay = true}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(controls);
	const videoRef = useRef(null);
	
	
	const handlePlay = (e) => {
		e.preventDefault();
		const playBtn = videoRef.current.querySelector('.play-btn');
		const videoElement = videoRef.current.querySelector('video');
		if (videoElement) {
			if (isPlaying) {
				videoElement.pause();
				playBtn.style.display = 'block';
				setShowControls(false);
			} else {
				videoElement.play();
				playBtn.style.display = 'none';
				setShowControls(true);
			}
			
			setIsPlaying(!isPlaying);
		}
	}
	
	useEffect(() => {
		const addBorder = () => {
			const videoElement = videoRef.current.querySelector('video');
			if (videoElement) {
				const videoContainer = videoRef.current;
				if (videoContainer.offsetHeight > videoElement.offsetHeight) {
					videoContainer.style.border = '1px solid black';
				} else {
					videoContainer.style.border = 'none';
				}
			}
		}
		if (videoRef.current) {
			addBorder();
			window.addEventListener('resize', addBorder);
		}
		
		return () => {
			window.removeEventListener('resize', addBorder);
		};
	}, [videoRef.current]);
	
	return (
		 <div className={`video-component ${classes || ''}`} onClick={!autoplay ? handlePlay : undefined} ref={videoRef}>
			 {!autoplay && <span className={'play-btn'}><Image src={playBtn} alt="Play button"/></span>}
			 <video width="1500" height="1500" preload="auto" autoPlay={autoplay} muted
			        controls={showControls}
			        controlsList="nodownload noremoteplayback">
				 <source src={media.url} type={media.mime}/>
				 Your browser does not support the video tag.
			 </video>
		 </div>);
}