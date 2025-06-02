"use client";

import {
  CREDITS_COUNT_UP_DECIMALS,
  CREDITS_COUNT_UP_DURATION,
} from "@/constants/constants";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

type Props = {
  value: number;
};

const ReactCountUpWrapper = ({ value }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "-";

  return (
    <CountUp
      duration={CREDITS_COUNT_UP_DURATION}
      preserveValue
      end={value}
      decimals={CREDITS_COUNT_UP_DECIMALS}
    />
  );
};

export default ReactCountUpWrapper;
