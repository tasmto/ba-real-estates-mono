"use client";

import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createStore, Provider } from "jotai";
import useEffectOnce from "@/hooks/useEffectOnce";
import { muiBrandTheme } from "@/css/mui.theme";

const myStore = createStore();

export default function Providers({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffectOnce(() => {
    window?.scrollTo(0, 0);
  });

  return (
    <ThemeProvider theme={muiBrandTheme}>
      <Provider store={myStore}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
