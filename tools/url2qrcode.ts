import QRCode from 'qrcode'
export const url2qrcode = async (text: string,width:number):Promise<string> => {
   return await QRCode.toDataURL(text,{
      width
   })
}

