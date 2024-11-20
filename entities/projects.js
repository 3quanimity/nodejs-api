import { readFile, writeFile } from 'node:fs/promises'

const path = 'db/projects.json'

export async function getProjects(hidePass = false) {
    const jsonData = await readFile(path, 'utf-8')
    return JSON.parse(jsonData)
}

export async function addProject( project ) {
    const newProject = { ...project, id: Math.random().toString(16).slice(2) };
    const projects = await getProjects(); 
    projects.unshift(newProject); 
    await writeFile(path, JSON.stringify(projects)); 
    return newProject;
}

export async function deleteProjectById(id) {
    const projectsList = await getProjects()
    const filteredProjects = projectsList.filter(project => project.id != id)
    await writeFile(path, JSON.stringify(filteredProjects))
    return filteredProjects
}
