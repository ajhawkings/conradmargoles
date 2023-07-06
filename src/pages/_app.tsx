import { usePreserveScroll } from '@lib/usePreserveScroll'

import '@styles/styles.css'

import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps) {
  usePreserveScroll()

  return <Component {...pageProps} />
}
