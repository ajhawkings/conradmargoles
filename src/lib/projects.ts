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

export async function getProjects () {
  const folders = await fs.promises.readdir('public/images/projects')

  const projects = folders.map(async (folder) => {
    const name = folder.split(') ')[1]
    const files = await fs.promises.readdir(`public/images/projects/${folder}`)
    const photos: string[] = files.filter(file => !(file.includes('Cover') || file.includes('Mobile') || file.includes('Desktop')))
    photos.sort((a, b) => a.localeCompare(b))

    const project = {
      name: name,
      path: name.replace(/ /g, '-').toLowerCase(),
      photos: photos.map(photo => ({
        src: `/images/projects/${folder}/${photo}`,
        width: sizeOf(`public/images/projects/${folder}/${photo}`).width,
        height: sizeOf(`public/images/projects/${folder}/${photo}`).height
      })),
      cover: `/images/projects/${folder}/Cover.jpg`,
      textMobile: `/images/projects/${folder}/Mobile.png`,
      textDesktop: `/images/projects/${folder}/Desktop.png`
    }

    return project
  })

  return await Promise.all(projects)
}
