import { Invite } from "../entity/Invite"

export const GetInviter = async (feilds:any) => {
   let user = await Invite.findOne({
      where:{
         ...feilds
      }
   })
   return user
}  
