"use client";

import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { createStore, Provider } from "jotai";

import { muiBrandTheme } from "@/css/mui.theme";
import useEffectOnce from "@/hooks/useEffectOnce";

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
      <Analytics />
      <Provider store={myStore}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
