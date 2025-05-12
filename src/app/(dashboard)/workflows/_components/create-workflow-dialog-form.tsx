import { createWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateWorkflowDialogForm = () => {
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () =>
      toast.success("Workflow created", { id: "create-workflow" }),
    onError: () =>
      toast.error("Failed to create a workflow", { id: "create-workflow" }),
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating a workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Name
                <p className="text-xs text-primary">(required)</p>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Choose a descriptive and unique name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Description
                <p className="text-xs text-muted-foreground">(optional)</p>
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormDescription>
                Give a short summary of what your workflow does.
                <br /> This step is optional but can help you recall the
                workflow&apos;s purpose later
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {!isPending ? "Proceed" : <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkflowDialogForm;
