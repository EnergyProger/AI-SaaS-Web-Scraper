"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import React, { useId, useState } from "react";

type Props = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
};

const StringParam = ({ param, value, updateNodeParamValue }: Props) => {
  const id = useId();

  const [internalValue, setInternalValue] = useState<string>(value);

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInternalValue(event.target.value);

  const onBlurInputValue = (event: React.FocusEvent<HTMLInputElement>) =>
    updateNodeParamValue(event.target.value);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        className="text-xs"
        id={id}
        value={internalValue}
        placeholder="Enter value here..."
        onChange={onChangeInputValue}
        onBlur={onBlurInputValue}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
