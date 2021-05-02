import { NFTStorage } from 'nft.storage'
import type { toast_module } from '../toast/toast'
import { toastStore } from '../toast/toast-store'
const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8NzY1Mzg3IiwiaXNzIjoibmZ0LXN0b3JhZ2UiLCJpYXQiOjE2MTkzNDMzNzQ1NzMsIm5hbWUiOiJkZWZhdWx0In0.Ot6Vzme1UbEVsYokfifWz1fK-Pnajng2JcTQKWs3P4I" })

let toaster: toast_module = undefined
toastStore.subscribe(value=>{
    toaster =value
})

export async function storeFile(image){
    toaster.info("upload","uploadstartet")
    const cid = await client.storeBlob(image)
    return cid
}

export async function getFile(cid){
   console.log( await client.status(cid))
}


// Creates a thumbnail fitted insize the boundBox (w x h)
export async function generateThumbnail(file, boundBox){
    if (!boundBox || boundBox.length != 2){
      throw "You need to give the boundBox"
    }
    const scaleRatio = Math.min(...boundBox) / Math.max(file.width, file.height)
    const reader = new FileReader();
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d');
  
    return new Promise((resolve, reject) => {
      reader.onload = function(event){
          const img = new Image();
          img.onload = function(){
              const scaleRatio = Math.min(...boundBox) / Math.max(img.width, img.height)
              const w = img.width*scaleRatio
              const h = img.height*scaleRatio
              canvas.width = w;
              canvas.height = h;
              ctx.drawImage(img, 0, 0, w, h);
              return resolve(canvas.toDataURL(file.type))
          }
          img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    })
  }