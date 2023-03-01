'use client';
import React from 'react';
import { PreviewSuspense } from 'next-sanity/preview';

type Props = {
  fallback?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode;
};

const PreviewSuspenseWrapper = ({ fallback, children }: Props) => {
  if (
    (typeof window !== 'undefined' &&
      // @ts-expect-error: just checking if the react dev tools are not active because it causes a bug with preview suspense
      !window?.__REACT_CONTEXT_DEVTOOL_GLOBAL_HOOK) ||
    process.env.NODE_ENV !== 'production'
  )
    return (
      <PreviewSuspense fallback={fallback}>
        {children}
        <h1>Ye yeys yesy</h1>
      </PreviewSuspense>
    );
  return <>{children}</>;
};

export default PreviewSuspenseWrapper;

// todo replace the component above with the one below once the react dev tools no longer cause the previewSuspense to crash
// 'use client';

// // Once rollup supports 'use client' module directives then 'next-sanity' will include them and this re-export will no longer be necessary
// export { PreviewSuspense as default } from 'next-sanity/preview';
