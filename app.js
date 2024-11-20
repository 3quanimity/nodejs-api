import { createServer } from 'node:http'

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Allow-Control-Allow-Origin', '*')
    res.setHeader('Allow-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization')
    res.setHeader('Allow-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log("url: ", url)
}).listen(3002)