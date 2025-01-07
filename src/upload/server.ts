import fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifyFileUpload from 'fastify-file-upload';
import { ENV } from '../common/config/config';
import { replyPlugin } from '../common/decorator/reply';
import { uploadPlugin } from './upload.route';


const server = fastify({ logger: true });

server.register(fastifyStatic, {
    root: path.join(__dirname, '../..', 'uploads'),
    prefix: '/public/uploads'
})


server.register(replyPlugin)
server.register(fastifyFileUpload);
server.register(uploadPlugin)


async function start() {
    try {
        server.listen({ port: ENV.UPLOAD_PORT, host: ENV.HOST })
        console.log('Server Uploads running... PORT:' + ENV.UPLOAD_PORT)
    } catch (e) {
        console.log("Upload file Server error...")
        console.log(e)
    }
}

start();
