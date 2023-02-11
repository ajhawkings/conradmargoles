import { useState } from 'react'
import fs from 'fs'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/Landing.module.css'

export async function getStaticProps() {
  // images are located in images/home
  // fetch a list of all files in that directory
  const files = fs.readdirSync('public/images/home')
  return { props: { files } }
}

interface Props {
  files: string[]
}

export default function Landing({ files }: Props) {
  const [current, setCurrent] = useState(0)

  return (
    <>
      <Head>
        <title>Conrad Margoles Architects</title>
      </Head>
      {current !== 0 &&
        <button className={styles.arrow} onClick={() => setCurrent(current - 1)}>
          <Image
            src="/images/handwritten/Arrows Left Black.png"
            alt="Previous image"
            width="50"
            height="50"
          />
        </button>
      }
      {current !== files.length - 1 &&
        <button className={`${styles.arrow} ${styles.right}`} onClick={() => setCurrent(current + 1)}>
          <Image
            src="/images/handwritten/Arrows Right Black.png"
            alt="Next image"
            width="50"
            height="50"
          />
        </button>
      }
      <Link href="/home">
        <Image
          src="/images/handwritten/CAArchitects_LogoWhite.png"
          alt="Conrad Margoles Architects logo"
          className={styles.logo}
          width="300"
          height="100"
        />
        <section className={styles.slider}>
          {files.map((file, i) => {
            return (
              <div className={i === current ? `${styles.slide} ${styles.active}` : styles.slide} key={i}>
                {i === current && (
                  <Image src={`/images/home/${file}`} alt="Architectural project" className={styles.image} width="2560" height="1709" />
                )}
              </div>
            )
          })}
        </section>
      </Link>
    </>
  )
}
