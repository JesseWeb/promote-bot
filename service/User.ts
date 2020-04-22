import { GetUserByWechat, GetUserByUserId, UpdateUser } from "../dao/User";
import { User } from "../entity/User";
import { FindRoom, CreateRoom } from "../dao/Room";
import { Contact, Room } from "wechaty";
export const S_GetUserByContact = function (contact: Contact): Promise<User | null> {
   return GetUserByWechat(contact.id)
}
export const S_GetUserActiveRoomsByWechat = async (contact: Contact) => {
   return FindRoom({ wechat:contact.id, status: 1 })
}
export const S_BindRoomByContact = async (roomid: string, contact: Contact) => {
   return await CreateRoom({ wechat: contact.id, roomid, status: 1 })
}
export const S_CheckRoomFree = async (room: Room) => {
   let isBindRoom = await FindRoom({ room_id: room.id, status: 1 })
   if (isBindRoom.length) {
      return false
   } else {
      return true
   }
}
export const S_CheckContactRooms = async (contact: Contact) => {
   let isBindRoom = await FindRoom({ wechat: contact.id, status: 1 })
   return isBindRoom
}


export const S_GetUserByUserId = async (userid: number) => {
   return GetUserByUserId(userid)
}
export const S_UpdateUserById = async (userid: number, document: any) => {
   await UpdateUser({ userid }, document)
}
export const S_UpdateUserByWechat = async (wechat: string, document: any) => {
   await UpdateUser({ wechat }, document)
}


