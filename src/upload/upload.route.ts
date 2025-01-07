import fp from "fastify-plugin"
import { uploadFileHandler } from './upload.handler'

async function upload(server, options) {
    server.post('/upload', uploadFileHandler)

}

export const uploadPlugin = fp(upload);
