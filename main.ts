import botStarter from './bot-starter'
import { getWechaty } from './wechaty-provider'
import { log } from 'wechaty'

let bot = getWechaty()
log.error('hahaha')
Promise.all([
   bot.start(),
   botStarter(bot)
])