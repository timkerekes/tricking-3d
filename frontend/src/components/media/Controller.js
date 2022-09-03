import React, { useEffect } from "react";
import { useStore } from "../../store/store.js";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { BiRevision } from "react-icons/bi";
import { ImLoop } from "react-icons/im";
import {
	MdSpeed,
	MdLoop,
	MdCenterFocusWeak,
	MdCenterFocusStrong,
} from "react-icons/md";
import { MediaButton } from "./MediaButton.js";
import DragableWrapper from "../../pages/sandbox/ui/DraggableSlowMo.js";

function Controller() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setIsPlaying = useStore((state) => state.setIsPaused);
	const setTrimToggle = useStore((state) => state.setTrimToggle);
	const trimToggle = useStore((state) => state.trimToggle);
	const setBounce = useStore((state) => state.setBounce);
	const isPaused = useStore((state) => state.isPaused);
	const bounce = useStore((state) => state.bounce);
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);
	const speedControl = useStore((state) => state.speedControl);
	const setFollowCam = useStore((state) => state.setFollowCam);
	const isFollowCam = useStore((state) => state.isFollowCam);
	const setCurrentTime = useStore((state) => state.setCurrentTime);
	const currentTime = useStore((state) => state.currentTime);
	// Envoke Player Controller

	return (
		<div className='sticky bottom-0'>
			<div
				id='controller-container'
				className='
        flex
        justify-around text-sm
		'>
				<MediaButton
					id='bounce-button'
					f={setFollowCam}
          hide={speedControl}
					content={
						isFollowCam ? (
							<MdCenterFocusStrong className='text-xl text-[hotpink]' />
						) : (
							<MdCenterFocusWeak className='text-xl text-[gainsboro]' />
						)
					}
				/>
				<MediaButton
					id='reverse-button'
					f={() => setTimescale(-timescale)}
          hide={speedControl}
					content={
						timescale < 0 ? (
							<MdLoop className='text-2xl text-zinc-300' />
						) : (
							<MdLoop className='text-2xl text-zinc-300' />
						)
					}
				/>

				<MediaButton
					id='FrameBack-button'
					f={() => {
              if (isPaused)
                setCurrentTime(currentTime - 0.05 * timescale * Math.sign(timescale));
              else {
                setIsPlaying(true);
              }
            }
          }
          hide={speedControl}
					content={
						<FaStepBackward className={`${isPaused ? "opacity-100" : "opacity-40"} fill-slate-200 text-xl hover:fill-white'`} />
					}
				/>

				<MediaButton
					id='play-pause-button'
					class='rounded'
					f={setIsPaused}
          hide={speedControl}
					content={
						!isPaused ? (
							<FaPause className='fill-gray-800 p-0' />
						) : (
							<FaPlay className='flex items-center  justify-around fill-gray-800' />
						)
					}
					isPlayPause
				/>

				<MediaButton
					id='FrameForward-button'
					f={() => {
              if (isPaused)
                setCurrentTime(currentTime + 0.05 * timescale * Math.sign(timescale));
              else {
                setIsPlaying(true);
              }
            }
          }
          hide={speedControl}
					mD={() => {
						console.log("MOUSDOWN");
					}}
					content={
						<FaStepForward className={`${isPaused ? "opacity-100" : "opacity-40"} fill-slate-200 text-xl hover:fill-white'`} />
					}
				/>

				<DragableWrapper drag_offset_limit={80}>
					<MediaButton
						id='reduce-speed-button'
						content={
							<div className='relative'>
								<MdSpeed className='fill-zinc-300 text-2xl' />
								<span className='absolute inset-x-0.5 top-6 text-[.9rem] '>
									{Math.abs(Number.parseFloat(timescale).toFixed(2))}
								</span>
							</div>
						}
					/>
				</DragableWrapper>

				<MediaButton
					id='toggle-playback-button'
					f={() => setTrimToggle(!trimToggle)}
          hide={speedControl}
					content={<AiOutlineColumnWidth className={`${trimToggle ? "fill-yellow-400" : "fill-zinc-300"} text-2xl`}/>}
				/>
			</div>
		</div>
	);
}

export default Controller;
