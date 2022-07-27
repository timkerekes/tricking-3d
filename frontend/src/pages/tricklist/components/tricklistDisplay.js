import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = () => {
	const accessToken = useUserStore((s) => s.accessToken);
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();
	const [lists, setLists] = useState([]);
	console.log(userInfo, "activeUser");
	const getTricklists = () => {
		apiPrivate
			.post("/tricklist/user", {
				accessToken: accessToken,
				uuid: userInfo.uuid,
			})
			.then((res) => {
				console.log(res.data);
				setLists(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getTricklists();
	}, []);
	return (
		<div>
			<table>
				<thead className=' text-center text-lg font-semibold text-zinc-300'>
					<th className='px-2'>tricklist_id</th>
					<th className='px-2'>name</th>
					<th className='px-2'>owner</th>
					<th className='px-2'>lastUpdated</th>
				</thead>
				<tbody className='text-center'>
					{lists.length &&
						lists.map((item) => (
							<tr>
								<td>
									{item.tricklist_id.substring(item.tricklist_id.length - 4)}
								</td>
								<td>{item.name}</td>
								<td>{item.Owner.username}</td>
								<td>
									{Number(
										(Date.now() - new Date(item.updatedAt)) / 1000 / 60
									).toFixed(0)}{" "}
									min
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default TricklistDisplay;
