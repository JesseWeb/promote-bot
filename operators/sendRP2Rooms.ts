import { S_GetActiveRoom } from "../service/Room"
import { S_FindPromoteChannel } from "../service/PromoteChannel"
import { Chatops } from "../chatops"
import { FileBox } from "wechaty"
// import { url2qrcode } from "../tools/url2qrcode"
import path from 'path'
import { mergeImage } from "../tools/mergeImage"
export const sendRP2Rooms = async () => {
   let rooms = await S_GetActiveRoom()
   for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      let userid = room.userid
      let pc = await S_FindPromoteChannel(userid)
      if (pc) {
         let { elem_share_url } = pc
         // let mt_bg = path.resolve(__dirname, '../images/background/mt.jpg')
         let elem_bg = path.resolve(__dirname, '../images/background/elem.jpg')
         // let mtImage = await mergeImage(mt_bg, mt_url, 215, 480, 230)
         // await Chatops.instance().say2Room(room.room_id, FileBox.fromDataURL(mtImage, 'mt.png'))
         let elemImage = await mergeImage(elem_bg, elem_share_url, 230, 610, 200)
         await Chatops.instance().say2Room(room.room_id, FileBox.fromDataURL(elemImage, 'mt.png'))
         // let elemGsImage = await mergeImage(elem_bg, elem_shop_url, 230, 610, 200)
         // await Chatops.instance().say2Room(room.room_id, FileBox.fromDataURL(elemGsImage, 'mt.png'))
      }
   }
}
