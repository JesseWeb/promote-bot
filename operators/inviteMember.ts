import { Contact, Wechaty } from "wechaty";
import { PROMOTERS_ROOM_ID } from "../config/config";
import { Chatops } from "../chatops";

export default async function (this: Wechaty, contact: Contact | null) {
   for (let i = 0; i < PROMOTERS_ROOM_ID.length; i++) {
      const roomid = PROMOTERS_ROOM_ID[i];
      let room = this.Room.load(roomid)
      let members = await room.memberAll()
      let roomMemberCount = members.length
      if (room && roomMemberCount < 500) {
         await Chatops.instance().queue(async () => {
            if (!contact) {
               return
            }
            await room.add(contact)
            await room.say`Hello ${contact}\n欢迎加入悦享推广\n发言请遵守群公告内的规定`
         }, 'add contact to room' + room.id)
         return
      }
   }

}
