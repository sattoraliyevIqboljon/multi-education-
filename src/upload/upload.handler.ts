import fs from 'fs';
import path from 'path';
import { BaseResponse } from '../common/error/base.response';

export async function uploadFileHandler(req, reply) {
    const files = req.raw.files;
    if (!files) throw BaseResponse.InvalidImg();

    const file = files['file'];
    if (!file) throw BaseResponse.InvalidImg();

    const name = '/images/file' + '-' + file.md5 + path.extname(file.name)

    const direction = path.join(__dirname, '../..', '/uploads');

    const wstream = fs.createWriteStream(direction + name);
    wstream.write(file.data)

    wstream.end();

    reply.success(name);
    console.log('File succesfully uploaded!');
}
