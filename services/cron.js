import cron from 'node-cron'
import { runCron } from './scrapper'

cron.schedule("1 * * * *", () => {
    console.log('cron is running')
    runCron()
});