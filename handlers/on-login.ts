import {log} from 'wechaty'
import {Chatops} from '../chatops'
import {VERSION,BOT_NAME} from '../config/config'
export default async () => {
   Chatops.instance().say(`hi. it's me. future you.\n${BOT_NAME} v${VERSION}`)
   log.info('bot just got online')
}
