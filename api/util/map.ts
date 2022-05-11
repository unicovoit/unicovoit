import axios from "axios";
import logger from "../util/signale";

/**
 * @desc    Get the distance between two cities
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
 * @returns {Promise<{ distance: number, duration: number } | Error>} - The distance and duration between the two cities
 * @private
 */
export async function getDistance(from: string, to: string): Promise<{ distance: number, duration: number } | Error> {
    return await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: from,
            format: 'json',
        }
    }).then((response: any) => {
        const start = `${response.data[0].lon},${response.data[0].lat}`
        return axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: to,
                format: 'json',
            }
        }).then((response: any) => {
            const end = `${response.data[0].lon},${response.data[0].lat}`
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
        }).catch((e: Error) => {
            logger.error(e)
            return e
        })
    }).catch((e: Error) => {
        logger.error(e)
        return e
    })
}


/**
 * Search for a point on the map
 * @param query the search query
 * @returns {Promise<Object | Error>} The point found or an error
 */
export async function search(query: string): Promise<any> {
    return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${prepare(query)}.json`, {
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


/**
 * Prepare a string to be used in url
 * @param str the string to be prepared
 */
function prepare(str: string): string {
    return str.replace(/\s/g, '+')
}
