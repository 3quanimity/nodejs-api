import { json } from 'node:stream/consumers'
import { getUsers } from '../entities/users.js'

export async function readUsers() {
    const users = await getUsers(true)
    return users
}
