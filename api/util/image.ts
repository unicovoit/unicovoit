import sharp from 'sharp'
import logger from './signale'

/**
 * Compress an image received from the client.
 * @param image The image to compress.
 * @returns The compressed image.
 */
export async function compress(image: Buffer): Promise<Buffer> {
    return await sharp(image)
        .resize(200, 200, { fit: 'inside' })
        .toBuffer()
        .catch(err => {
            logger.error('Error while compressing image', err)
        })
}
