import React from "react";
import ActiveDevNote from "../info/ActiveDevNote";
import AnimationsDropwdown from "./AnimationsDropwdown";
import Controller from "../media/Controller";
import DurationSlider from "./DurationSlider";
import ModelDropdown from "./ModelDropdown";
import TimeSlider from "./TimeSlider";
import { Link } from "react-router-dom";
import InfoButton from "./InfoButton";
function UI() {
	return (
		<>
			<Link to='/3d/home'>
				<h1 className='font-inter absolute z-[1000] h-[47px] w-full rounded-b-xl border-none  bg-opacity-60 p-2 text-3xl font-bold text-zinc-300 '>
					Tricking-3d
				</h1>
			</Link>
			<div
				id='dropdowns-div'
				className='max-h-750px absolute z-[1001] ml-3 mt-[45px] flex gap-3'>
				<AnimationsDropwdown />
				<InfoButton />
				<ModelDropdown />
			</div>
			<ActiveDevNote />
			<div
				id='controller'
				className='fixed left-0 bottom-0 z-[1002] w-full bg-opacity-50 p-4  md:left-[10vw] md:w-[80vw] xl:left-[30vw] xl:w-[40vw]'>
				<DurationSlider />
				<Controller />
			</div>
		</>
	);
}

export default UI;
