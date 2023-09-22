import { ProjectType, getProjects } from '@lib/projects'
import { useEffect, useRef, useState } from 'react'
import useViewport from '@lib/useViewport'

import BackToTop from '@components/top'
import ExportedImage from 'next-image-export-optimizer'
import Head from 'next/head'
import Link from 'next/link'
import Wrapper from '@components/wrapper'

import styles from '@styles/Project.module.css'

export async function getStaticPaths () {
  const projects = await getProjects()
  const paths = projects.map((project) => ({
    params: { id: project.path },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps ({ params }: { params: { id: string } }) {
  const projects = await getProjects()
  const project = projects.find((project) => project.path === params.id) ?? { name: 'Not Found' }
  return {
    props: {
      project
    }
  }
}
      
export default function Project ({ project }: { project: ProjectType }) {
  const [width] = useViewport()

  const photos = project.photos
  const length = photos.length - 1
  const [position, setPosition] = useState(0)
  const [distance, setDistance] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (width >= 1001) {
      // Get the widths of all the images before the current one
      const imageWidths = Array.from(galleryRef.current?.children ?? []).slice(0, position)
      // Sum the widths of all the images before the current one
      let sum = imageWidths.reduce((sum, element) => (sum + element.clientWidth), 0)
      // Add the margin between images
      sum += (position * 16)
      // Set the width of the slider
      setDistance(sum)
    } else {
      setDistance(0)
    }
  }, [galleryRef, position, width])

  return <>
    <Head>
      <title>{`${project.name} | Conrad Margoles Architects`}</title>
      <meta name="description" content={project.description} />
    </Head>
    <Wrapper>
      <div className={styles.root}>
        {/* Left arrow */}
        <button className={styles.arrow} onClick={() => { setPosition((position > 0) ? (position - 1) : length) }}>
          <ExportedImage
            src="/images/handwritten/Arrows Left.png"
            alt="Previous image"
            width="60"
            height="50"
          />
        </button>
        {/* Right arrow */}
        <button className={`${styles.arrow} ${styles.right}`} onClick={() => { setPosition((position < length) ? (position + 1) : 0) }}>
          <ExportedImage
            src="/images/handwritten/Arrows Right.png"
            alt="Next image"
            width="75"
            height="40"
          />
        </button>
        {/* Close button */}
        <Link href="/portfolio" className={styles.close}>
          <ExportedImage
            src="/images/handwritten/X.png"
            alt="Close project"
            width="90"
            height="90"
          />
        </Link>
        {/* Sliding image gallery */}
        <div className={styles.container}>
          <div className={styles.slider} ref={galleryRef} style={{ transform: `translateX(-${distance}px)` }}>
            {project.photos.map((photo) => (
              <ExportedImage
                key={photo}
                src={photo}
                alt={project.name}
                fill
                className={styles.photo}
                placeholder='empty'
              />
            ))}
          </div>
          {width <= 1000 &&
            <>
              {/* Mobile text */}
              <ExportedImage
                src={project.textMobile}
                alt="Text describing architectural project"
                className={styles.text}
                width="983"
                height="1267"
              />
              {/* Back to top button */}
              <BackToTop />
            </>
          }
        </div>
      </div>
    </Wrapper>
  </>
}
