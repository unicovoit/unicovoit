import nodemailer from 'nodemailer'
import {readFileSync} from "fs"
import * as path from "path"

import logger from './signale'
import universities from '../universities'
import Trip from '../interfaces/Trip'
import User from '../interfaces/User'
import GenericEmailData from "../interfaces/GenericEmailData"
import Contact from "../interfaces/Contact"

import nuxtConfig from '../../nuxt.config'


const logos = {
    snapchat: `<img style="width: 20px" alt="snapchat" src="https://unicovoit.fr/icons/snapchat.png">`,
    instagram: `<img style="width: 20px" alt="instagram" src="https://unicovoit.fr/icons/instagram.png">`,
    facebook: `<img style="width: 20px" alt="facebook" src="https://unicovoit.fr/icons/facebook.png">`,
    email: `<img style="width: 20px" alt="email" src="https://unicovoit.fr/icons/email.png">`,
    phone: `<img style="width: 20px" alt="phone" src="https://unicovoit.fr/icons/phone.png">`
}


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, //use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const readTemplate = (name: string) => readFileSync(path.join(__dirname, '..', 'mail', `${name}.html`), 'utf8')
const templates: object = {
    generic: String(readTemplate('generic')),
    confirm_address: String(readTemplate('confirm_address')),
}


const toLocaleDateString: Function = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }
    return date.toLocaleDateString(nuxtConfig.publicRuntimeConfig.LANGUAGE, options)
}


/**
 * Test the connection to the email server
 */
export function test(fnct?: Function | undefined) {
    transporter.verify(error => {
        if (error)
            logger.error(error)
        else
            logger.success('Mail server connected')
        if (fnct)
            fnct()
    })
}

/**
 * Send an email
 * @param template The template to use
 * @param to The email address of the user
 * @param subject The subject of the email
 * @param data The data to use in the mail
 */
export async function send(template: string, to: string, subject: string, data: {code: string} | GenericEmailData) {
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
 * Send booking confirmation emails to driver and user when driver has auto-book disabled
 * @param trip The trip to confirm
 * @param user The passenger
 * @param driver The driver who confirmed the trip
 */
export async function sendConfirmation(trip: Trip, user: User, driver: User) {
    await send('generic', String(user.contact?.email), `Confirmation de réservation pour le trajet ${trip.fromCity} - ${trip.toCity}`, {
        title: `Vous partez pour ${trip.toCity} !`,
        body: `${driver.nickname || driver.name} a confirmé votre réservation.
            <br>Vous pouvez désormais le·la joindre directement :<br>
            ${createContactBox(<Contact> driver.contact)}`,
        url: `https://unicovoit.fr/trip/${trip.id}`,
        urlText: 'Voir le trajet'
    } as GenericEmailData)
    await send('generic', String(driver.contact?.email), `Nouvelle réservation sur votre trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: `${user.nickname || user.name} part avec vous !`,
        body: `Vous avez confirmé ${user.nickname || user.name} comme passager sur votre trajet ${trip.fromCity} - ${trip.toCity}
            <br>Vous pouvez désormais le·la joindre directement :<br>
            ${createContactBox(<Contact> user.contact)}`,
        url: `https://unicovoit.fr/trips/${trip.id}`,
        urlText: 'Voir mon trajet'
    } as GenericEmailData)
}


/**
 * Send booking confirmation emails to driver and user when driver has auto-book enabled
 * @param trip The trip to confirm
 * @param user The user who confirmed the trip
 * @param driver The driver
 */
export async function sendAutoBookConfirmation(trip: Trip, user: User, driver: User) {
    await send('generic', String(user.contact?.email), `Confirmation de réservation pour le trajet ${trip.fromCity} - ${trip.toCity}`, {
        title: `Vous partez pour ${trip.toCity} !`,
        body: `Votre trajet avec ${driver.nickname || driver.name} pour ${trip.toCity} est réservé !
            <br>Vous pouvez désormais le·la joindre directement :<br>
            ${createContactBox(<Contact> driver.contact)}`,
        url: `https://unicovoit.fr/trip/${trip.id}`,
        urlText: 'Voir le trajet'
    } as GenericEmailData)
    await send('generic', String(driver.contact?.email), `Nouvelle réservation sur votre trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: `${user.nickname || user.name} part avec vous !`,
        body: `${user.nickname || user.name} a réservé une place sur votre trajet ${trip.fromCity} - ${trip.toCity}
            <br>Vous pouvez désormais le·la joindre directement :<br>
            ${createContactBox(<Contact> user.contact)}`,
        url: `https://unicovoit.fr/trips/${trip.id}`,
        urlText: 'Voir mon trajet'
    } as GenericEmailData)
}


