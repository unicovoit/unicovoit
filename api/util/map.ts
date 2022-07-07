import axios from "axios"
import logger from "../util/signale"
import {v4} from "uuid";
import Distance from "~/api/interfaces/Distance"
import Trip from "~/api/interfaces/Trip"

const addokDomain: string = process.env.ADDOK_DOMAIN || 'api.covoit.ozna.me'

/**
 * @desc    Get the distance between two cities
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
 * @returns {Promise<Distance>} - The distance and duration between the two cities
 * @private
 */
export async function getDistance(from: string, to: string): Promise<Distance> {
    // invert latitudes and longitudes
    let fromCoord: string[] = from.split(",")
    let toCoord: string[] = to.split(",")
    validateCoordinates(fromCoord)
    validateCoordinates(toCoord)

    // Get distance between two points
    return axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${from};${to}?access_token=${process.env.MAPBOX_TOKEN}`
    ).then((r: any) => {
        return {
            distance: parseInt(String(r.data.routes[0].distance / 1000)),
            duration: parseInt(String(r.data.routes[0].duration / 60))
        } as Distance
    })
}


/**
 * @desc    Validate submitted coordinates
 * @param   {string[]} coord the coordinates to validate
 * @throws  {Error} if the coordinates are not valid
 */
export function validateCoordinates(coord: string[]) {
    if (coord.length !== 2)
        throw new Error("Invalid coordinates")
    if (isNaN(parseFloat(coord[0])) || isNaN(parseFloat(coord[1])))
        throw new Error("Invalid coordinates")
    if (!(/\d+(\.\d+)?/.test(coord[0]) && /\d+(\.\d+)?/.test(coord[1])))
        throw new Error("Invalid coordinates")
}


/**
 * @desc    Prepare a trip for the database
 * @param   {Trip} trip The trip to prepare
 * @param   driver_id The driver id
 * @returns {Trip} The prepared trip
 * @throws  {Error} if the trip is not valid
 */
export async function prepareTrip(trip: any, driver_id: string): Promise<Trip> {
    trip.from = {
        type: "Point",
        coordinates: trip.from
    }
    trip.to = {
        type: "Point",
        coordinates: trip.to
    }
    trip.id = v4()
    trip.driver_id = driver_id

    let dist: Distance = await getDistance(trip.from.coordinates.join(','), trip.to.coordinates.join(','))
    trip.distance = dist.distance
    trip.duration = dist.duration

    let req = axios.create()
    delete req.defaults.headers.common['Authorization']
    let from = await req.get(`https://${addokDomain}/reverse`, {
        params: {
            lon: trip.from.coordinates[0],
            lat: trip.from.coordinates[1],
        }
    })
    let tmp = from.data.features[0].properties
    trip.fromName = String(tmp.name)
    trip.fromCity = String(tmp.city)

    let to = await req.get(`https://${addokDomain}/reverse`, {
        params: {
            lon: trip.to.coordinates[0],
            lat: trip.to.coordinates[1],
        }
    })
    tmp = to.data.features[0].properties
    trip.toName = String(tmp.name)
    trip.toCity = String(tmp.city)

    return trip as Trip
}
