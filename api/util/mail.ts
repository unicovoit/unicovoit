import nodemailer from 'nodemailer'
import {readFileSync} from "fs"
import * as path from "path"

import logger from './signale'
import universities from '../universities'
import Trip from '../interfaces/Trip'
import User from '../interfaces/User'
import GenericEmailData from "../interfaces/GenericEmailData"

import nuxtConfig from '../../nuxt.config'


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


const toLocaleDateString: Function = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }
    return date.toLocaleDateString(nuxtConfig.publicRuntimeConfig.LANG, options)
}


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
    await transporter.sendMail(mailOptions)
    logger.success(`Email sent to ${to}`)
}


/**
 * Send confirmation emails to driver and user
 * @param trip The trip to confirm
 * @param user The user who confirmed the trip
 * @param driver The driver
 */
export async function sendConfirmation(trip: Trip, user: User, driver: User) {
    logger.info(`Sending confirmation email to ${driver.email} and ${user.email} for trip ${trip.id}`)
    await send('generic', user.email, `Confirmation de réservation pour le trajet ${trip.fromCity} - ${trip.toCity}`, {
        title: 'Confirmation de votre trajet',
        body: `Votre réservation a été confirmé. Vous pouvez désormais joindre ${driver.nickname || driver.name} sur l'adresse suivante : ${createEmailLink(driver.email)}`,
        url: `https://unicovoit.fr/profile?bookings`,
        urlText: 'Voir mes réservations'
    } as GenericEmailData)
    await send('generic', driver.email, `Nouvelle réservation sur votre trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: `Nouvelle réservation sur votre trajet ${trip.fromCity} - ${trip.toCity}`,
        body: `${user.nickname || user.name} vient de faire une réservation sur votre trajet. Vous pouvez désormais le·la joindre sur l'adresse suivante : ${createEmailLink(user.email)}`,
        url: `https://unicovoit.fr/profile?trips`,
        urlText: 'Voir mes trajets'
    } as GenericEmailData)
}


/**
 * Send request emails to driver and user
 * @param trip The trip to request
 * @param user The user who booked the trip
 * @param driver The driver
 */
export async function sendRequest(trip: Trip, user: User, driver: User) {
    await send('generic', String(user.email), `Demande envoyée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Demande de réservation envoyée !',
        body: `Votre demande de réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} a été envoyée à ${driver.nickname || driver.name} !`,
        url: `https://unicovoit.fr/profile?trips`,
        urlText: 'Voir mes réservations',
    } as GenericEmailData)

    await send('generic', String(driver.email), `Demande de réservation pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Nouvelle demande de réservation !',
        body: `${user.nickname || user.name} a demandé un trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} !`,
        url: `https://unicovoit.fr/trips/${trip.id}`,
        urlText: 'Voir la réservation',
    } as GenericEmailData)
}


/**
 * Send an email to the user when a booking is canceled
 * @param trip The trip to cancel
 * @param user The user who canceled the trip
 * @param driver_email The address of the user
 */
export async function sendCancellation(trip: Trip, user: User, driver_email: string) {
    logger.info(`Sending cancellation email to ${driver_email} and ${user.email} for trip ${trip.id}`)
    await send('generic', String(user.email), `Réservation annulée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Réservation annulée',
        body: `Votre réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} a été annulée.`,
        url: `https://unicovoit.fr/profile?trips`,
        urlText: 'Voir mes réservations',
    } as GenericEmailData)

    await send('generic', String(driver_email), `Réservation annulée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Réservation annulée',
        body: `${user.nickname || user.name} a annulé sa réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} !`,
        url: `https://unicovoit.fr/profile?trips`,
        urlText: 'Voir mes trajets',
    } as GenericEmailData)
}


/**
 * Create an html email link
 * @param email The email address
 * @return The html link
 */
export function createEmailLink(email: string) {
    return `<a href="mailto:${email}">${email}</a>`
}


/**
 * Verify if the email is one the supported universities
 * @param email
 * @returns {boolean} True if the email is valid, false otherwise
 */
export const verifyEmail: Function = (email: string): boolean => {

    return universities.some(u => u.format.test(email))
}
