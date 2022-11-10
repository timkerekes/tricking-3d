import React, { useState } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
import DataList from "./DataList";
import SessionSummariesOverview from "./SessionSummariesOverview";
import TrickPointEditor from "./trickMaker/TrickPointEditor";
import UserList from "./UserList";
const AdminDisplay = () => {
	const [displayItem, setItem] = useState();
	return (
		<>
			<div className='absolute left-2 top-20 z-[100] flex flex-col gap-2 text-4xl'>
				<IoIosList onClick={() => setItem("Tricks")} />
				<IoIosPeople onClick={() => setItem("Users")} />
				<span
					onClick={() => setItem("SessionSummaries")}
					className={"text-center font-titan"}>
					S
				</span>
				<span
					onClick={() => setItem("TrickPoints")}
					className={"text-center font-titan"}>
					TP
				</span>
			</div>
			<div>
				{displayItem === "Tricks" && <DataList />}
				{displayItem === "Users" && <UserList />}
				{displayItem === "SessionSummaries" && <SessionSummariesOverview />}
				{displayItem === "TrickPoints" && <TrickPointEditor />}
			</div>
		</>
	);
};

export default AdminDisplay;
