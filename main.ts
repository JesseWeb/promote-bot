import botStarter from './bot-starter'
import { getWechaty } from './wechaty-provider'
import connection from './connection';
import { scheduleJobs } from './schedules';
let bot = getWechaty()
Promise.all([
   bot.start(),
   connection(),
   botStarter(bot),
   scheduleJobs()
]).then(async () => {
   
}
).catch((error) => {
   throw error
})