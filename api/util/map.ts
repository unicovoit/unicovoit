import axios from "axios";
import logger from "../util/signale";
import xss from "xss";

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


/**
 * Search for a point on the map
 * @param query the search query
 * @returns {Promise<Object | Error>} The point found or an error
 */
export async function search(query: string): Promise<any> {
    let prepared: string = xss(query)
    logger.info(`Searching for ${prepared}`)
    return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${prepared}.json`, {
        params: {
            access_token: process.env.MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
            language: 'fr',
            country: 'fr',
            types: 'address,poi'
        }
    }).then((response: any) => {
        return response.data.features
    })
}
