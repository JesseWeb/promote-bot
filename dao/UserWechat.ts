import { UserWechat } from "../entity/UserWechat"
export const CreateUserWechat = async (UserId: number, wechat: string) => {
   if (!UserId) {
      return
   }
   const record = new UserWechat({ wechat, userid: UserId })
   return await record.save()
}