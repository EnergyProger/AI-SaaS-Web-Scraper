import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LOG_LEVEL_TABLE_CELL_WIDTH,
  LOG_TIMESTAMP_TABLE_CELL_WIDTH,
} from "@/constants/logs";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/types/log";
import { ExecutionLog } from "@prisma/client";
import React from "react";

type Props = {
  logs: ExecutionLog[] | undefined;
};

const LogViewer = ({ logs }: Props) => {
  if (!logs || logs.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Logs generated by this phase
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="text-muted-foreground">
                <TableCell
                  width={LOG_TIMESTAMP_TABLE_CELL_WIDTH}
                  className="text-xs text-muted-foreground p-[2px] pl-2"
                >
                  {log.timestamp.toISOString()}
                </TableCell>
                <TableCell
                  width={LOG_LEVEL_TABLE_CELL_WIDTH}
                  className={cn(
                    "uppercase text-xs font-bold p-[3px] pl-2",
                    (log.logLevel as LogLevel) === "error" &&
                      "text-destructive",
                    (log.logLevel as LogLevel) === "info" && "text-primary"
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="text-sm flex-1 p-[3px] pl-2">
                  {log.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LogViewer;
