const webpush = require('web-push') //requiring the web-push module

const vapidKeys = {
  publicKey: 'BB3A7PxgaZkG3a7sft0xi4hRq59gKsF6ziQ7wKTDKyv6ScaVaODi9a3e8dWUjg19TYzh4gYgojJy0qEynIQ1O_U',
  privateKey: 'yV3uYD0GAVoVXfpLO4kgVB_zU856BpBxktre2ZWlXLs',
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:ynonperek@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='hello world') => {
  webpush.sendNotification(subscription, dataToSend)
}
