import { Contact } from "wechaty";
import { S_GetInviteLevelByContact } from "../service/Invite";
import { UserRights } from "../enums/UserRights";
import { Chatops } from "../chatops";

export const checkingRights = async (contact: Contact) => {
   let level = await S_GetInviteLevelByContact(contact);
   if (!level) {
      await Chatops.instance().say2Friend(contact, `请先绑定账户`)
      return
   }
   let rights = UserRights[level - 1]
   if (!rights) {
      await Chatops.instance().say2Friend(contact, `您的等级有误，请联系管理员`)
      return
   }
   await Chatops.instance().say2Friend(contact, `您的权益：\n返佣比例：${rights.rakeBack}\n可绑定推广群数量：${rights.roomCapacity}`)
}
