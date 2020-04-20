import { Chatops } from "../chatops"
import { HELP_LIST } from "../config/config"
import { Contact } from "wechaty"
export default async function (userId: string|Contact) {
   await Chatops.instance().queue(async () => {
      Chatops.instance().say2Friend(userId, HELP_LIST)
   }, `chatops HelpList2Contact() ${userId}`)
}