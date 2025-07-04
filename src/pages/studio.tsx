import { useRef } from 'react'
import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import ExportedImage from 'next-image-export-optimizer'
import Head from 'next/head'
import Wrapper from '@components/wrapper'

import styles from '@styles/Pages.module.css'

export default function Studio () {
  const [width] = useViewport()
  const imageRef = useRef<HTMLImageElement>(null)
  
  return <>
    <Head>
      <title>Studio | Conrad Margoles Architects</title>
      <meta name="description" content="We are a multi-cultural studio of dedicated and passionate architects that bring a variety of experiences and strengths to each project." />
    </Head>
    <Wrapper>
      <div className={styles.container}>
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
        {width >= 1001 && <>
          {(imageRef.current?.clientWidth ?? 501) > 500 &&
            <ExportedImage
              src="/images/studio/Photo_desktop.jpg"
              alt="Photo of architectural studio"
              fill
              className={styles.image}
              ref={imageRef}
            />
          } 
          <div className={styles.text}>
            <ExportedImage 
              src="/images/studio/Studio_desktop.png"
              alt="Text describing the studio"
              fill
            />
          </div>
          <div className={styles.text}>
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
