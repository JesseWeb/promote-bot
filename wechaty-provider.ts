import { Wechaty, log } from 'wechaty'
let wechaty: Wechaty
export function getWechaty(): Wechaty {
   log.info('getWechaty', 'getWechaty()')
   if (wechaty) {
      return wechaty
   }

   const WECHATY_NAME = process.env.WECHATY_NAME || 'Jesse_bot'
   const PUPPET_PAD_PLUS_TOKEN = process.env.PUPPET_PAD_PLUS_TOKEN||''

   wechaty = new Wechaty({
      name: WECHATY_NAME,
      puppet: 'wechaty-puppet-padplus',
      puppetOptions: {
         token: PUPPET_PAD_PLUS_TOKEN
      }
   })

   // Initialize Chatops Instance:
   return wechaty
}
