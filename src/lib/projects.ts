import fs from 'fs'
import sizeOf from 'image-size'

export interface ProjectType {
  name: string
  path: string
  cover: string
  textMobile: string
  textDesktop: string
  photos: Photo[]
}

interface Photo {
  src: string
  width?: number
  height?: number
}

export function getProjects () {
  const folders = fs.readdirSync('public/images/projects')

  const projects: ProjectType[] = []

  folders.forEach(folder => {
    const name = folder.split(') ')[1]
    const files = fs.readdirSync(`public/images/projects/${folder}`)
    const photos = files.filter(file => !file.includes('Cover') && !file.includes('Text'))
    
    const project = {
      name: name,
      path: name.replace(/ /g, '-').toLowerCase(),
      photos: photos.map(photo => { return {
        src: `/images/projects/${folder}/${photo}`,
        width: sizeOf(`public/images/projects/${folder}/${photo}`).width,
        height: sizeOf(`public/images/projects/${folder}/${photo}`).height
      }}),
      cover: `/images/projects/${folder}/Cover.jpg`,
      textMobile: `/images/projects/${folder}/TextMobile.png`,
      textDesktop: `/images/projects/${folder}/TextDesktop.png`
    }

    projects.push(project)
  })

  return projects
}
