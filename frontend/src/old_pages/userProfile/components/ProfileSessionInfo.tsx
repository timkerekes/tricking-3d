import React from "react";

const ProfileSessionInfo = ({ summary }) => {
  return (
    <div className=" ">
      <div className="sticky top-0 z-20 w-fit rounded-md bg-zinc-900 bg-opacity-70 p-2 text-2xl">
        {summary?.name}
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {summary?.SessionData.sort((a, b) => {
          if (a.ClipLabel.pointValue > b.ClipLabel.pointValue) return -1;
          if (a.ClipLabel.pointValue < b.ClipLabel.pointValue) return 1;
          if (a.SessionSource?.vidsrc < b.SessionSource?.vidsrc) return -1;
          if (a.SessionSource?.vidsrc > b.SessionSource?.vidsrc) return 1;
          if (a.clipStart > b.clipStart) return 1;
          if (a.clipStart < b.clipStart) return -1;

          return 0;
        }).map((d) => (
          <DataDetails key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSessionInfo;

const DataDetails = ({ d }) => {
  // console.log(d);
  return (
    <div className="flex place-items-center justify-between rounded-md bg-teal-100 bg-opacity-10 p-1 text-sm md:text-inherit">
      <div className="no-scrollbar w-[175px] overflow-x-scroll whitespace-pre-line p-1 text-lg md:w-1/3">
        {d?.ClipLabel?.name}
      </div>
      {/* <div className='w-1/3 '>{d?.SessionSource?.vidsrc}</div> */}
      <div className="w-4/9 flex gap-2">
        <div className="flex min-w-[22px] place-items-center text-xl font-black">
          {d?.ClipLabel?.pointValue}
        </div>
        <div className="min-w-[48px] rounded-md bg-emerald-300 p-1 text-center text-zinc-800">
          {d?.clipStart}
        </div>
        <div className="min-w-[48px] rounded-md bg-red-300 p-1 text-center text-zinc-800">
          {d?.clipEnd}
        </div>
      </div>
    </div>
  );
};
