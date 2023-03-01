import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className=" h-full min-h-screen overflow-x-hidden bg-slate-800 px-4 text-slate-200 sm:px-2  md:px-1">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>{' '}
    </SessionProvider>
  )
}

export default MyApp
