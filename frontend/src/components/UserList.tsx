import useGetAllUsers from "api/useGetAllUsers";
import Link from "next/link";
import React, { useState } from "react";
import { trpc } from "utils/trpc";
import * as d3 from "d3";
const UserList = () => {
  // const { data: users } = useGetAllUsers();
  const { data: users } = trpc.userDB.findAll.useQuery();
  const [currentFilter, setCurrentFilter] = useState("Points");
  const getFilter = (filter) => {
    switch (filter) {
      case "Sessions":
        return users?.sort((a, b) =>
          a?.sessionSummaries.length + a?.SessionSummaries.length >
          b?.sessionSummaries.length + b.SessionSummaries.length
            ? -1
            : 1
        );
      case "Clips":
        return users?.sort((a, b) =>
          a?.Clips.length > b?.Clips.length ? -1 : 1
        );
      case "Oldest":
        return users?.sort((a, b) => (a?.createdAt < b?.createdAt ? -1 : 1));
      case "Points":
        return users?.sort((a, b) =>
          a?.Clips.reduce((sum, b) => sum + b.totalScore, 0) >
          b?.Clips.reduce((sum, b) => sum + b.totalScore, 0)
            ? -1
            : 1
        );
    }
  };
  const getInfo = (filter, user) => {
    switch (filter) {
      case "Sessions":
        return user?.SessionSummaries.length + user.sessionSummaries.length;
      case "Clips":
        return user?.Clips.length;
      case "Oldest":
        return user?.id;
      case "Points":
        return user?.Clips.reduce((sum, b) => sum + b.totalScore, 0).toFixed(2);
    }
  };
  getFilter(currentFilter);

  return (
    <div className="flex w-full flex-col gap-2 p-2 text-zinc-300">
      <div className="p-1 ">Users by {currentFilter}</div>
      <div className="flex justify-around gap-2">
        <p
          className="rounded-md bg-zinc-900 bg-opacity-60 px-4 py-1"
          onClick={() => setCurrentFilter("Sessions")}
        >
          Sessions
        </p>
        <p
          className="rounded-md bg-zinc-900 bg-opacity-60 px-4 py-1"
          onClick={() => setCurrentFilter("Clips")}
        >
          Clips
        </p>
        <p
          className="rounded-md bg-zinc-900 bg-opacity-60 px-4 py-1"
          onClick={() => setCurrentFilter("Points")}
        >
          Points
        </p>
        <p
          className="rounded-md bg-zinc-900 bg-opacity-60 px-4 py-1"
          onClick={() => setCurrentFilter("Oldest")}
        >
          Oldest
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {users &&
          users.map((user, i) => (
            <Link
              key={user.uuid}
              href={`/userProfile/${user.uuid}`}
              className="flex justify-between rounded-md bg-zinc-900 p-1 text-zinc-300"
            >
              <div
                style={{
                  backgroundColor: d3.interpolateRainbow(
                    user.id / users.length
                  ),
                }}
                className={`relative h-6 w-6 rounded-full`}
              >
                <img
                  src={
                    !user.profilePic
                      ? `/images/noimg.jpeg`
                      : `/images/${user.uuid}/${user.profilePic}`
                  }
                  alt={"profilePic"}
                  className={`h-6 w-6 rounded-full ${
                    !user.profilePic ? " mix-blend-multiply contrast-150" : ""
                  }`}
                />
                {/* <div
                    style={{
                      backgroundColor: d3.interpolateRainbow(i / users.length),
                    }}
                    className={`absolute top-0 h-full w-full rounded-full bg-blend-multiply`}
                  /> */}
              </div>
              <div className="rounded-md  p-1">{user.username}</div>
              <div className="rounded-md  p-1">
                {getInfo(currentFilter, user)}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserList;
