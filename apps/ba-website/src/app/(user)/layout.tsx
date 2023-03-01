import Providers from './providers';

import '@/css/globals.css';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <>{children}</>
    </Providers>
  );
};
export default RootLayout;
