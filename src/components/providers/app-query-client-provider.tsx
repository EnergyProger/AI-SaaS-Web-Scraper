"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";
import { COLOR_TOP_LOADER } from "@/constants/constants";

type Props = {
  children: React.ReactNode;
};

const AppQueryClientProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
      <NextTopLoader color={COLOR_TOP_LOADER} showSpinner={false} />
    </QueryClientProvider>
  );
};

export default AppQueryClientProvider;
