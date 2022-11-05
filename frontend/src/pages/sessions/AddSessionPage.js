import React, { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useSubmitSessionForReview } from "../../api/useSessionSummaries";
import { v4 as uuidv4 } from "uuid";
const whatsToday = () => {
	let today = new Date(Date.now());
	return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
		"0" + today.getDate()
	).slice(-2)}`;
};
const AddSessionPage = () => {
	let todaytime = new Date(Date.now()).toISOString().slice(-13, -8);
	const { mutate: submitSession, data } = useSubmitSessionForReview();
	const { uuid: user_id } = useUserStore((s) => s.userInfo);
	const [formData, setFormData] = useState({
		sessionDate: whatsToday(),
		url: {},
		user_id: user_id,
		sessionid: uuidv4(),
	});

	const onSubmit = (e) => {
		e.preventDefault();
		submitSession(formData);
		console.log("submitting", formData);
	};
	const [count, setCount] = useState(1);
	let isEnabled =
		(formData.startTime &&
			formData.endTime &&
			formData.sessionDate &&
			formData.sessionid &&
			formData.url[0] &&
			true) ||
		false;
	console.log(isEnabled);
	return (
		<div className='mt-14 flex flex-col items-center text-zinc-300'>
			<div className='p-2 text-center font-titan text-2xl'>Submit Session</div>
			<form
				onSubmit={onSubmit}
				className='flex w-[80vw] flex-col gap-2 rounded-md bg-zinc-700 p-3'>
				<input
					onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
					id='name'
					type='text'
					className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
					placeholder='Session Name'
				/>
				<input
					onChange={(e) =>
						setFormData((s) => ({ ...s, sessionDate: e.target.value }))
					}
					id='date'
					type='date'
					value={whatsToday()}
					className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
				/>
				<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
					<label className='w-1/6 pl-2' htmlFor='startTime'>
						Start
					</label>
					<input
						onChange={(e) =>
							setFormData((s) => ({ ...s, startTime: e.target.value }))
						}
						id='startTime'
						step={"00:15"}
						className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
						type='time'
						value={formData.startTime}
					/>
				</div>
				<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
					<label className='w-1/6 pl-2' htmlFor='endTime'>
						End
					</label>
					<input
						onChange={(e) =>
							setFormData((s) => ({ ...s, endTime: e.target.value }))
						}
						id='endTime'
						step={"00:15"}
						className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
						type='time'
						value={formData.endTime}
					/>
				</div>
				{Array.from(Array(count).keys()).map((i) => (
					<div className='flex w-full gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'>
						<input
							onChange={(e) =>
								setFormData((s) => ({
									...s,
									url: { ...s.url, [i]: e.target.value },
								}))
							}
							id={`url${i}`}
							className='w-full bg-transparent p-1 text-zinc-300'
							type='url'
							value={formData.url[i]}
							placeholder={`https://your-video.com/goes-here${i}`}
						/>
						{i > 0 && (
							<span
								className='text-2xl leading-none text-red-500'
								onClick={() => setCount((c) => c - 1)}>
								-
							</span>
						)}
					</div>
				))}
				<span
					onClick={() => setCount((c) => c + 1)}
					className='flex place-items-center gap-2 font-titan'>
					<span>Add Another URL Source</span>
					<span className='text-2xl leading-none text-emerald-500'>+</span>
				</span>

				<button
					type='submit'
					value='Submit'
					disabled={isEnabled === false ? true : false}
					className={`rounded-lg ${
						isEnabled ? "bg-emerald-500" : "bg-zinc-800 text-zinc-600"
					} p-2`}>
					Start Processing
				</button>
			</form>
		</div>
	);
};

export default AddSessionPage;