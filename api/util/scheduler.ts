import logger from "./signale"

/**
 * Wrapper for the toad-scheduler library
 * @see taod-scheduler
 */
class Scheduler {
    private jobs: NodeJS.Timer[]

    /**
     * Constructor
     */
    constructor() {
        this.jobs = []
    }

    /**
     * Schedules a job
     * @param {Function} handler The function to call
     * @param {number} interval The interval in ms
     */
    public schedule(handler: () => void, interval: number): void {
        this.jobs.push(setInterval(handler, interval))
    }

    /**
     * Get status of specific job
     * @param {number} i Index of job to start
     * @returns {string} Status of job
     */
    public status(i: number): any {
        return this.jobs[i].refresh()
    }
}