/**
 * Send booking request emails to driver and user
 * @param trip The trip to request
 * @param user The user who booked the trip
 * @param driver The driver
 */
export async function sendRequest(trip: Trip, user: User, driver: User) {
    await send('generic', String(user.contact?.email), `Demande envoyée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Demande de réservation envoyée !',
        body: `Votre demande de réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} a été envoyée à ${driver.nickname || driver.name} !`,
        url: `https://unicovoit.fr/trips/${trip.id}`,
        urlText: 'Voir le trajet',
    } as GenericEmailData)

    await send('generic', String(driver.contact?.email), `Demande de réservation pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Nouvelle demande de réservation !',
        body: `${user.nickname || user.name} voudrait réserver une place sur votre trajet ${trip.fromCity} - ${trip.toCity} du ${toLocaleDateString(trip.departure_time)} !`,
        url: `https://unicovoit.fr/trips/${trip.id}`,
        urlText: 'Voir le trajet',
    } as GenericEmailData)
}


/**
 * Send an email to the user when a booking is canceled
 * @param trip The trip to cancel
 * @param user The user who canceled the trip
 * @param driver_email The address of the driver
 */
export async function sendCancellation(trip: Trip, user: User, driver_email: string) {
    await send('generic', String(user.contact?.email), `Réservation annulée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Réservation annulée',
        body: `Votre réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} a été annulée.`,
        url: `https://unicovoit.fr/trips?from=${trip.from.coordinates.join(',')}&to=${trip.to.coordinates.join(',')}&date=${trip.departure_time.getFullYear()}-${trip.departure_time.getMonth()}-${trip.departure_time.getDay()}`,
        urlText: 'Trouver un trajet similaire',
    } as GenericEmailData)

    await send('generic', driver_email, `Réservation annulée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
        title: 'Réservation annulée',
        body: `${user.nickname || user.name} a annulé sa réservation pour le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} !`,
        url: `https://unicovoit.fr/activity?trips`,
        urlText: 'Voir mes trajets',
    } as GenericEmailData)
}


/**
 * Send an email to the user when a trip is canceled
 * @param trip The trip to cancel
 * @param users The array of users who booked the trip
 * @param driver The driver who canceled the trip
 */
export async function sendTripCancellation(trip: Trip, users: User[], driver: User) {
    await send('generic', String(driver.contact?.email), `Trajet ${trip.fromCity} - ${trip.toCity} annulé !`, {
        title: 'Trajet annulé',
        body: `Vous venez d'annuler votre trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)}. <br>
            Tous les utilisateurs ayant réservé une place ont été informés.`,
        url: `https://unicovoit.fr/trips/add`,
        urlText: 'Ajouter un trajet',
    } as GenericEmailData)

    for (const user of users) {
        await send('generic', String(user.contact?.email), `Réservation annulée pour le trajet ${trip.fromCity} - ${trip.toCity} !`, {
            title: 'Trajet annulé',
            body: `Le trajet ${trip.fromCity} - ${trip.toCity}, le ${toLocaleDateString(trip.departure_time)} a été annulée. <br>
                Réservez dès maintenant un nouveau trajet !`,
            url: `https://unicovoit.fr/trips?from=${trip.from.coordinates.join(',')}&to=${trip.to.coordinates.join(',')}&date=${trip.departure_time.getFullYear()}-${trip.departure_time.getMonth()}-${trip.departure_time.getDay()}`,
            urlText: 'Trouver un trajet similaire',
        } as GenericEmailData)
    }
}


/**
 * Create the container with contact details for a specified user
 * @param contact The user's contact details
 */
function createContactBox(contact: Contact): string {
    let contactBox = `<div style="background-color: #4A6DD919; padding:1rem; border-radius: 2rem; max-width: 35rem; min-width: 15rem; width: 30%; margin: 2rem">`
    for (let [key, logo] of Object.entries(logos)) {
        if (contact[key]) {
            contactBox += `<div style="display: flex; align-items: center; justify-content: left;margin-top: 5px">
                            ${logo}&nbsp;&nbsp;${contact[key]}<br>
                          </div>`
        }
    }
    return contactBox + '</div>'
}


/**
 * Verify if the email is one the supported universities
 * @param email The email address to verify
 * @returns {boolean} True if the email is valid, false otherwise
 */
export const verifyEmail: Function = (email: string): string | undefined => {
    return universities.find(u => u.format.test(email))?.name
}
