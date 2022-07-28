import nodemailer from 'nodemailer'
import {readFileSync} from "fs"
import * as path from "path"

import logger from './signale'
import universities from '../universities'


const config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, //use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
}
const transporter = nodemailer.createTransport(config)

const readTemplate = (name: string) => readFileSync(path.join(__dirname, '..', 'mail', `${name}.html`), 'utf8')
const templates: any = {}
templates.generic = String(readTemplate('generic'))
templates.confirm_address = String(readTemplate('confirm_address'))


/**
 * Test the connection to the email server
 */
export function test() {
    transporter.verify(error => {
        if (error)
            logger.error(error)
        else
            logger.success('Mail server connected')
    })
}

/**
 * Send an email
 * @param template The template to use
 * @param to The email address of the user
 * @param subject The subject of the email
 * @param data The data to use in the mail
 */
export async function send(template: string, to: string, subject: string, data: any) {
    const mailOptions = {
        from: {
            name: "UniCovoit",
            address: "no-reply@unicovoit.fr"
        },
        to,
        subject,
        html: templates[template].replace(/\$\{([^}]+)}/g, (match, key) => data[key])
    }
    return await transporter.sendMail(mailOptions)
}


/**
 * Verify if the email is one the supported universities
 * @param email
 * @returns {boolean} True if the email is valid, false otherwise
 */
export const verifyEmail: Function = (email: string): boolean => {
    return universities.some(u => u.format.test(email))
}
