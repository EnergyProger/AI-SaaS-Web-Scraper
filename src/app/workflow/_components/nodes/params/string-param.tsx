"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TaskParam } from "@/types/task";
import React, { useEffect, useId, useState } from "react";

type Props = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
  disabled: boolean;
};

const StringParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: Props) => {
  const id = useId();

  const [internalValue, setInternalValue] = useState<string>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let ComponentElement: any = Input;
  if (param.variant === "textarea") {
    ComponentElement = Textarea;
  }

  const onChangeInputValue = (event: any) =>
    setInternalValue(event.target.value);

  const onBlurInputValue = (event: any) =>
    updateNodeParamValue(event.target.value);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <ComponentElement
        className="text-xs"
        id={id}
        disabled={disabled}
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
