"use client";

import { TaskParam } from "@/types/task";
import React from "react";

type Props = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (value: string) => void;
};

function BrowserInstanceParam({ param, value, updateNodeParamValue }: Props) {
  return <p className="text-xs">{param.name}</p>;
}

export default BrowserInstanceParam;
