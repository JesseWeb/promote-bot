import {FindOnePromoteChannel} from '../dao/PromoteChannel'
export const S_FindPromoteChannel = async (userid:number) => {
   let promoteChannel = await FindOnePromoteChannel({
      userid
   })
   if(!promoteChannel||!promoteChannel.rid){
      return
   }
   return promoteChannel
  
}
