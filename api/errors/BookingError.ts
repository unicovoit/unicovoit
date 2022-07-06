// define new error
export class BookingError extends Error {
    constructor(message: string) {
        super(message)
    }
}
