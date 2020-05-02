import { Room, Contact } from "wechaty";
import { Chatops } from "../chatops";
import { S_GetActiveRoomByRoomId, S_UnbindRoomById } from '../service/Room'

export default async function onRoomLeave(room: Room, leaverList: Contact[]) {
   const roomId = room.id
   leaverList.forEach(async (leaver) => {
      let isSelf = leaver.self()
      if (isSelf) {
         let room = await S_GetActiveRoomByRoomId(roomId)
         if (room) {
            let wechat = room.wechat
            await S_UnbindRoomById(room.id)
            await Chatops.instance().queue(async function (this: Chatops) {
               await this.say2Friend(wechat, `机器人被踢出群:
                  "${room?.room_name}"
                  绑定已解除。`)
            }, `onRoomLeave bot just got kickout of room. roomId: ${roomId}`)
         }
         await Chatops.instance().queue(async function (this: Chatops) {
            await this.say(`onRoomLeave bot just got kickout of room. roomId: ${roomId}`)
         }, `onRoomLeave bot just got kickout of room. roomId: ${roomId}`)
      }
   });
}
