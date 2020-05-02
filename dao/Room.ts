import { Room } from "../entity/Room"

export const CreateRoom = async (document: any) => {
   let room = new Room(document)
   return await room.save()
}
export const FindRoom = async (feilds: any) => {
   return Room.findAll({
      where: {
         ...feilds
      }
   })
}
export const FindOneRoom = async (feilds: any) => {
   return Room.findOne({
      where: {
         ...feilds
      }
   })
}
export const UpdateRoom = async (feilds: any, document: any) => {
   Room.update(document, {
      where: {
         ...feilds
      }
   })
}


