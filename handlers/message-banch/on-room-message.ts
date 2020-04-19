import { Message ,log} from 'wechaty'
// import { Chatops } from '../../chatops'
import {VoteManager} from '../../manager/checkVote'
export default async (msg: Message) => {
   try {
      await VoteManager.checkVote(msg)
      await VoteManager.checkKickMember(msg)
   } catch (e) {
      log.error('on-message', 'Failed to check vote for the message:\n', e)
   }
   let roomid = msg.room()?.id
   console.log(`${roomid} says ${msg}`)
}
