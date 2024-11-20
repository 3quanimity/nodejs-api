import { json } from 'node:stream/consumers'
import { getProjects, addProject, deleteProjectById } from '../entities/projects.js'

export async function readProjects() {
    const users = await getProjects(true)
    return users
}

export async function createProject(req) {
    const userToAdd = await json(req)
    const newProject = await addProject(userToAdd)
    return newProject
}

export async function deleteProject(id) {
    const users = await deleteProjectById(id)
    return users
}

