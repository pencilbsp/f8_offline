import { Elysia } from 'elysia'
import { readFileSync } from 'node:fs'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .get('/', () => "Hello, i am Pen")
    .get('/api/posts', async ({ query }) => {
        const text = readFileSync('posts.json', 'utf8')
        const allPost = JSON.parse(text)

        const page = query.page || 1
        const limit = query.limit || 6

        const start = (page - 1) * limit
        const end = page * limit
        const data = allPost.slice(start, end)

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
    .listen(8080)

console.log(`🦊 Elysia is running at on port ${app.server?.port}...`)