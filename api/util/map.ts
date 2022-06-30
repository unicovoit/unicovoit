import axios from "axios"
import logger from "../util/signale"
import xss from "xss"
import {v4} from "uuid";

const addokDomain: string = process.env.ADDOK_DOMAIN || 'api.covoit.ozna.me'

/**
 * @desc    Get the distance between two cities
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
 * @returns {Promise<{ distance: number, duration: number } | Error>} - The distance and duration between the two cities
 * @private
 */
export async function getDistance(from: string, to: string): Promise<{ distance: number, duration: number } | Error> {
    // invert latitudes and longitudes
    let fromCoord: string[] = from.split(",");
    let toCoord: string[] = to.split(",");
    const start = `${fromCoord[1]},${fromCoord[0]}`
    const end = `${toCoord[1]},${toCoord[0]}`

    // Get distance between two points
    return axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=${process.env.MAPBOX_TOKEN}`
    ).then((r: any) => {
        return {
            distance: parseInt(String(r.data.routes[0].distance / 1000)),
            duration: parseInt(String(r.data.routes[0].duration / 60))
        }
    }).catch((e: Error) => {
        logger.error(e)
        return e
    })
}


/**
 * @desc    Decode coordinates from base64
 * @param   {string} coords - The coordinates in base64
 * @returns {number[]} - The coordinates in array
 */
export function decodeCoords(coords: string): number[] {
    return String(Buffer.from(String(coords), 'base64')).split(',').map(co => parseFloat(co))
}


export async function prepareTrip(trip: any): Promise<any> {
    trip.from = decodeCoords(trip.from)
    trip.to = decodeCoords(trip.to)
    trip.id = v4()

    let dist: {distance: number, duration: number} | Error = await getDistance(trip.from.join(','), trip.to.join(','))
    if (dist instanceof Error) {
        return new Error('Error while getting distance')
    }
    trip.distance = dist.distance
    trip.duration = dist.duration

    let req = axios.create()
    delete req.defaults.headers.common['Authorization']
    let from = await req.get(`https://${addokDomain}/reverse`, {
        params: {
            lat: trip.from[0],
            lon: trip.from[1],
        }
    })
    let tmp = from.data.features[0].properties
    trip.fromName = `${tmp.name}, ${tmp.city}`
    trip.fromCity = tmp.city

    let to = await req.get(`https://${addokDomain}/reverse`, {
        params: {
            lat: trip.to[0],
            lon: trip.to[1],
        }
    })
    tmp = to.data.features[0].properties
    trip.toName = `${tmp.name}, ${tmp.city}`
    trip.toCity = tmp.city

    return trip
}
