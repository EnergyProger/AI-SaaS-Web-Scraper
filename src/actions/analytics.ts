"use server";

import { periodToDateRange } from "@/lib/helper/dates";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

export const getPeriods = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const years = await prisma.workflowExecution.aggregate({
      where: {
        userId,
      },
      _min: { startedAt: true },
    });

    const currentYear = new Date().getFullYear();

    const minYear = years._min.startedAt
      ? years._min.startedAt.getFullYear()
      : currentYear;

    const periods: Period[] = [];

    for (let year = minYear; year <= currentYear; year++) {
      for (let month = 0; month < 12; month++) {
        periods.push({ year, month });
      }
    }

    return periods;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get periods:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getStatsCardsValues = async (period: Period) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const dateRange = periodToDateRange(period);
    const executions = await prisma.workflowExecution.findMany({
      where: {
        userId,
        startedAt: {
          gte: dateRange.startDate,
          lte: dateRange.endDate,
        },
        status: {
          in: [
            WorkflowExecutionStatus.COMPLETED,
            WorkflowExecutionStatus.FAILED,
          ],
        },
      },
      select: {
        creditsConsumed: true,
        phases: {
          where: {
            creditsConsumed: {
              not: null,
            },
          },
          select: {
            creditsConsumed: true,
          },
        },
      },
    });

    const stats = {
      workflowExecutions: executions.length,
      creditsConsumed: 0,
      phaseExecutions: 0,
    };

    stats.creditsConsumed = executions.reduce(
      (sum, execution) => sum + execution.creditsConsumed,
      0
    );

    stats.phaseExecutions = executions.reduce(
      (sum, execution) => sum + execution.phases.length,
      0
    );

    return stats;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get stats cards values:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getWorkflowExecutionStats = async (period: Period) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const dateRange = periodToDateRange(period);
    const executions = await prisma.workflowExecution.findMany({
      where: {
        userId,
        startedAt: {
          gte: dateRange.startDate,
          lte: dateRange.endDate,
        },
      },
    });

    const dateFormat = "yyyy-MM-dd";

    const stats: Record<string, { success: number; failed: number }> =
      eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      })
        .map((date) => format(date, dateFormat))
        .reduce((acc, date) => {
          acc[date] = {
            success: 0,
            failed: 0,
          };

          return acc;
        }, {} as any);

    executions.forEach((execution) => {
      const date = format(execution.startedAt!, dateFormat);

      if (execution.status === WorkflowExecutionStatus.COMPLETED) {
        stats[date].success += 1;
      }

      if (execution.status === WorkflowExecutionStatus.FAILED) {
        stats[date].failed += 1;
      }
    });

    const result = Object.entries(stats).map(([date, infos]) => ({
      date,
      ...infos,
    }));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get workflow execution stats:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};

export const getCreditsUsageInPeriod = async (period: Period) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthenticated");
    }

    const dateRange = periodToDateRange(period);
    const executionPhases = await prisma.executionPhase.findMany({
      where: {
        userId,
        startedAt: {
          gte: dateRange.startDate,
          lte: dateRange.endDate,
        },
        status: {
          in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED],
        },
      },
    });

    const dateFormat = "yyyy-MM-dd";

    const stats: Record<string, { success: number; failed: number }> =
      eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      })
        .map((date) => format(date, dateFormat))
        .reduce((acc, date) => {
          acc[date] = {
            success: 0,
            failed: 0,
          };

          return acc;
        }, {} as any);

    executionPhases.forEach((executionPhase) => {
      const date = format(executionPhase.startedAt!, dateFormat);

      if (executionPhase.status === ExecutionPhaseStatus.COMPLETED) {
        stats[date].success += executionPhase.creditsConsumed || 0;
      }

      if (executionPhase.status === ExecutionPhaseStatus.FAILED) {
        stats[date].failed += executionPhase.creditsConsumed || 0;
      }
    });

    const result = Object.entries(stats).map(([date, infos]) => ({
      date,
      ...infos,
    }));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to get credits usage in period:", error.message);
      throw error;
    } else {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
};
