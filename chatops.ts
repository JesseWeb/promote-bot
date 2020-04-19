

import { Wechaty, log, Message, Contact, UrlLink, MiniProgram, Room } from 'wechaty';
import { DelayQueueExecutor, DelayQueueExector } from 'rx-queue'
import { TEST_ROOM_ID, HEARTBEAT_ROOM_ID } from './config/config'
export class Chatops {
   public static bot: Chatops
   private delayQueueExecutor: DelayQueueExector
   public repeatMode: boolean = false
   public static instance(
      wechaty?: Wechaty,
   ) {
      if (!this.bot) {
         if (!wechaty) {
            throw new Error('instance need a Wechaty instance to initialize')
         }
         this.bot = new Chatops(wechaty)
      }
      return this.bot
   }
   private constructor(
      private wechaty: Wechaty
   ) {
      this.delayQueueExecutor = new DelayQueueExecutor(5 * 1000)
   }
   public async sayUnbind(contact: Contact) {
      await this.queue(async () => {
         await contact.say('您还未绑定账号\n请发送 #bd+“您的绑定码”\n如：\n#bd12345')
      }, `friendship confirm with` + contact.name())
   }
   public async sayWelcomeBack(contact: Contact) {
      await this.queue(async () => {
         await contact.say('您还未绑定账号\n请发送 #bd+“您的绑定码”\n如：\n#bd12345')
      }, `friendship confirm with` + contact.name())
   }
   public async msgRoomTopic(msg: Message) {
      const result = await msg.room()?.topic()
      return result
   }
   public isBindUserId(contact: Contact) {
      if (contact.weixin()) {
         return false
      } else {
         return false
      }
   }
   public logonoff(): boolean {
      return this.wechaty.logonoff()
   }
   public async say2Room(roomId: string,
      info: string | Message | UrlLink | MiniProgram): Promise<void> {
      if (!this.wechaty.logonoff()) {
         log.error('chat', 'say2Room() bot is offline')
         return
      }
      const room = await this.wechaty.Room.load(roomId)
      if (!room) {
         log.error('chat', 'say2Room() no bot found in Room %s', roomId)
         return
      }
      if (typeof info === 'string') {
         await room.say(info)
      } else if (info instanceof Message) {
         switch (info.type()) {
            case Message.Type.Text:
               await room.say(`${info}`)
               break
            case Message.Type.Image:
               const image = await info.toFileBox()
               room.say(image)
               break
            case Message.Type.Url:
               const urlLink = await info.toUrlLink()
               await room.say(urlLink)
               break
            default:
               const typeName = Message.Type[info.type()]
               await room.say(`message type: ${typeName}`)
               break
         }
      } else if (info instanceof UrlLink) {
         await room.say(info)
      }
   }
   public async repeaterFromUser(msg: Message, roomId?: string, userId?: string): Promise<void> {

      const contact = msg.from()
      const msgType = msg.type()
      const room = msg.room()
      if (msg.self() && msg.text() == '复读机模式') {
         await room?.say('复读机模式开启')
         this.repeatMode = true
      }
      if (msg.self() && msg.text() == '正常模式') {
         await room?.say('正常模式开启')
         this.repeatMode = false
      }
      if (!contact) {
         // do nothing! 
         log.error(`chat`, 'repeater() no bot found contact')
         return
      }
      if (!room) {
         log.error(`chat`, 'repeater() no bot found room')
         return
         // do nothing
      }
      console.log(`contact?.weixin():${contact?.weixin()}`)
      console.log(`room?.id:${room?.id}`)
      if (contact?.weixin() == userId && roomId == room?.id && this.repeatMode == true) {
         if (msgType == Message.Type.Text) {
            room?.say(msg.text())
         }
      } else {
         log.error('error')
      }

   }
   public async queue(fn: any, name?: string) {
      log.info('chat', 'queue(,"%s")', name)
      await this.delayQueueExecutor.execute(fn.bind(this), name)
      log.info('chat', 'queue(,"%s") finish.', name)
   }
   // public start() {
   //    return this.instance.start()
   // }
   async idsToRooms(idOrList: string | string[]) {
      if (Array.isArray(idOrList)) {
         const roomList = await Promise.all(
            idOrList.map(
               id => this.wechaty.Room.load(id)
            )
         )
         return roomList.filter(r => !!r) as Room[]
      } else {
         const room = await this.wechaty.Room.load(idOrList)
         return room ? [room] : []
      }
   }
   public async say(textOrMessage: string | Message | UrlLink) {
      return this.say2Room(TEST_ROOM_ID, textOrMessage)
   }
   async heartbeat(emoji: string) {
      return this.say2Room(HEARTBEAT_ROOM_ID, emoji)
   }
}