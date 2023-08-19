
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export const usePreserveScroll = () => {
  const router = useRouter()

  const scrollPositions = useRef<Record<string, number>>({})

  useEffect(() => {
    const onRouteChangeStart = () => {
      const url = router.pathname
      scrollPositions.current[url] = window.scrollY
    }

    const onRouteChangeComplete = (url: string) => {
      if (scrollPositions.current[url]) {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: 'auto',
        })
      }
    }

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])
}
