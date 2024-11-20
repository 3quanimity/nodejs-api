import { readFile, writeFile } from 'node:fs/promises'

const path = 'db/users.json'

export async function getUsers(hidePass = false) {
    const jsonData = await readFile(path, 'utf-8')

    if(hidePass){
        return JSON.parse(jsonData).map(obj => ({...obj, pass: "******"}))
    } else {
        return JSON.parse(jsonData)
    }
}

export async function addUser({ email, pass }) {
    const newUser = { email, pass, isAdmin: false, id: Math.random().toString(16).slice(2) };
    const users = await getUsers(); 
    users.unshift(newUser); 
    await writeFile(path, JSON.stringify(users)); 
    return newUser;
}

export async function deleteUserById(id) {
    const usersList = await getUsers()
    const filteredUsers = usersList.filter(user => user.id != id)
    await writeFile(path, JSON.stringify(filteredUsers))
    return filteredUsers
}

export async function checkUser(email, pass) {
    const usersList = await getUsers()
    const foundUser = usersList.filter(user => user.email == email && user.pass == pass)
    return foundUser
}