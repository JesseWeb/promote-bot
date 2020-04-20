import { Message, Wechaty, log } from 'wechaty'
import { ROOMTOKEN,HELP_COMMAND } from '../../config/config'
import { inviteMember, sayHelpList } from '../../operators'
import { Chatops } from '../../chatops'
let types = [/^#bd([0-9]+)/, /^#jb([0-9]+)/, /^#bdq(\S)*/, /^#jbq(\S)*/, /^#cxq$/, /^#cxqy$/]
enum CommandTypes {
   BINDING_ACCOUNT = 0,
   UNBINDING_ACCOUNT = 1,
   BINDING_ROOM = 2,
   UNBINDING_ROOM = 3,
   CHECKING_ROOM = 4,
   CHECKING_RIGHTS = 5

}
export default async function onFriendMessage(this: Wechaty, msg: Message) {
   let text = msg.text()
   let parsedText = text.toLocaleLowerCase()
   let contact = msg.from()
   if (msg.self()) {

   } else {
      if (!contact) {
         log.info(`on friend message: contact null`)
         return
      }
      if (parsedText === ROOMTOKEN) {
         await inviteMember.call(this, contact)

      } else if (parsedText==HELP_COMMAND){
         await sayHelpList(contact)
      }else if (/^#/.test(parsedText)) {
         let type: number = -1
         let matchedList: string[] | null = null
         types.forEach((regx, index) => {
            if (parsedText.match(regx)) {
               matchedList = parsedText.match(regx)
               type = index
               return
            }
         });
         switch (type) {
            case CommandTypes.BINDING_ROOM:
               if (!matchedList) {
                  Chatops.instance().say2Friend(contact, `指令错误`)
                  return
               }
               Chatops.instance().say2Friend(contact, `you just trigged BINDING_ROOM：${CommandTypes.BINDING_ROOM},RoomId：${matchedList[1]}`)
               break;
            case CommandTypes.BINDING_ACCOUNT:
               if (!matchedList) {
                  Chatops.instance().say2Friend(contact, `指令错误`)
                  return
               }
               Chatops.instance().say2Friend(contact, `you just trigged BINDING_ACCOUNT：${CommandTypes.BINDING_ACCOUNT},AccountId：${matchedList[1]}`)
               break;
            case CommandTypes.UNBINDING_ACCOUNT:
               if (!matchedList) {
                  Chatops.instance().say2Friend(contact, `指令错误`)
                  return
               }
               Chatops.instance().say2Friend(contact, `you just trigged UNBINDING_ACCOUNT：${CommandTypes.UNBINDING_ACCOUNT} ,AccountId：${matchedList[1]}`)
               break;
            case CommandTypes.UNBINDING_ROOM:
               if (!matchedList) {
                  Chatops.instance().say2Friend(contact, `指令错误`)
                  return
               }
               Chatops.instance().say2Friend(contact, `you just trigged UNBINDING_ROOM：${CommandTypes.UNBINDING_ROOM}RoomId：${matchedList[1]}`)
               break;
            case CommandTypes.CHECKING_RIGHTS:
               Chatops.instance().say2Friend(contact, `you just trigged CHECKING_RIGHTS：${CommandTypes.CHECKING_RIGHTS}`)
               break;
            case CommandTypes.CHECKING_ROOM:
               Chatops.instance().say2Friend(contact, `you just trigged CHECKING_ROOM：${CommandTypes.CHECKING_ROOM}`)
               break;
            default:
               Chatops.instance().say2Friend(contact, `you just trigged nothing`)
               break;
         }
      } else {
         Chatops.instance().say2Friend(contact, `指令错误，请重新输入`)
      }
   }

}
