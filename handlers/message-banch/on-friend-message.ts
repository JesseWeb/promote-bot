import { Message, Room, Wechaty } from 'wechaty'
import { ROOMTOKEN, PROMOTERS_ROOM_ID } from '../../config/config'
import { Chatops } from '../../chatops'
export default async function onFriendMessage(this: Wechaty, msg: Message) {
   let text = msg.text()
   console.log(text)
   if (text.toLocaleLowerCase() === ROOMTOKEN) {
      let contact = msg.from()
      let room: Room = this.Room.load(PROMOTERS_ROOM_ID)
      if (room) {
         await Chatops.instance().queue(async () => {
            if (!contact) {
               return
            }
            await room.add(contact)

         }, 'add contact to room' + room.id)
         await Chatops.instance().queue(async () => {
            setTimeout(async () => {
               await room.say`Hello ${contact}\n欢迎加入悦享推广\n发言请遵守群公告内的规定`
            }, 2000)
            // let member = await room.member(contact.name())
            // if (!member) {
            //    await room.say`Hello ${contact.name} \n欢迎加入悦享推广\n发言请遵守群公告内的规定`
            // } else {
            //    await room.say`Hello ${contact}\n欢迎加入悦享推广\n发言请遵守群公告内的规定`
            // }
         }, 'add contact to room' + room.id)
      }
   }
}
