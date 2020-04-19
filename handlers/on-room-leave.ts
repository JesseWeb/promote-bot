import { Room, Contact } from "wechaty";
import { Chatops } from "../chatops";

export default async function onRoomLeave(room: Room, leaverList: Contact[]) {
   const roomId = room.id
   leaverList.forEach(async (leaver) => {
      let isSelf = leaver.self()
      if (isSelf) {
         // console.log(roomId)
         await Chatops.instance().queue(async function (this: Chatops) {
            await this.say(`onRoomLeave bot just got kickout of room. roomId: ${roomId}`)
         }, `onRoomLeave bot just got kickout of room. roomId: ${roomId}`)
      }
   });
}
