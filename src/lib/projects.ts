import fs from 'fs'

export interface ProjectType {
  name: string
  path: string
  cover: string
  textMobile: string
  textDesktop: string
  photos: string[]
}

export async function getProjects () {
  const folders = await fs.promises.readdir('public/images/projects')

  const projects = folders.map(async (folder) => {
    const name = folder.split(') ')[1]
    const files = await fs.promises.readdir(`public/images/projects/${folder}`)
    const photos: string[] = files.filter(file => !(file.includes('Cover') || file.includes('Mobile') || file.includes('Desktop') || file.includes('nextImageExportOptimizer')))
    photos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    const project = {
      name: name,
      path: name.replace(/ /g, '-').toLowerCase(),
      photos: photos.map(photo => `/images/projects/${folder}/${photo}`),
      cover: `/images/projects/${folder}/Cover.jpg`,
      textMobile: `/images/projects/${folder}/Mobile.png`,
      textDesktop: `/images/projects/${folder}/Desktop.png`
    }

    return project
  })

  return await Promise.all(projects)
}
