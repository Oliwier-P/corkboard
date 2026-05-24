import {Server} from '@hocuspocus/server'
import {Database} from '@hocuspocus/extension-database'

import 'dotenv/config'

const apiUrl = process.env.API_URL

const port = parseInt(process.env.PORT) || 3000

const server = new Server({
    port: port,

    async onAuthenticate({token, documentName}) {
        const res = await fetch(`${apiUrl}/auth/verify_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({document_name: documentName}),
        })

        if (!res.ok) {
            const body = await res.text()
            console.error(body)
            throw new Error('Unauthorized')
        }

        const {user} = await res.json()
        return {user}
    },

    extensions: [
        new Database({
            async fetch({documentName}) {
                const res = await fetch(
                    `${apiUrl}/documents/${documentName}/ydoc`,
                    {headers: {'X-Internal-Token': process.env.INTERNAL_TOKEN}}
                )
                if (res.status === 204 || !res.ok) return null
                const buffer = await res.arrayBuffer()
                if (buffer.byteLength === 0) return null

                return new Uint8Array(buffer)
            },

            async store({documentName, state}) {
                await fetch(
                    `${apiUrl}/documents/${documentName}/ydoc`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/octet-stream',
                            'X-Internal-Token': process.env.INTERNAL_TOKEN,
                        },
                        body: new Uint8Array(state),
                    }
                )
            },
        }),
    ],
})

server.listen()