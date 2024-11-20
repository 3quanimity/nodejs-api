import { readFile, writeFile } from 'node:fs/promises'

const path = 'db/users.json'

export async function getUsers(hidePass = false) {
    const jsonData = await readFile(path, 'utf-8')

    if(hidePass){
        return JSON.parse(jsonData).map(obj => [{...obj, pass: "******"}])
    } else {
        return JSON.parse(jsonData)
    }
}