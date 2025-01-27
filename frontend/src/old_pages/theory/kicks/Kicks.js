import React from "react";
import { kicks } from "../../../data/trickDataModel/TrickObjects";
import { KicksChart } from "./components/KicksChart";
function Kicks() {
	console.log(Object.keys(kicks));
	return (
		<div className='text-zinc-300'>
			<div className='py-2 text-2xl text-zinc-300'>Kicks</div>
			<KicksChart className='h-fit w-[90vw]' />
			<div className='py-2 text-2xl text-zinc-300'>Variatons</div>
			{/* {Object.keys(kicks).map((e, i) => (
				<div id={i} className=' flex'>
					<div className='pr-4 text-lg'>{`${e}:`}</div>
					<div className='text-zinc-400'>{kicks[e]}</div>
				</div>
			))} */}
		</div>
	);
}

export default Kicks;
