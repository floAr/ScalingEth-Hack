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