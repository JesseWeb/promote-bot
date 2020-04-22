import { User } from "../entity/User"
export const GetUserByWechat = async (wechat: string): Promise<User | null> => {
   let user = await User.findOne({
      where: {
         wechat
      }
   })
   return user
}
export const GetUserByUserId = async (userId: number): Promise<User | null> => {
   let user = await User.findOne({
      where: {
         userid: userId
      }
   })
   return user
}

export const UpdateUser = async (fields: any, document: any) => {

   return await User.update({ ...document }, {
      where: {
         ...fields
      }
   })
}




