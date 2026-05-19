import { useEffect, useRef, useState } from 'react'
import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import ExportedImage from 'next-image-export-optimizer'
import Head from 'next/head'
import Wrapper from '@components/wrapper'

import styles from '@styles/Pages.module.css'

export default function Studio () {
  const [width] = useViewport()
  const isDesktop = width >= 1001

  // The desktop photo is only shown if there is enough space for it, which depends on the width of the text and the gap between them. 
  // This effect uses a ResizeObserver to watch for changes in the size of the container and text elements, and updates the visibility of the photo accordingly.
  const containerRef = useRef<HTMLDivElement>(null)
  const studioTextRef = useRef<HTMLDivElement>(null)
  const teamTextRef = useRef<HTMLDivElement>(null)
  const [showDesktopPhoto, setShowDesktopPhoto] = useState(false)

  useEffect(() => {
    if (!isDesktop) return

    const container = containerRef.current
    const studioText = studioTextRef.current
    const teamText = teamTextRef.current

    if (!container || !studioText || !teamText) return

    const desktopPhotoMinWidth = 300
    const desktopPhotoShowWidth = 340

    const updatePhotoVisibility = () => {
      const computedStyles = window.getComputedStyle(container)
      const gap = Number.parseFloat(computedStyles.columnGap) || 0
      const usedWidth = studioText.offsetWidth + teamText.offsetWidth + (gap * 2)
      const availablePhotoWidth = container.clientWidth - usedWidth

      setShowDesktopPhoto((current) => {
        if (current) return availablePhotoWidth >= desktopPhotoMinWidth
        return availablePhotoWidth >= desktopPhotoShowWidth
      })
    }

    const animationFrame = window.requestAnimationFrame(updatePhotoVisibility)
    let observer: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updatePhotoVisibility)

      observer.observe(container)
      observer.observe(studioText)
      observer.observe(teamText)
    }

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer?.disconnect()
    }
  }, [isDesktop])
  
  return <>
    <Head>
      <title>Studio | Conrad Margoles Architects</title>
      <meta name="description" content="We are a multi-cultural studio of dedicated and passionate architects that bring a variety of experiences and strengths to each project." />
    </Head>
    <Wrapper>
      <div className={styles.container} ref={containerRef}>
        {width <= 1000 && <>
          <ExportedImage
            src="/images/studio/Photo_mobile.jpg"
            alt="Photo of architectural studio"
            fill
          />
          <ExportedImage
            src="/images/studio/Studio_mobile.png"
            alt="Text describing the studio"
            fill
            className={styles.description}
          />
          <ExportedImage
            src="/images/studio/Team_mobile.png"
            alt="Text listing team members"
            fill
            className={styles.description}
          />
          <BackToTop />
        </>}
        {isDesktop && <>
          {showDesktopPhoto &&
            <ExportedImage
              src="/images/studio/Photo_desktop.jpg"
              alt="Photo of architectural studio"
              fill
              className={styles.image}
            />
          } 
          <div className={styles.text} ref={studioTextRef}>
            <ExportedImage 
              src="/images/studio/Studio_desktop.png"
              alt="Text describing the studio"
              fill
            />
          </div>
          <div className={styles.text} ref={teamTextRef}>
            <ExportedImage
              src="/images/studio/Team_desktop.png"
              alt="Text listing team members"
              fill
            />
          </div>
        </>}
      </div>
    </Wrapper>
  </>
}
