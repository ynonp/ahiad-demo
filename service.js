// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BB3A7PxgaZkG3a7sft0xi4hRq59gKsF6ziQ7wKTDKyv6ScaVaODi9a3e8dWUjg19TYzh4gYgojJy0qEynIQ1O_U'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    console.log('1');
    const subscription = await self.registration.pushManager.subscribe(options)
    //
    // ************
    // This is the 3 THINGS you need to save to your DB
    // ************
    console.log(subscription.endpoint);
    console.log(subscription.getKey('p256dh'));
    console.log(subscription.getKey('auth'));

  } catch (err) {
    debugger;
    console.log('Error', err)
  }
})


self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text())
  } else {
    console.log('Push event but no data')
  }
})
