import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";
import UserCard from "./UserCard";

const Captures = () => {
	const [captured, setCaptured] = useState();
	const [capturedYou, setCapturedYou] = useState();
	const activeUser = useUserStore();
	const queryClient = useQueryClient();

	useEffect(() => {
		setCaptured(activeUser.userInfo.Captured);
		setCapturedYou(activeUser.userInfo.CapturedMe);
	}, [activeUser]);

	return (
		<div className='flex flex-col place-items-center font-inter'>
			<div onClick={() => queryClient.invalidateQueries(["userInfo"])}>
				Your Captures
			</div>
			<div>
				{!!captured &&
					Object.keys(captured).map((key) => (
						<div
							key={`${captured[key].username}`}
							className='flex flex-col gap-3'>
							<CapturedCard
								name={captured[key].first_name + " " + captured[key].last_name}
								src={
									captured[key].profilePic
										? `./images/${captured[key].uuid}/${captured[key].profilePic}`
										: `./images/noimg.jpeg`
								}
								username={`${captured[key].username}`}
							/>
						</div>
					))}
			</div>
			<div
			// onClick={() => getData()}
			>
				Captured You
			</div>
			<div>
				{!!capturedYou &&
					Object.keys(capturedYou).map((key) => (
						<div
							key={`${capturedYou[key].username}`}
							className='flex flex-col gap-3'>
							<CapturedCard
								name={
									capturedYou[key].first_name + " " + capturedYou[key].last_name
								}
								src={
									capturedYou[key].profilePic
										? `./images/${capturedYou[key].uuid}/${capturedYou[key].profilePic}`
										: `./images/noimg.jpeg`
								}
								username={`${capturedYou[key].username}`}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Captures;
