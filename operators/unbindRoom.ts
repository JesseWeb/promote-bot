import { Room, Contact } from "wechaty";
import { S_UnbindRoomByContact } from "../service/Room";
import { Chatops } from "../chatops";
import { S_GetUserByContact } from "../service/User";

export const unbindRoom = async (room: Room, contact: Contact) => {
   let user = await S_GetUserByContact(contact);
   if (!user) {
      await Chatops.instance().say2Friend(contact, `请先绑定账号`)
      return
   }
   await S_UnbindRoomByContact(room, contact)
   await Chatops.instance().say2Friend(contact, `解绑成功`)
}
