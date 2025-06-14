import { createCredential } from "@/actions/credentials";
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
import { errorHandler } from "@/lib/helper/error-handler";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCredentialDialogForm = ({ setIsOpen }: Props) => {
  const form = useForm<createCredentialSchemaType>({
    resolver: zodResolver(createCredentialSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCredential,
    onSuccess: () => {
      toast.success("Credential created", { id: "create-credential" });
      form.reset();
      setIsOpen(false);
    },
    onError: (error: unknown) => {
      const message = errorHandler(error);
      toast.error(message, { id: "create-credential" });
    },
  });

  const onSubmit = useCallback(
    (values: createCredentialSchemaType) => {
      toast.loading("Creating a credential...", { id: "create-credential" });
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
                Enter a unique an descriptive name for the credential <br />
                This name will be used to identify the credential
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Value
                <p className="text-xs text-primary">(required)</p>
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormDescription>
                Enter the value associated with this credential <br />
                This value will be securely encrypted and stored
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

export default CreateCredentialDialogForm;
