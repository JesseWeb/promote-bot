import { Contact } from "wechaty"
import { S_GetUserByContact, S_UpdateUserByWechat } from "../service/User"
import { Chatops } from "../chatops"
import { S_UnbindAllRoomByContact } from "../service/Room"

export const unbindWechat = async (contact: Contact) => {
   let wechat = contact.id
   if (!wechat) {
      return
   }
   let isBinded = await S_GetUserByContact(contact)
   if (!isBinded) {
      Chatops.instance().say2Friend(contact, '您还未绑定哦')
      return
   } else {
      try {
         await S_UpdateUserByWechat(wechat, {
            wechat: null
         })
         await S_UnbindAllRoomByContact(contact)
         Chatops.instance().say2Friend(contact, '解绑成功')
      } catch (error) {
         Chatops.instance().say2Friend(contact, '绑定失败，请稍后再试')
      }
   }
}
