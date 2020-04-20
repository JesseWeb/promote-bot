import path from 'path'
import './config/load_env'
import { Chatops } from './chatops'
import { Wechaty } from 'wechaty';
const absPath = (relatedPath: string) => path.join(__dirname, relatedPath);
export default async (bot: Wechaty) => {
   bot.on('login', absPath('./handlers/on-login'))
   bot.on('friendship', absPath('./handlers/on-friendship.ts'))
   bot.on('scan', absPath('./handlers/on-scan.ts'))
   bot.on('room-invite', absPath('./handlers/on-room-invite.ts'))
   bot.on('room-leave', absPath('./handlers/on-room-leave.ts'))
   bot.on('message', absPath('./handlers/on-message.ts'))
   await Chatops.instance(bot)


   const heartbeat = (emoji: string) => {
      return () => Chatops.instance().heartbeat(emoji)
   }
   const ONE_HOUR = 60 * 60 * 1000
   setInterval(heartbeat('[爱心]'), ONE_HOUR)
   bot.on('login', heartbeat(`[太阳] (${bot.name()})`))
   bot.on('ready', heartbeat(`[拳头] (${bot.name()})`))
   // bot.on('logout', heartbeat(`[月亮] (${bot.name()})`))
}
