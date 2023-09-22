import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import ExportedImage from 'next-image-export-optimizer'
import Head from 'next/head'
import Wrapper from '@components/wrapper'

import styles from '@styles/Pages.module.css'

export default function Studio () {
  const [width] = useViewport()
  
  return <>
    <Head>
      <title>Contact | Conrad Margoles Architects</title>
      <meta name="description" content="Conrad Margoles Architects, RIBA chartered practice 2004578. 6 Burstock Road, London, SW15 2PW. Email: studio@conradmargoles.com. Tel: +44 (0) 20 87805166" />
    </Head>
    <Wrapper>
      <div className={`${styles.container} ${styles.contact}`}>
        {width <= 1000 && <>
          <ExportedImage
            src="/images/contact/Map_mobile.jpg"
            alt="Map showing location of studio"
            fill
          />
          <div className={styles.text}>
            <ExportedImage
              src="/images/contact/Contact_mobile.png"
              alt="Text with contact information"
              width={1527}
              height={1123}
            />
            <a className={styles.email} href="mailto:studio@conradmargoles.com" aria-label="mailto:studio@conradmargoles.com"></a>
            <a className={styles.phone} href="tel:+442087805166" aria-label="Telephone number: +442087805166"></a>
          </div>
          <BackToTop />
        </>}
        {width >= 1001 && <>
          <ExportedImage
            src="/images/contact/Map_desktop.jpg"
            alt="Map showing location of studio"
            fill
            className={styles.map}
          />
          <div className={styles.text}>
            <ExportedImage
              src="/images/contact/Contact_desktop.png"
              alt="Text with contact information"
              fill
            />
            <a className={styles.email} href="mailto:studio@conradmargoles.com" aria-label="mailto:studio@conradmargoles.com"></a>
          </div>
        </>}
      </div>
    </Wrapper>
  </>
}
