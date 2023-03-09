import { SessionSummaryCard } from "@old_pages/userProfile/components/SessionStatsList";
import { sessionsummaries } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";

const ComparePage = () => {
  const { data: summaries, status } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();
  const [compareList, addToCompare] = useState<sessionsummaries[]>([]);
  return (
    <div className="h-full w-full text-zinc-300">
      ComparePage
      <div className="mt-14 flex flex-col gap-2 p-2">
        <button className=" outlineButton  place-self-end px-4 py-2 text-xl">
          compare
        </button>
        {status === "success" &&
          summaries?.map((summary) => {
            const chosen = compareList?.find(
              (s) => JSON.stringify(s) === JSON.stringify(summary)
            );
            return (
              <div
                className={`${
                  chosen ? "border-2 border-zinc-300" : ""
                } rounded-md`}
              >
                <SessionSummaryCard
                  f={() =>
                    chosen
                      ? addToCompare((s) => [...s.filter((s) => s !== summary)])
                      : addToCompare((s) => [...s, summary])
                  }
                  summary={summary}
                />
              </div>
            );
          })}
      </div>
      <div>{compareList.map((cl) => cl.name)}</div>
    </div>
  );
};

export default ComparePage;
