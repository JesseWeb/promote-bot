import { Contact, Room } from "wechaty";
import { CreateRoom, UpdateRoom, FindRoom } from "../dao/Room";
import { GetUserByWechat } from "../dao/User";

export const S_CreateRoomByContact = async (room: Room, contact: Contact, status: number = 1) => {
   if (!room) {
      throw new Error("room does not exist")
   }
   if (!contact) {
      throw new Error("contact does not exist")
   }
   let user = await GetUserByWechat(contact.id)
   let newRoom = await CreateRoom({ room_id: room.id, wechat: contact.id, userid: user?.userid, status, room_name: await room.topic() })
   return newRoom
}
export const S_UnbindRoomByContact = async (room: Room, contact: Contact) => {
   if (!room) {
      throw new Error("room does not exist")
   }
   if (!contact) {
      throw new Error("contact does not exist")
   }
   await UpdateRoom({
      room_id: room.id,
      wechat: contact.id
   }, {
      status: 2
   })
}
export const S_UnbindAllRoomByContact = async (contact:Contact) => {
   await UpdateRoom({
      wechat:contact.id
   },{status:2})
}

export const S_GetActiveRoom = async () => {
   let rooms = await FindRoom({
      status: 1
   })
   return rooms
}
