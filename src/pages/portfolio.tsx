import { ProjectType, getProjects } from '@lib/projects'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Wrapper from '@components/wrapper'

import styles from '@styles/Portfolio.module.css'

export async function getStaticProps () {
  const projects = await getProjects()

  return {
    props: {
      projects
    }
  }
}

export default function Portfolio (props: { projects: ProjectType[] }) {
  return <>
    <Head>
      <title>Portfolio | Conrad Margoles Architects</title>
    </Head>
    <Wrapper>
      {props.projects.map((project: ProjectType) => (
        <Link href={`/projects/${project.path}`} className={styles.project} key={project.name}>
          <Image
            src={project.cover}
            alt={project.name}
            width="2000"
            height="1335"
            className={styles.image}
          />
          <Image
            src={project.textDesktop}
            alt={project.name}
            width="500"
            height="1335"
            className={styles.text}
          />
        </Link>
      ))}
    </Wrapper>
  </>
}
