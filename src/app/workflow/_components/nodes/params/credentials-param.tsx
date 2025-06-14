"use client";

import { getCredentialsForUser } from "@/actions/credentials";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskParam } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import React, { useId } from "react";

type Props = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
};

const CredentialsParam = ({ param, value, updateNodeParamValue }: Props) => {
  const id = useId();

  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => getCredentialsForUser(),
    refetchInterval: 10000,
  });

  const onValueChange = (newValue: string) => updateNodeParamValue(newValue);

  return (
    <div className="flex flex-col gap-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query.data?.map((credential) => (
              <SelectItem key={credential.id} value={credential.id}>
                {credential.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CredentialsParam;
