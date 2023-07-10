import { ProjectType, getProjects } from '@lib/projects'
import { useEffect, useRef, useState } from 'react'
import styles from '@styles/Project.module.css'
import useViewport from '@lib/useViewport'

import Head from 'next/head'
import Image from 'next/image'
import Wrapper from '@components/wrapper'

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
  const project = projects.find((project) => project.path === params.id) || { name: 'Not Found' }
  return {
    props: {
      project
    }
  }
}

// Text and back to top button for mobile
function Mobile ({ project }: { project: ProjectType }) {
  const [width] = useViewport()

  if (width < 1000) {
    return <div className={styles.mcontainer}>
      {/* Mobile text */}
      <Image
        src={project.textMobile}
        alt="Text describing architectural project"
        className={styles.text}
        width="983"
        height="1267"
      />
      {/* Back to top button */}
      <button 
        className={styles.top}
        type="button" 
        title="Back to top" 
        onClick={() => window.scrollTo(0,0)}
      >
        <Image
          src="/images/handwritten/Arrows Right.png"
          alt="Back to top"
          height="43"
          width="43"
        />
      </button>
    </div>
  }
  return null
}
      
export default function Project ({ project }: { project: ProjectType }) {
  const [width] = useViewport()

  const photos = project.photos
  const length = photos.length - 1
  const [position, setPosition] = useState(0)
  const [distance, setDistance] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (width > 1000) {
      // Get the widths of all the images before the current one
      const imageWidths = Array.from(galleryRef?.current?.children ?? []).slice(0, position)
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
    </Head>
    <Wrapper>
      <div className={styles.root}>
        {/* Left arrow */}
        <button className={styles.arrow} onClick={() => setPosition((position > 0) ? (position - 1) : length)}>
          <Image
            src="/images/handwritten/Arrows Left.png"
            alt="Previous image"
            width="80"
            height="60"
          />
        </button>
        {/* Right arrow */}
        <button className={`${styles.arrow} ${styles.right}`} onClick={() => setPosition((position < length) ? (position + 1) : 0)}>
          <Image
            src="/images/handwritten/Arrows Right.png"
            alt="Next image"
            width="100"
            height="50"
          />
        </button>
        {/* Sliding image gallery */}
        <div className={styles.container}>
          <div className={styles.slider} ref={galleryRef} style={{ transform: `translateX(-${distance}px)` }}>
            {project.photos.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={project.name}
                width={photo.width}
                height={photo.height}
                className={styles.photo}
              />
            ))}
          </div>
          <Mobile project={project} />
        </div>
      </div>
    </Wrapper>
  </>
}
