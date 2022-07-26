import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../store/store";

const Animations = () => {
	const animationsArray = useStore((s) => s.animationsArray);
	const selectAnim = useStore((s) => s.selectAnim);
	const currentAnim = useStore((s) => s.currentAnim);
	const currentModel = useStore((s) => s.activeModel);
	const currVersions = useStore((s) => s.currVersions);
	const setVersions = useStore((s) => s.setVersions);
	const navigate = useNavigate();
	const regEx = /(\s?\-?\d+)$/;
	const renameAnimArr = animationsArray.map((anim) => anim.replace(regEx, ""));
	const animSet = new Set(renameAnimArr);
	useEffect(() => {
		setVersions(animationsArray.filter((curr) => curr.includes(currentAnim)));
	}, []);
	return (
		<div
			className='no-scrollbar fixed top-[10vh] left-[10vw] 
        h-[85vh] w-[80vw] flex-col items-center justify-center overflow-y-auto 
        rounded-2xl py-6 sm:pr-6 md:pr-4 lg:pr-[5rem]'>
			{Array.from(animSet)?.map((e, i) => {
				return (
					<button
						id='dropdown-item'
						className='mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400'
						onClick={() => {
							selectAnim(e);
							navigate(`/sandbox/${currentModel}/${e}`);
						}}
						key={i}>
						{e}
					</button>
				);
			})}
		</div>
	);
};

export default Animations;
