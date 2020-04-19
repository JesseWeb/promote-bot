import { Message } from 'wechaty'
import NodeCache from 'node-cache'
export interface VoteCache {
   voteCount: number,
   voteMemberIdList: string[]
}

import { MANAGER_LIST } from '../config/config'
import { Chatops } from '../chatops'
const VOTE_KEY = [
   '[弱]',
   '/:MMWeak',
]
const KICK_KEY = [
   '/:bome',
   '[炸弹]'
]
const DEFAULT_VOTE_THRESHOLD = 3

const MANAGED_ROOM_NAME_PATTERN = [
   /悦享推广/,
]

export class VoteManager {

   private static cache = new NodeCache()

   /**
    * @param message
    * @description Check whether the message is a vote message
    */
   public static async checkVote(message: Message) {

      const room = message.room()
      const contact = message.from()
      const content = message.text()

      if (!room || !contact || message.type() !== Message.Type.Text) {
         return
      }

      const topic = await room.topic()
      const topicMatched = MANAGED_ROOM_NAME_PATTERN.filter(pattern => pattern.test(topic)).length > 0
      if (!topicMatched) {
         return
      }

      const mentions = await message.mentionList()
      if (!mentions || mentions.length === 0) {
         return
      }

      const mentionNames = await Promise.all(mentions.map(async member => {
         const name = member.name()
         const alias = await room.alias(member)
         return alias || name
      }))

      const pureContent = mentionNames.reduce((prev, cur) => {
         const regex = new RegExp(`@${cur}[\u2005\u0020]`)
         return prev.replace(regex, '')
      }, content)

      const isKeyword = VOTE_KEY.includes(pureContent.trim())
      if (!isKeyword) {
         return
      }

      for (const mention of mentions) {
         if (mention.id === message.wechaty.userSelf().id) {
            await room.say(`请不要尝试警告管理员`, contact)
            return
         }
         if (MANAGER_LIST.indexOf(mention.id) > -1) {
            await room.say(`请不要尝试警告管理员`, contact)
            continue
         }


         const KEY = `${room.id}-${mention.id}-kick`
         let cache = this.cache.get<VoteCache>(KEY)
         if (!cache) {
            cache = {
               voteCount: 1,
               voteMemberIdList: [mention.id],
            }
         }
         const { voteCount, voteMemberIdList } = cache

         const isVoted = voteMemberIdList.reduce((res, id) => res || (id === contact.id), false)
         if (isVoted) {
            await room.say(`你已经警告过 ${mention.name()}, 请不要连续警告.`, contact)
            return
         }
         this.cache.set<VoteCache>(KEY, cache)
         if (voteCount >= DEFAULT_VOTE_THRESHOLD) {
            await room.say(`你被选为这个房间里不受欢迎的人，把你踢出去对每个还在这个群里的人来说都是一个重要的通知，再见`, mention)
            await room.del(mention)
            this.cache.del(KEY)
         } else {
            this.cache.set<VoteCache>(KEY, {
               voteCount: voteCount + 1,
               voteMemberIdList: [...voteMemberIdList, contact.id],
            })
            await room.say(
               `您已被警告${voteCount}次，如果您连续收到三次警告，您将被踢出本群。`
               , mention)
         }
      }
   }
   public static async checkKickMember(message: Message) {

      const room = message.room()
      const contact = message.from()
      const content = message.text()

      if (!room || !contact || message.type() !== Message.Type.Text) {
         return
      }

      const topic = await room.topic()
      const topicMatched = MANAGED_ROOM_NAME_PATTERN.filter(pattern => pattern.test(topic)).length > 0
      if (!topicMatched) {
         return
      }

      const mentions = await message.mentionList()
      if (!mentions || mentions.length === 0) {
         return
      }

      const mentionNames = await Promise.all(mentions.map(async member => {
         const name = member.name()
         const alias = await room.alias(member)
         return alias || name
      }))

      const pureContent = mentionNames.reduce((prev, cur) => {
         const regex = new RegExp(`@${cur}[\u2005\u0020]`)
         return prev.replace(regex, '')
      }, content)

      const isKeyword = KICK_KEY.includes(pureContent.trim())
      if (!isKeyword) {
         return
      }

      for (const mention of mentions) {
         let fromWx = message.from()?.id
         if (!fromWx) {
            break
         }
         if (MANAGER_LIST.indexOf(fromWx) > -1) {
            if (mention.id === message.wechaty.userSelf().id) {
               await room.say(`请不要尝试警告管理员`, contact)
               break
            }
            await Chatops.instance().queue(async () => {
               await room.say(`你被选为这个房间里不受欢迎的人，把你踢出去对每个还在这个群里的人来说都是一个重要的通知，再见`, mention)
               await room.del(mention)
            }, `checkKickMember: room.say() room.del() mention:${mention.name}.from：${message.from()?.name}`
            )
         }
      }
   }

}
