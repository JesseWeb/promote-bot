import { Wechaty, Friendship } from 'wechaty'
import { Chatops } from '../chatops'
export default async function onFriendship(this: Wechaty, friendship: Friendship): Promise<void> {
   let contact = friendship.contact()
   try {
      console.log(`received friend event.`)
      switch (friendship.type()) {

         // 1. New Friend Request

         case Friendship.Type.Receive:
            Chatops.instance().queue(async () => {
               await friendship.accept()
            }, `friendship receive accept with` + contact.name())

            break

         // 2. Friend Ship Confirmed

         case Friendship.Type.Confirm:
            let isBindedUser = Chatops.instance().isBindUserId(contact)
            await Chatops.instance().queue(async () => {
               Chatops.instance().say('friendship confirm with' + contact.name())
            }
            )
            if (!isBindedUser) {
               await Chatops.instance().queue(async () => {
                  await Chatops.instance().sayUnbind(contact)
               }, 'friendship confirm with' + contact.name()
               )
            } else {
               await Chatops.instance().queue(async () => {
                  await Chatops.instance().sayWelcomeBack(contact)
               }
               )
            }
            break
      }
   } catch (e) {
      console.error(e)
   }
}