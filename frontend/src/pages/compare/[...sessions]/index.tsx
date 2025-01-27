import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import { PrismaClient, sessionsummaries } from "@prisma/client";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const CompareSessions = ({ initialSummaries }) => {
  const initialsummariesdata = JSON.parse(initialSummaries);
  const router = useRouter();
  const { sessions } = router.query;
  const { data: sessionSummaries, isSuccess } =
    trpc.sessionsummaries.compareDetailsById.useQuery(
      {
        sessions: typeof sessions !== "string" ? sessions : [sessions],
      },
      { initialData: initialsummariesdata }
    );

  type sessionSummary = typeof sessionSummaries;
  function transformSessionInfo(sessionSummaries: sessionSummary) {
    const sessionInfo = {
      "Total Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)?.toFixed(2)
      ),
      "Raw Power": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.powerScore, 0)?.toFixed(2)
      ),
      "# of Combos": sessionSummaries?.map((s) => s.SessionData.length),
      "# of Tricks": sessionSummaries?.map((s) =>
        s.SessionData?.map((sd) => {
          const com = sd.ClipLabel.comboArray as any[];
          return com.filter((t) => t.type === "Trick").length;
        }).reduce((sum, b) => sum + b, 0)
      ),
      "# of Trans..": sessionSummaries?.map((s) =>
        s.SessionData?.map((sd) => {
          const com = sd.ClipLabel.comboArray as any[];
          return com.filter((t) => t.type === "Transition").length;
        }).reduce((sum, b) => sum + b, 0)
      ),
      "# of Chains": sessionSummaries?.map((s) =>
        s.SessionData.map((sd) => Object.keys(sd.chains).length).reduce(
          (sum, b) => sum + b,
          0
        )
      ),
      "Chain Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.chainTotal, 0)?.toFixed(2)
      ),
      "Bonus Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.bonusScore, 0)?.toFixed(2)
      ),
      "Variety Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.varietyScore, 0)?.toFixed(2)
      ),
      "Execution Avg": sessionSummaries?.map((s) =>
        s.SessionData.reduce(
          (sum, b) =>
            sum + b.executionAverage * (b.powerScore + b.varietyScore),
          0
        )?.toFixed(2)
      ),
      "Power %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.powerScore, 0) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Chain %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.chainTotal, 0) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Bonus %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.bonusScore, 0) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Variety %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.varietyScore, 0) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Execution %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce(
              (sum, b) =>
                sum + b.executionAverage * (b.powerScore + b.varietyScore),
              0
            ) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Most Used": sessionSummaries?.map((s) => {
        const trickCount = s.SessionData.map((sd) => sd?.trickCount).reduce(
          (acc: {}, cur: {}) => ({ ...acc, ...cur }),
          {}
        );
        return Object.keys(trickCount)
          ?.filter((key) => trickCount[key].count > 1)
          .sort((a, b) =>
            trickCount[a]?.count > trickCount[b]?.count ? -1 : 1
          )[0];
      }),
    } as const;
    return sessionInfo;
  }
  type CompareData = ReturnType<typeof transformSessionInfo>;
  const [compareData, setCompareData] = useState<CompareData>();
  useEffect(() => {
    if (isSuccess && sessionSummaries?.length) {
      const compareDatum = transformSessionInfo(sessionSummaries);
      setCompareData(compareDatum);
    }
  }, [sessionSummaries]);
  if (!isSuccess)
    return (
      <div className="flex h-full w-full place-content-center place-items-center bg-zinc-900 bg-opacity-40 p-4 text-center text-3xl text-zinc-300">
        Analyzing Sessions For Comparison...
      </div>
    );
  const max = d3.max(sessionSummaries, (s) =>
    d3.max(s.SessionData, (sd) => sd.totalScore)
  );
  return (
    <div className="h-full w-full max-w-full bg-zinc-900 bg-opacity-40 p-4 text-zinc-100">
      <Link href={"/compare"} className=" font-semi-bold p-4 text-4xl">
        CompareSessions
      </Link>
      <div className={`grid grid-cols-[1fr_${sessions?.length}fr] `}>
        <div className="flex h-full w-full place-content-end place-items-center">
          Session
        </div>
        <div className={`flex flex-col place-items-center overflow-hidden`}>
          {Array.isArray(sessionSummaries) &&
            sessionSummaries.map((s, index) => (
              <div className="flex place-items-center gap-1">
                <div
                  style={{
                    color: d3.interpolateRainbow(
                      (index + 1) / (sessionSummaries.length + 1)
                    ),
                    background: d3.interpolateRainbow(
                      (index + 1) / (sessionSummaries.length + 1)
                    ),
                  }}
                  className="h-4 w-4 rounded-full"
                ></div>
                <div
                  style={{
                    color: d3.interpolateRainbow(
                      (index + 1) / (sessionSummaries.length + 1)
                    ),
                  }}
                  className="h-fit rounded-full p-[1px]"
                >
                  {s.name}
                </div>
              </div>
            ))}
        </div>
        <div
          id={"Stat Label"}
          className="col-start-1 flex h-full w-full flex-col place-content-center place-items-end text-zinc-300"
        >
          {compareData &&
            Object.keys(compareData).map((stat) => (
              <h1 className="whitespace-nowrap text-right drop-shadow-lg ">
                {stat}
              </h1>
            ))}
        </div>
        <div
          id={"Stat Data"}
          className={` flex flex-col grid-cols-${sessions?.length} m-4 mr-0 place-items-center gap-x-1 overflow-hidden overflow-x-scroll rounded-md bg-zinc-800 bg-opacity-40 text-right backdrop-blur-md`}
        >
          <div className="absolute z-[-2] h-full w-full "></div>
          {compareData &&
            Object.keys(compareData).map((stat) => (
              <div
                className={`grid w-full min-w-[100px] gap-2 grid-cols-${sessions?.length}`}
              >
                {compareData[stat].map((stat, index) => (
                  <div
                    style={{
                      color: d3.interpolateRainbow(
                        (index + 1) / (sessionSummaries.length + 1)
                      ),
                    }}
                    className={`whitespace-nowrap text-right`}
                  >
                    {stat}
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div
          className={`relative col-span-${sessions?.length} h-[45px] w-full pb-2`}
        >
          {isSuccess &&
            sessionSummaries.map((s, index) => (
              <div className="absolute top-0 h-full w-full">
                <PowerAverageComboLineChart
                  colorized={(index + 1) / (sessionSummaries.length + 1)}
                  normalized={max}
                  data={s?.SessionData.sort((a, b) =>
                    a.clipStart < b.clipEnd ? 1 : -1
                  ).map((d) => d)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompareSessions;

type dir = "Backside" | "Inside" | "Frontside" | "Outside";
type stance = "Complete" | "Hyper" | "Mega" | "Semi";
type stances = `${dir}${stance}`;

const prisma = new PrismaClient();
export const getStaticPaths = async (props) => {
  const summaries = await prisma.sessionsummaries.findMany();
  const summaryCombinations = getUserCombinations(summaries);
  console.log(summaryCombinations.length);
  return {
    paths: summaryCombinations,
    fallback: "blocking",
  };
};

export const getStaticProps = async (props) => {
  const sessionSummaries = await prisma.sessionsummaries.findMany({
    where: { sessionid: { in: props.params.sessions } },
    include: {
      trickers: {
        include: { user: true },
      },
      SessionData: { include: { ClipLabel: true } },
      SessionSources: true,
    },
  });
  const stringy = JSON.stringify(sessionSummaries);
  return { props: { initialSummaries: stringy }, revalidate: 120 };
};

function getUserCombinations(summaries: sessionsummaries[]) {
  const result = new Set();

  function getCombinationsUtil(start: number, chosen: string[]) {
    if (chosen.length > 1 && chosen.length <= 4) {
      result.add([...chosen]);
    }

    for (let i = start; i < summaries.length; i++) {
      chosen.push(summaries[i].sessionid);
      getCombinationsUtil(i + 1, chosen);
      chosen.pop();
    }
  }

  getCombinationsUtil(0, []);

  return [...result].map((r) => ({ params: { sessions: r } }));
}
