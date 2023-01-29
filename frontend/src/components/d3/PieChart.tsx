import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
const PieChart = ({ data }) => {
  const svgRef = useRef();
  const [piRef, dimensions] = useMeasure();
  useEffect(() => {
    const margin = { top: 10, left: 10, right: 10, bottom: 10 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    if (svgRef.current !== undefined) {
      const svg = d3
        .select(svgRef.current)
        .join("svg")
        .attr("width", width)
        .attr("height", height)
        .join("g")
        .style("transform", `translate(${margin.left},${margin.top})`);

      console.log(data);
      const arcGen = d3.arc().innerRadius(75).outerRadius(150);
      const piGen = d3
        .pie()
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .sort(null);
      const instructions = piGen(
        data.reduce(
          (sum, d) => sum + parseFloat(d.executionAverage) / data.length
        )
      );
      svg
        .selectAll(".slice")
        .data(instructions)
        .attr("class", "slice")
        .join("path")
        .style("fill", "yellow")
        .style(
          "transform",
          `translate(${dimensions.width / 2}px,${dimensions.height / 2}px`
        )
        .attr("d", (instruction) => arcGen(instruction));
    }
    console.log(dimensions);
  }, [data, dimensions]);
  return (
    <div ref={piRef} className="h-[300px] w-full">
      <svg key={"pichartKey"} className="h-[300px] w-full" ref={svgRef} />
    </div>
  );
};

export default PieChart;
