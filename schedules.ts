import schedule from 'node-schedule'
import { sendRP2Rooms } from './operators/sendRP2Rooms'
export const scheduleJobs = async () => {
   schedule.scheduleJob('0 50 10,16 * * ?', async () => {
      await sendRP2Rooms()
   })
   return
}
