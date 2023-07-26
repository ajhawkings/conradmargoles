import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import Head from 'next/head'
import Image from 'next/image'
import Wrapper from '@components/wrapper'

import styles from '@styles/Pages.module.css'

export default function Studio () {
  const [width] = useViewport()
  
  return <>
    <Head>
      <title>Contact | Conrad Margoles Architects</title>
    </Head>
    <Wrapper>
      <div className={`${styles.container} ${styles.contact}`}>
        {width <= 1000 && <>
          <Image
            src="/images/contact/Map_mobile.jpg"
            alt="Map showing location of studio"
            fill
          />
          <div className={styles.text}>
            <Image
              src="/images/contact/Contact_mobile.png"
              alt="Text with contact information"
              fill
            />
            <a className={styles.email} href="mailto:studio@conradmargoles.com" aria-label="mailto:studio@conradmargoles.com"></a>
            <a className={styles.phone} href="tel:+442087805166" aria-label="Telephone number: +442087805166"></a>
          </div>
          <BackToTop />
        </>}
        {width >= 1001 && <>
          <Image
            src="/images/contact/Map_desktop.jpg"
            alt="Map showing location of studio"
            fill
            className={styles.map}
          />
          <div className={styles.text}>
            <Image
              src="/images/contact/Contact_desktop.png"
              alt="Text with contact information"
              fill
            />
            <a className={styles.email} href="mailto:studio@conradmargoles.com" aria-label="mailto:studio@conradmargoles.com"></a>
            <a className={styles.phone} href="tel:+442087805166" aria-label="Telephone number: +442087805166"></a>
          </div>
        </>}
      </div>
    </Wrapper>
  </>
}
