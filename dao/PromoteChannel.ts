import { PromoteChannel } from "../entity/PromoteChannel"
export const FindOnePromoteChannel = async (feilds: any) => {
   return PromoteChannel.findOne({
      where: {
         ...feilds
      }
   })
}
