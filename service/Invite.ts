import { Contact } from "wechaty";
import { GetUserByWechat } from "../dao/User";
import { GetInviter } from "../dao/Invite";

export const S_GetInviteLevelByContact = async (contactOrId: Contact | string) => {
   if (typeof contactOrId === 'string') {
      let inviter = await GetInviter({ to_userid: contactOrId })
      if (inviter) {
         if ([1, 2, 3, 4].indexOf(inviter.level) > -1)
            return inviter.level
      }
   } else if (contactOrId instanceof Contact) {
      let user = await GetUserByWechat(contactOrId.id)
      if (user) {
         let inviter = await GetInviter({ to_userid: user?.userid })
         if (inviter) {
            if ([1, 2, 3, 4].indexOf(inviter.level) > -1)
               return inviter.level
         }
      }
   }
   return null
}
