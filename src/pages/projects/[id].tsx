import { ProjectType, getProjects } from '@lib/projects'
import { useEffect, useRef, useState } from 'react'
import styles from '@styles/Project.module.css'

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
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get the widths of all the images before the current one
    const imageWidths = Array.from(galleryRef?.current?.children ?? []).slice(0, position)
    // Sum the widths of all the images before the current one
    let sum = imageWidths.reduce((sum, element) => (sum + element.clientWidth), 0)
    // Add the margin between images
    sum += (position * 16)
    // Set the width of the slider
    setWidth(sum)
  }, [galleryRef, position])
  
  const length = project.photos.length - 1

  return (
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
          <div className={styles.slider} ref={galleryRef} style={{ transform: `translateX(-${width}px)` }}>
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
  )
}
