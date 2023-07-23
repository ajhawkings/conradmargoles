import { promises } from 'fs'
import { useState } from 'react'
import useViewport from '@lib/useViewport'

import Head from 'next/head'
import Image from 'next/image'
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

  if (width < 1000) {
    return <>
      <Head>
        <title>Conrad Margoles Architects</title>
      </Head>
      <div className={styles.mcontainer}>
        <Wrapper>
          <Image
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
      <Image
        src="images/handwritten/Arrows Left.png"
        alt="Previous image"
        width="70"
        height="60"
      />
    </button>
    {/* Forward button */}
    <button 
      className={`${styles.arrow} ${styles.right}`} 
      onClick={() => setCurrent(current < (files.length - 1) ? (current + 1) : 0)}
    >
      <Image
        src="images/handwritten/Arrows Right.png"
        alt="Next image"
        width="90"
        height="50"
      />
    </button>
    <Link href="/portfolio">
      {/* Logo */}
      <Image
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
            <Image 
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
