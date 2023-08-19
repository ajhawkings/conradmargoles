import { useRef } from 'react'
import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import Head from 'next/head'
import Image from 'next/image'
import Wrapper from '@components/wrapper'

import styles from '@styles/Pages.module.css'

export default function Studio () {
  const [width] = useViewport()
  const imageRef = useRef<HTMLImageElement>(null)
  
  return <>
    <Head>
      <title>Studio | Conrad Margoles Architects</title>
    </Head>
    <Wrapper>
      <div className={styles.container}>
        {width <= 1000 && <>
          <Image
            src="/images/studio/Photo_mobile.jpg"
            alt="Photo of architectural studio"
            fill
          />
          <Image
            src="/images/studio/Studio_mobile.png"
            alt="Text describing the studio and team"
            fill
            className={styles.description}
          />
          <BackToTop />
        </>}
        {width >= 1001 && <>
          {(imageRef.current?.clientWidth ?? 501) > 500 &&
            <Image
              src="/images/studio/Photo_desktop.jpg"
              alt="Photo of architectural studio"
              fill
              className={styles.image}
              ref={imageRef}
            />
          } 
          <div className={styles.text}>
            <Image 
              src="/images/studio/Studio_desktop.png"
              alt="Text describing the studio"
              fill
            />
          </div>
          <div className={styles.text}>
            <Image
              src="/images/studio/Team_desktop.png"
              alt="Text describing the team"
              fill
            />
          </div>
        </>}
      </div>
    </Wrapper>
  </>
}
