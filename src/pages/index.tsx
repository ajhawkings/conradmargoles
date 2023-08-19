import { promises } from 'fs'
import { useState } from 'react'
import useViewport from '@lib/useViewport'

import ExportedImage from 'next-image-export-optimizer'
import Head from 'next/head'
import Link from 'next/link'
import Wrapper from '@components/wrapper'

import styles from '@styles/Landing.module.css'

export async function getStaticProps () {
  const files: string[] = await promises.readdir('public/images/home')
  return { props: { files } }
}

interface Props {
  files: string[]
}

export default function Landing ({ files }: Props) {
  const [current, setCurrent] = useState(0)
  const [width] = useViewport()

  if (width <= 1000) {
    return <>
      <Head>
        <title>Conrad Margoles Architects</title>
      </Head>
      <div className={styles.mcontainer}>
        <Wrapper>
          <ExportedImage
            src="images/projects/(01) Head Heart Hand House Home/Image 1.jpg"
            alt="Landing page image"
            width="1000"
            height="1500"
            className={styles.mimage}
          />
        </Wrapper>
      </div>
    </>
  }

  return <>
    <Head>
      <title>Conrad Margoles Architects</title>
    </Head>
    {/* Back button */}
    <button 
      className={styles.arrow} 
      onClick={() => setCurrent(current > 0 ? (current - 1) : (files.length - 1))}
    >
      <ExportedImage
        src="images/handwritten/Arrows Left White.png"
        alt="Previous image"
        width="55"
        height="55"
      />
    </button>
    {/* Forward button */}
    <button 
      className={`${styles.arrow} ${styles.right}`} 
      onClick={() => setCurrent(current < (files.length - 1) ? (current + 1) : 0)}
    >
      <ExportedImage
        src="images/handwritten/Arrows Right White.png"
        alt="Next image"
        width="45"
        height="40"
      />
    </button>
    <Link href="/portfolio">
      {/* Logo */}
      <ExportedImage
        src="images/handwritten/CAArchitects_LogoWhite.png"
        alt="Conrad Margoles Architects logo"
        className={styles.logo}
        width="300"
        height="100"
      />
      {/* Gallery */}
      <section>
        {files.map((file, index) => (
          <div className={index === current ? `${styles.slide} ${styles.active}` : styles.slide} key={index}>
            <ExportedImage 
              src={`images/home/${file}`} 
              alt="Architectural project" 
              className={styles.image} 
              width="2560" 
              height="1709"
            />
          </div>
        ))}
      </section>
    </Link>
  </>
}
