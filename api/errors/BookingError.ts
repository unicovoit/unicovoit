// define new error
export class BookingError extends Error {
    /**
     * Create the error
     * @param message The error message
     */
    constructor(message: string) {
        super(message)
    }
}
