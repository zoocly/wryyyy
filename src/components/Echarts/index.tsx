// @learnTS-ignore
import echarts from "echarts";
import React, { useRef } from 'react';
import ReactEchartsCore from "echarts-for-react/lib/core";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/gauge";
import "echarts/lib/chart/pie";
interface Interface {
  option:object,
}
export default function index(props:Interface) {
  const { option } = props;
  const chartRef = useRef(null);
  return (
    <ReactEchartsCore
      ref={chartRef}
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'light'}
    />
  )
}
