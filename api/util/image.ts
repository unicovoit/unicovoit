import sharp from 'sharp'
import logger from './signale'
import * as fs from "fs"
import * as path from "path"
import axios from "axios"
import * as crypto from "crypto"

interface DecodedImage {
    type: string,
    data: Buffer
}

/**
 * Compress an image received from the client.
 * @param image The image to compress.
 * @returns The compressed image.
 */
export async function compress(image: Buffer): Promise<Buffer> {
    return await sharp(image)
        .resize(600, 600, { fit: 'inside' })
        .toBuffer()
        .catch(err => {
            logger.error('Error while compressing image', err)
        })
}


/**
 * Convert a base64 image to a buffer.
 * @param image The image to convert.
 * @returns The buffer.
 */
export function base64ToBuffer(image: string): DecodedImage {
    let matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)

    if (matches?.length !== 3) {
        throw new Error('Invalid input string')
    }

    return {
        type: matches[1],
        data: Buffer.from(matches[2], 'base64')
    }
}


/**
 * Save an image to the disk.
 * @param image The image to save.
 * @param name The name of the image.
 * @returns The path of the image.
 */
export async function save(image: Buffer, name: string): Promise<string> {
    const p = path.join(__dirname, '..', '..', 'static', 'img', name)
    await fs.writeFileSync(p, image)
    return p
}


/**
 * Download an image from a URL and save it to the disk.
 * @param url The URL of the image.
 * @param user_id The id of the user.
 * @return The path of the image.
 */
export async function download(url: string, user_id: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const image = Buffer.from(response.data, 'binary')
    const hash = crypto.createHash('sha1')
        .update(crypto.randomBytes(20))
        .digest('hex')
    const type: RegExpMatchArray | null = response.headers['content-type'].match(/\/(.*?)$/)
    if (type) {
        const name = `${user_id}_${hash}.${type[1]}`
        await save(image, name)
        return `/img/${name}`
    } else {
        throw new Error('Invalid image type')
    }
}
