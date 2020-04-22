import { Message, Wechaty, log } from 'wechaty'
import { ROOMTOKEN, HELP_COMMAND, CONFIRM_UNBIND_ACCOUNT } from '../../config/config'
import { inviteMember, sayHelpList } from '../../operators'
import { Chatops } from '../../chatops'
import bindWechat from '../../operators/bindWechat'
import { unbindWechat } from '../../operators/unbindWechat'
import { bindRoom } from '../../operators/bindRoom'
import { getRooms } from '../../operators/getRooms'
import { unbindRoom } from '../../operators/unbindRoom'
import { sendRP2Rooms } from '../../operators/sendRP2Rooms'
import { checkingRights } from '../../operators/checkingRights'
let types = [/^#bd([0-9]+)/, /^#jb$/, /^#bdq(\S*)/, /^#jbq(\S*)/, /^#cxq$/, /^#cxqy$/]
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

      } else if (parsedText == HELP_COMMAND) {
         await sayHelpList(contact)
      } else if (parsedText == "test") {
         await sendRP2Rooms()
      } else if (parsedText == CONFIRM_UNBIND_ACCOUNT) {
         await unbindWechat(contact)
      } else if (/^#/.test(parsedText)) {
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
               {
                  if (!matchedList) {
                     await Chatops.instance().say2Friend(contact, `指令错误`)
                     return
                  }
                  let room = await this.Room.find({ topic: matchedList[1] })
                  if (!room) {
                     await Chatops.instance().say2Friend(contact, `未找到名称为${matchedList[1]}的群\n请先将机器人拉进群中\n确保机器人进群后，群内有发言哦`)
                     return
                  }
                  await bindRoom(room, contact)
                  break;
               }
            case CommandTypes.BINDING_ACCOUNT:
               {
                  if (!matchedList) {
                     await Chatops.instance().say2Friend(contact, `指令错误`)
                     return
                  }
                  await bindWechat(parseInt(matchedList[1]), contact)
                  // Chatops.instance().say2Friend(contact, `you just trigged BINDING_ACCOUNT：${CommandTypes.BINDING_ACCOUNT},AccountId：${matchedList[1]}`)
                  break;
               }
            case CommandTypes.UNBINDING_ACCOUNT:
               Chatops.instance().say2Friend(contact, `高危操作，此举会将已绑定群解绑，请三思！！！\n确认解绑请输入 "本人确认解绑"`)
               // Chatops.instance().say2Friend(contact, `you just trigged UNBINDING_ACCOUNT：${CommandTypes.UNBINDING_ACCOUNT} ,AccountId：${matchedList[1]}`)
               break;
            case CommandTypes.UNBINDING_ROOM:
               {
                  if (!matchedList) {
                     Chatops.instance().say2Friend(contact, `指令错误`)
                     return
                  }
                  let room = await this.Room.find({ topic: matchedList[1] })
                  if (!room) {
                     await Chatops.instance().say2Friend(contact, `未找到名称为${matchedList[1]}的群\n请先将机器人拉进群中\n确保机器人进群后，群内有发言哦`)
                     return
                  }
                  await unbindRoom(room, contact)
                  break;
               }
            case CommandTypes.CHECKING_RIGHTS:
               await checkingRights(contact)
               break;
            case CommandTypes.CHECKING_ROOM:
               await getRooms(contact)
               break;
            default:
               Chatops.instance().say2Friend(contact, `指令错误，发送"帮助"获取指令大全`)
               break;
         }
      } else {
         Chatops.instance().say2Friend(contact, `指令错误，发送"帮助"获取指令大全`)
      }
   }

}
