import { S_GetUserByContact, S_GetUserByUserId, S_UpdateUserById } from "../service/User"
import { Chatops } from "../chatops"
import { Contact } from "wechaty"
import { S_CreateUserWechat } from "../service/UserWechat"

export default async function bindWechat(userid: number | null, contact: Contact) {
   let wechat = contact.id
   if (!userid || !wechat) {
      return
   }
   let isBinded = await S_GetUserByContact(contact)

   if (!isBinded) {
      //binding userid
      let user = await S_GetUserByUserId(userid)
      if (!user) {
         await Chatops.instance().say2Friend(contact, '您输入的用户Id不正确')
         return
      }
      await S_UpdateUserById(userid, {
         wechat
      })
      await S_CreateUserWechat(wechat, userid)
      await Chatops.instance().say2Friend(contact,'绑定成功')
   } else {
      await Chatops.instance().say2Friend(contact,
         `您已绑定过，请勿重复绑定\n输入"#jb"接触当前绑定`)
   }
}
