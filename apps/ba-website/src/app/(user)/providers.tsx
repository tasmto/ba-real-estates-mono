'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider } from 'jotai';

const myStore = createStore();

export default function Providers({
    children,
}: {
    children: ReactNode | ReactNode[];
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Provider store={myStore}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
}
