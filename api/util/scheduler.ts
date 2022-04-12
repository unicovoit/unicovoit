import {SimpleIntervalJob, Task, ToadScheduler} from "toad-scheduler"
import logger from "./signale"

/**
 * Wrapper for the toad-scheduler library
 */
class Scheduler {
    private scheduler: ToadScheduler
    private jobs: SimpleIntervalJob[] = []

    /**
     * Constructor
     */
    constructor() {
        this.scheduler = new ToadScheduler()
    }

    /**
     * Schedules a job
     * @param job Job to schedule
     */
    public schedule(job: SimpleIntervalJob): void {
        this.scheduler.addSimpleIntervalJob(job)
    }

    /**
     * Schedules a job
     * @param func Function to execute
     * @param sec Interval in milliseconds
     */
    public scheduleTask(func: () => void, sec: number): number {
        // convert seconds to days, hours, minutes, seconds
        let seconds = Math.floor(sec % 60)
        let minutes = Math.floor((sec % 3600) / 60)
        let hours = Math.floor((sec % (3600 * 24)) / 3600)
        let days = Math.floor(sec / (3600 * 24))

        let int: Object = {
            days,
            hours,
            minutes,
            seconds,
            runImmediately: true
        }

        let task: Task = new Task(`task_${this.jobs.length}`, func)
        let job = new SimpleIntervalJob(int, task)
        this.schedule(job)
        this.jobs.push(job)

        logger.success(`Task scheduled`)
        return this.jobs.length - 1
    }

    /**
     * Starts all or specific job
     * @param i Optional index of job to start
     */
    public start(i?: number): void {
        if (i) {
            this.jobs[i].start()
        } else {
            for (const job of this.jobs) {
                job.start()
            }
            logger.success("All jobs started or restarted")
        }
    }

    /**
     * Stops all or specific job
     * @param i Optional index of job to start
     */
    public stop(i?: number): void {
        if (i) {
            this.jobs[i].start()
        } else {
            for (const job of this.jobs) {
                job.start()
            }
            logger.success("All jobs stopped")
        }
    }

    /**
     * Get status of specific job
     * @param i Index of job to start
     */
    public status(i: number): string {
        return this.jobs[i].getStatus()
    }
}


export default new Scheduler()
