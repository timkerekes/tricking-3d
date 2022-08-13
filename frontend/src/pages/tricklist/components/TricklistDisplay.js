import React from "react";
import useGetTricklists from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";

const TricklistDisplay = ({ setOpenView, setTricklist_id }) => {
	const userInfo = useUserStore((s) => s.userInfo);

	const handleListClick = (uuid) => {
		console.log("setOpenView", uuid);
		setTricklist_id(uuid);
		setOpenView(true);
	};
	const { data: lists } = useGetTricklists();

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
					{Array.isArray(lists) &&
						lists.length > 0 &&
						lists.map((item) => (
							<tr
								key={item.tricklist_id}
								onClick={() => handleListClick(item.tricklist_id)}>
								<td>
									{item.tricklist_id.substring(item.tricklist_id.length - 4)}
								</td>
								<td>{item.name}</td>
								<td>{item?.Owner?.username}</td>
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
