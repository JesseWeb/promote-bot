import { Contact } from "wechaty";
import { S_CheckContactRooms, S_GetUserByContact } from "../service/User";
import { Chatops } from "../chatops";
import { S_GetInviteLevelByContact } from "../service/Invite";
import { PROMOTE_LEVELS_HAS_ROOM } from "../config/config";

export const getRooms = async (contact: Contact) => {
   let user = await S_GetUserByContact(contact)
   if (!user) {
      Chatops.instance().say2Friend(contact, '您还未绑定平台账号哦，请在平台个人主页中查看用户id')
      return
   }
   let contactRooms = await S_CheckContactRooms(contact)
   let roomsCount = contactRooms.length
   let contactLevel = await S_GetInviteLevelByContact(contact)
   if (!contactLevel) {
      return
   }
   let capacity = PROMOTE_LEVELS_HAS_ROOM[contactLevel]
   if (roomsCount >= capacity) {
      Chatops.instance().say2Friend(contact, `您已超出可绑定群数量\n可绑定数量${capacity}\n已绑定数量${roomsCount}`)
      return
   }
   let text = `您已绑定 ${contactRooms.length}个群：`

   contactRooms.forEach((room) => {
      text += `\n"${room.room_name}"`
   })
   text += `\n您还可以绑定${capacity - roomsCount}个群`
   Chatops.instance().say2Friend(contact, text)
}
