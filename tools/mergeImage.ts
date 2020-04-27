// import mergeImages from 'merge-images';
// const mergeImages = require('merge-images')
import mergeImages from 'merge-images'
import { url2qrcode } from "../tools/url2qrcode";
import {Canvas,Image} from 'canvas'
// var { promisify } = require('util');
import {promisify} from 'util'
var sizeOf = promisify(require('image-size'));
export const mergeImage = async (bg: string, mergeImage: string, x: number, y: number, qrcodeSize: number) => {
   let mtDimensions = await sizeOf(bg)
   let base64 = await mergeImages([
      {
         src: bg,
         x: 0,
         y: 0
      },
      {
         src: await url2qrcode(mergeImage, qrcodeSize),
         x,
         y,
      }

   ], {
      height: mtDimensions.height,
      width: mtDimensions.width,
      Canvas, Image
   })
   return base64
}
