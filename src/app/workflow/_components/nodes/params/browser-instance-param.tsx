"use client";

import { TaskParam } from "@/types/task";
import React from "react";

type Props = {
  param: TaskParam;
};

const BrowserInstanceParam = ({ param }: Props) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
