"use client";

import {
  removeWorkflowSchedule,
  updateWorkflowCron,
} from "@/actions/workflows";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { errorHandler } from "@/lib/helper/error-handler";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Calendar, Clock, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import { Separator } from "@/components/ui/separator";

type Props = {
  workflowId: string;
  cron: string | null;
};

const SchedulerDialog = (props: Props) => {
  const mutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () =>
      toast.success("Schedule updated successfully", { id: "cron" }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "cron" });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: removeWorkflowSchedule,
    onSuccess: () =>
      toast.success("Schedule removed successfully", { id: "cron" }),
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "cron" });
    },
  });

  const [cron, setCron] = useState<string>(props.cron || "");
  const [validCron, setValidCron] = useState<boolean>(false);
  const [readableCron, setReadableCron] = useState<string>("");

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const humanCronStr = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronstrue.toString(props.cron!);

  const onChangeCron = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCron(event.target.value);
  };

  const saveCron = (workflowId: string, cron: string) => {
    toast.loading("Saving...", { id: "cron" });
    mutation.mutate({
      id: workflowId,
      cron,
    });
  };

  const removeSchedule = (workflowId: string) => {
    toast.loading("Removing schedule...", { id: "cron" });
    removeScheduleMutation.mutate(workflowId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            workflowHasValidCron && "text-primary"
          )}
        >
          {workflowHasValidCron && (
            <div className="flex items-center gap-2">
              <Clock />
              {readableSavedCron}
            </div>
          )}
          {!workflowHasValidCron && (
            <div className="flex items-center gap-1">
              <TriangleAlert className="h-3 w-3" />
              Set up a schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={Calendar}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={onChangeCron}
          />
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
              validCron && "border-primary text-primary"
            )}
          >
            {validCron ? readableCron : "Not a valid cron expression"}
          </div>
          {workflowHasValidCron && (
            <DialogClose asChild>
              <div>
                <Button
                  variant="outline"
                  className="w-full text-destructive border-destructive hover:text-destructive"
                  disabled={
                    mutation.isPending || removeScheduleMutation.isPending
                  }
                  onClick={() => removeSchedule(props.workflowId)}
                >
                  Remove current schedule
                </Button>
                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => saveCron(props.workflowId, cron)}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
