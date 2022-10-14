import React, { useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import { useStore } from "../../../store/store";
import SyncPlayerControls from "../videoOverlay/SyncPlayerControls";
import { useVideoStore } from "../videoOverlay/useVideoStore";
import VideoControls from "../videoOverlay/VideoControls";
import VideoInput from "../videoOverlay/VideoInput";
const VideoOverlay = () => {
	const [videoInput, setVideoInput] = useState();
	const setBackground = useStore((s) => s.setBackground);
	const setFollowCam = useStore((s) => s.setFollowCam);
	const handleUpdate = () => {
		setVideoInput(!videoInput);
		setBackground("The Void");
		setFollowCam(false);
	};
	const videoSource = useVideoStore((s) => s.videoSource);

	return (
		<>
			<div className='absolute bottom-[35vh] right-5 z-[1000] flex flex-col gap-2 '>
				<IoIosVideocam
					onClick={() => handleUpdate()}
					className='text-xl text-zinc-300'
				/>
				{videoSource && <SyncPlayerControls />}
			</div>
			{videoInput && <VideoInput />}
			{videoSource && (
				<div className='absolute top-[10vh] z-[4] flex w-full place-content-center place-items-center gap-2 text-zinc-300'>
					<VideoControls />
				</div>
			)}
		</>
	);
};

export default VideoOverlay;
