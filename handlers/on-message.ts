import { Message, Wechaty } from 'wechaty'
import roomMessageHandler from './message-banch/on-room-message'
import friendMessageHandler from './message-banch/on-friend-message'
export default async function onMessage(
   this: Wechaty,
   msg: Message, ) {
   if (msg.room()) {
      await roomMessageHandler(msg)
   } else {
      await friendMessageHandler.call(this,msg)
   }
   // const roomTopic = await Chatops.instance().msgRoomTopic(msg)

}
