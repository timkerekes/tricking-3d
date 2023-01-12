import useGetAllUsers from "api/useGetAllUsers";
import Link from "next/link";
import React from "react";

const UserList = () => {
  const { data: users } = useGetAllUsers();
  console.log(users);
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <div className="p-1">UserList</div>
      <div className="flex flex-col gap-2">
        {users &&
          users.map((user) => (
            <Link
              href={`/userProfile/${user.uuid}`}
              className="flex justify-between rounded-md bg-zinc-900 p-1"
            >
              <img
                src={
                  !user.profilePic
                    ? `/images/noimg.jpeg`
                    : `/images/${user.uuid}/${user.profilePic}`
                }
                alt={"profilePic"}
                className={"h-6 w-6 rounded-full"}
              />
              <div className="rounded-md  p-1">{user.username}</div>
              <div className="rounded-md  p-1">
                {user?.SessionSummaries?.length}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserList;