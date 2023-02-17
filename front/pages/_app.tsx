import '@/styles/globals.css'
import { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Rubik } from '@next/font/google'

const rubik = Rubik({ subsets: ['latin'], weight: ['400'] })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      retryDelay: 1000
    }
  }
})

export default function App({ Component, pageProps }: MyAppPropsType) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <style jsx global>
        {`
          :root {
            --rubik-font: ${rubik.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

export type GetLayoutFnType = {
  getLayout: (page: React.ReactElement) => any
}

export type AppPage = NextPage & GetLayoutFnType

interface MyAppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & GetLayoutFnType
  pageProps: any
}
