"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ANALYTICS_CHART_AREA_COLOR_FAILED,
  ANALYTICS_CHART_AREA_COLOR_SUCCESS,
  ANALYTICS_CHART_AREA_HEIGHT,
  ANALYTICS_CHART_AREA_MIN_TICK_GAP,
  ANALYTICS_CHART_AREA_MIN_VALUE,
  ANALYTICS_CHART_AREA_OPACITY,
  ANALYTICS_CHART_AREA_STACK_ID,
  ANALYTICS_CHART_AREA_TICK_MARGIN,
  ANALYTICS_CHART_CONFIG,
} from "@/constants/analytics";
import { WorkflowsExecutionChartData } from "@/types/analytics";
import { Layers2 } from "lucide-react";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = {
  data: WorkflowsExecutionChartData;
};

const ExecutionStatusChart = ({ data }: Props) => {
  const tickFormatterDate = (value: any) => {
    const date = new Date(value);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2 className="h-6 w-6 text text-primary" />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successful and failed workflow executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="max-h-[200px] w-full"
          config={ANALYTICS_CHART_CONFIG}
        >
          <AreaChart
            data={data}
            height={ANALYTICS_CHART_AREA_HEIGHT}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={ANALYTICS_CHART_AREA_TICK_MARGIN}
              minTickGap={ANALYTICS_CHART_AREA_MIN_TICK_GAP}
              tickFormatter={(value) => tickFormatterDate(value)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Area
              dataKey={"success"}
              min={ANALYTICS_CHART_AREA_MIN_VALUE}
              type="bump"
              fill={ANALYTICS_CHART_AREA_COLOR_SUCCESS}
              fillOpacity={ANALYTICS_CHART_AREA_OPACITY}
              stroke={ANALYTICS_CHART_AREA_COLOR_SUCCESS}
              stackId={ANALYTICS_CHART_AREA_STACK_ID}
            />
            <Area
              dataKey={"failed"}
              min={ANALYTICS_CHART_AREA_MIN_VALUE}
              type="bump"
              fill={ANALYTICS_CHART_AREA_COLOR_FAILED}
              fillOpacity={ANALYTICS_CHART_AREA_OPACITY}
              stroke={ANALYTICS_CHART_AREA_COLOR_FAILED}
              stackId={ANALYTICS_CHART_AREA_STACK_ID}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExecutionStatusChart;
