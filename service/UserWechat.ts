import { CreateUserWechat } from "../dao/UserWechat"

export const S_CreateUserWechat = async (wechat: string, userid: number) => {
   let userWechat = await CreateUserWechat(userid, wechat)
   return userWechat
}
