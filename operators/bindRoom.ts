import { Contact, Room } from "wechaty";
import { S_CheckRoomFree, S_CheckContactRooms, S_GetUserByContact } from "../service/User";
import { Chatops } from "../chatops";
import { S_GetInviteLevelByContact } from "../service/Invite";
import { PROMOTE_LEVELS_HAS_ROOM } from "../config/config";
import { S_CreateRoomByContact } from "../service/Room";

export const bindRoom = async (room: Room | null, contact: Contact) => {
   //check user was binded


   try {
      let user = await S_GetUserByContact(contact)
      if (!user) {
         Chatops.instance().say2Friend(contact, '您还未绑定平台账号哦，请在平台个人主页中查看用户id')
         return
      }
      if (!room) {
         Chatops.instance().say2Friend(contact, `未找到该群`)
         return
      }
      //check room was free
      let roomFree = await S_CheckRoomFree(room)
      if (!roomFree) {
         Chatops.instance().say2Friend(contact, '该群已经被绑定过')
         return
      }
      // check if out of capacity
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
      // check done. binding room
      await S_CreateRoomByContact(room, contact)
      Chatops.instance().say2Friend(contact, `绑定群成功，\n群名称：${await room.topic()}`)
   } catch (error) {
      throw error
   }
}
