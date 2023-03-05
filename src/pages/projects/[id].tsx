import { ProjectType, getProjects } from '@lib/projects'
import { useLayoutEffect, useRef, useState } from 'react'
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

export function getStaticProps ( { params }: { params: { id: string } } ) {
  const projects = getProjects()
  const project = projects.find((project) => project.path === params.id) || { name: 'Not Found' }
  return {
    props: {
      project
    }
  }
}
      
// @refresh reset

export default function Project ( { project }: { project: ProjectType } ) {
  const [position, setPosition] = useState(0)

  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth)
    }
  }, [])
  console.log(width)
  
  return (
    <Wrapper>
      <div className={styles.root}>
        {position !== 0 &&
          <button className={styles.arrow} onClick={() => setPosition(Math.max((position - 800), 0))}>
            <Image
              src="/images/handwritten/Arrows Left Black.png"
              alt="Previous image"
              width="50"
              height="50"
            />
          </button>
        }
        <div className={styles.container}>
          <div className={styles.slider} ref={ref} style={{ transform: `translateX(-${position}px)` }}>
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
        {position !== width &&
          <button className={`${styles.arrow} ${styles.right}`} onClick={() => setPosition(Math.min((position + 800), width))}>
            <Image
              src="/images/handwritten/Arrows Right Black.png"
              alt="Next image"
              width="50"
              height="50"
            />
          </button>
        }
      </div>
    </Wrapper>
  )
}
