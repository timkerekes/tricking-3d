import React from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import useGetCombos from "../../api/useGetCombos";
import useGetTricks, { useGetTrickPoints } from "../../api/useGetTricks";
import DataListCommandBar from "../DataListCommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";

const DataList = () => {
	const { data: tricks } = useGetTricks();
	const { data: combos } = useGetCombos();
	const { data: trickPoints } = useGetTrickPoints();
	let trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
	return (
		<div className='no-scrollbar flex max-h-[50vh] w-full flex-col place-items-center gap-2 overflow-y-scroll rounded-xl pb-14'>
			<h1 className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				TRICKS, STANCES, &#38; TRANSITIONS
			</h1>
			<div className='w-[70vw]'>
				{tricks
					?.sort((a, b) => {
						if (a.type < b.type) return 1;
						if (a.type > b.type) return -1;
						if (a.name < b.name) return -1;
						if (a.name > b.name) return 1;
						return 0;
					})
					?.map((trick) => (
						<div
							key={Math.random()}
							onClick={() => console.log(trick)}
							className=' grid  w-full grid-cols-6 justify-between p-2 odd:bg-zinc-700'>
							<div className='col-span-3'>{trick?.name}</div>
							<div className='col-span-1 flex place-items-center text-sm'>
								{trick?.type}
							</div>
							<div className='col-span-1'>
								{trickPoints?.map((tp) => {
									return tp?.name === trick?.name && tp?.Total?.toFixed(2);
								})}
								{trick.type === "Stance" && trick.pointValue?.toFixed(2)}
								{trick.type === "Transition" && trick.pointValue?.toFixed(2)}
							</div>
							<div className='col-span-1 flex place-content-end place-items-center gap-2'>
								DA
								{trick?.defaultAnimation ? (
									<FaCheck className='text-emerald-500' />
								) : (
									<FaCircle className='text-red-700' />
								)}
							</div>
						</div>
					))}
			</div>
			<h1 className='sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold'>
				Combos
			</h1>
			<div>
				{combos?.map((combo) => (
					<div
						key={Math.random()}
						className='grid w-[70vw] grid-cols-5 justify-between p-2 odd:bg-zinc-700'>
						<div className='col-span-2'>{combo?.name}</div>
						<div className='flex place-content-end place-items-center gap-2'>
							DA
							{combo?.defaultAnimation && (
								<FaCheck className='text-emerald-500' />
							)}
						</div>
						<div className='text-center'>{combo?.pointValue}</div>
						<div className='flex place-content-end place-items-center gap-2'>
							CA
							{combo?.comboArray ? (
								<FaCheck className='text-emerald-500' />
							) : (
								<FaCircle className='text-red-700' />
							)}
						</div>
					</div>
				))}
			</div>
			<DataListCommandBar />
			{trickMakerOpen ? <MakeNewTrickModal /> : null}
		</div>
	);
};

export default DataList;
