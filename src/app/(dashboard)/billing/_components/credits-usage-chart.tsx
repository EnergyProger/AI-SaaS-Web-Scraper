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
  ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_FAILED,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_SUCCESS,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_HEIGHT,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_MIN_TICK_GAP,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_OPACITY,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_BOTTOM_FAILED,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_BOTTOM_SUCCESS,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_LEFT_FAILED,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_LEFT_SUCCESS,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_RIGHT_FAILED,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_RIGHT_SUCCESS,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_TOP_FAILED,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_TOP_SUCCESS,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_STACK_ID,
  ANALYTICS_CREDITS_USAGE_CHART_BAR_TICK_MARGIN,
  ANALYTICS_CREDITS_USAGE_CHART_CONFIG,
} from "@/constants/analytics";
import { CreditsUsageChartData } from "@/types/analytics";
import { ChartColumnStacked } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type Props = {
  data: CreditsUsageChartData;
  title: string;
  description: string;
};

const CreditUsageChart = ({ data, title, description }: Props) => {
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
          <ChartColumnStacked className="h-6 w-6 text text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="max-h-[200px] w-full"
          config={ANALYTICS_CREDITS_USAGE_CHART_CONFIG}
        >
          <BarChart
            data={data}
            height={ANALYTICS_CREDITS_USAGE_CHART_BAR_HEIGHT}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={ANALYTICS_CREDITS_USAGE_CHART_BAR_TICK_MARGIN}
              minTickGap={ANALYTICS_CREDITS_USAGE_CHART_BAR_MIN_TICK_GAP}
              tickFormatter={(value) => tickFormatterDate(value)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Bar
              dataKey={"success"}
              fill={ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_SUCCESS}
              fillOpacity={ANALYTICS_CREDITS_USAGE_CHART_BAR_OPACITY}
              stroke={ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_SUCCESS}
              stackId={ANALYTICS_CREDITS_USAGE_CHART_BAR_STACK_ID}
              radius={[
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_TOP_SUCCESS,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_RIGHT_SUCCESS,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_BOTTOM_SUCCESS,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_LEFT_SUCCESS,
              ]}
            />
            <Bar
              dataKey={"failed"}
              fill={ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_FAILED}
              fillOpacity={ANALYTICS_CREDITS_USAGE_CHART_BAR_OPACITY}
              stroke={ANALYTICS_CREDITS_USAGE_CHART_BAR_COLOR_FAILED}
              stackId={ANALYTICS_CREDITS_USAGE_CHART_BAR_STACK_ID}
              radius={[
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_TOP_FAILED,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_RIGHT_FAILED,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_BOTTOM_FAILED,
                ANALYTICS_CREDITS_USAGE_CHART_BAR_RADIUS_LEFT_FAILED,
              ]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CreditUsageChart;
