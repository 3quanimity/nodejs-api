import { createServer } from 'node:http'
import { readUsers, createUser, deleteUser, checkUserLogin } from './api/usersApi.js'

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Allow-Control-Allow-Origin', '*')
    res.setHeader('Allow-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization')
    res.setHeader('Allow-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

    const url = new URL(req.url, `http://${req.headers.host}`)
    const method = req.method
    let response = JSON.stringify([])

    switch (url.pathname) {
        case "/users":
            if(method == "GET") {
                response = await readUsers()
            }
            if(method == "POST") {
                response = await createUser(req)
            }
            if(method == "DELETE") {
                response = await deleteUser(url.searchParams.get('id'))
            }
        break

        case "/checkUser":
            response = await checkUserLogin(url.searchParams.get('email'), url.searchParams.get('pass'))

        break

        case "/projects":

        break

        default: 
            response = null
        break
    }

    res.write(JSON.stringify(response))
    res.end()
}).listen(3002)