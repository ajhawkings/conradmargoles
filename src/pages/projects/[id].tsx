import { ProjectType, getProjects } from '@lib/projects'
import { useEffect, useRef, useState } from 'react'
import styles from '@styles/Project.module.css'
import useViewport from '@lib/useViewport'

import Head from 'next/head'
import Image from 'next/image'
import Wrapper from '@components/wrapper'

export function getStaticPaths () {
  const projects = getProjects()
  const paths = projects.map((project) => ({
    params: { id: project.path },
  }))
  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps ({ params }: { params: { id: string } }) {
  const projects = getProjects()
  const project = projects.find((project) => project.path === params.id) || { name: 'Not Found' }
  return {
    props: {
      project
    }
  }
}
      
export default function Project ({ project }: { project: ProjectType }) {
  const [width] = useViewport()
  const photos = project.photos
  if (width < 1000) { 
    // sort by last number in filename
    photos.sort((a, b) => Number(a.src.slice(a.src.lastIndexOf(' ') + 1).split('.')[0]) - Number(b.src.slice(b.src.lastIndexOf(' ') + 1).split('.')[0]))
  } else {
    // sort alphabetically
    photos.sort((a, b) => a.src.localeCompare(b.src))
  }

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
  
  const length = photos.length - 1

  return <>
    <Head>
      <title>Project | Conrad Margoles Architects</title>
    </Head>
    <Wrapper>
      <div className={styles.root}>
        <button className={styles.arrow} onClick={() => setPosition((position > 0) ? (position - 1) : length)}>
          <Image
            src="/images/handwritten/Arrows Left Black.png"
            alt="Previous image"
            width="50"
            height="50"
          />
        </button>
        <div className={styles.container}>
          <div className={styles.slider} ref={galleryRef} style={{ transform: `translateX(-${distance}px)` }}>
            {project.photos.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={project.name}
                width={photo.width}
                height={photo.height}
                className={(photo.width || 0) > 1500 ? styles.landscape : styles.portrait}
              />
            ))}
          </div>
        </div>
        <button className={`${styles.arrow} ${styles.right}`} onClick={() => setPosition((position < length) ? (position + 1) : 0)}>
          <Image
            src="/images/handwritten/Arrows Right Black.png"
            alt="Next image"
            width="50"
            height="50"
          />
        </button>
      </div>
    </Wrapper>
  </>
}
