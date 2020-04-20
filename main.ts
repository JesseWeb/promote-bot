import botStarter from './bot-starter'
import { getWechaty } from './wechaty-provider'

let bot = getWechaty()
Promise.all([
   bot.start(),
   botStarter(bot),
]).catch((error) => {
   console.log(123123123)
   throw error
})