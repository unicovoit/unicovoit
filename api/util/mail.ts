import nodemailer from 'nodemailer'
import {readFileSync} from "fs";
import * as path from "path";

export class Mail {
    private transporter: any
    private mailOptions: any
    private bodyTemplate: string = ""

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
        let data = readFileSync(path.join(__dirname, '..', 'mail', 'request_sent.html'), 'utf8')
        this.bodyTemplate = String(data)
    }

    sendRequest(to: string, data: any) {
        this.mailOptions = {
            from: "UniCovoit",
            to,
            subject: `Demande envoyée pour le trajet ${data.fromCity} - ${data.toCity}!`,
            html: this.bodyTemplate.replace(/\$\{([^}]+)}/g, (match, key) => data[key])
        }
    }
}

export const verifyEmail: Function = (email: string): boolean => {
    const regex = [
        /^[A-Za-z\-]+\.e\d{7}@etud\.univ-ubs\.fr$/
    ]
    return regex.some(r => r.test(email))
}
