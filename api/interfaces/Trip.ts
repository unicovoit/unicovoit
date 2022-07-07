export default interface Trip {
    _id?: string
    id: string,
    driver_id: string,
    driver_name?: string,
    driver_picture?: string,
    from: {
        type: string,
        coordinates: number[]
    },
    fromName: string,
    fromCity: string,
    to: {
        type: string,
        coordinates: number[]
    },
    toName: string,
    toCity: string,
    departure_time: Date,
    price: number,
    description?: string,
    places: number,
    distance: number,
    duration: number,
    show: boolean,
    created_at?: Date,
    updated_at?: Date
}
