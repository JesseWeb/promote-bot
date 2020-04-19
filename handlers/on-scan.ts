import { ScanStatus, log } from 'wechaty'
import { generate } from 'qrcode-terminal'
export default async (qrcode: string, status: ScanStatus) => {
   if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      generate(qrcode, { small: true })  // show qrcode on console

      const qrcodeImageUrl = [
         'https://api.qrserver.com/v1/create-qr-code/?data=',
         encodeURIComponent(qrcode),
      ].join('')

      log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
   } else {
      log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
   }
}
