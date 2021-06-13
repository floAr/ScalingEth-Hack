import { SecretStore, selectedAccount } from "$lib/modules/secret/secret-store";
import { viewingKey } from "$lib/modules/secret/viewingkey-store";
import { tokenContract } from "./contract-interaction";
import { isMyToken, PublicToken } from "./token-store";
import type { FlowButton } from "./types";

const getPrice = () => {
    const scrt_price = prompt("Enter a price in SCRT")
    return Number(scrt_price) * 1000000
}

export const buttons: FlowButton[] = [
    // buy only if it has a price and is not owned by myself
    {
        title: 'buy', func: async (t) => {
            await tokenContract.SendTransaction({ buy: { token_id: t.id } }, { denom: 'uscrt', amount: t.price })
        }, active: (t: PublicToken): boolean => { return t.price != null && !isMyToken(t.id) }
    },
    // list only if it is my token and has no price yet
    {
        title: 'list', func: async (t) => {
            const price = getPrice()
            if (price >= 0) {
                await tokenContract.SendTransaction({ set_price: { token_id: t.id, price: price.toString() } })
            }
        }, active: (t) => { return t.price == null && isMyToken(t.id) }
    },
    // unlist only if it is my token and has a price set
    {
        title: 'unlist', func: async (t) => {
            await tokenContract.SendTransaction({ reset_price: { token_id: t.id } })
        }, active: (t) => { return t.price != null && isMyToken(t.id) }
    },
    // change price only if it is my token and has a price set
    {
        title: 'change price', func: async (t) => {
            const price = getPrice()
            if (price >= 0) {
                await tokenContract.SendTransaction({ set_price: { token_id: t.id, price: price.toString() } })
            }
        }, active: (t) => { return t.price != null && isMyToken(t.id) }
    },
    // download only works if I own the token
    {
        title: 'download', func: async (t) => {
            selectedAccount.subscribe(async value => {
                const vkey = viewingKey.getViewingKey(value.address)
                const private_meta = await tokenContract.SendQuery({ private_metadata: { token_id: t.id, viewer: { address: value.address, viewing_key: vkey } } })
                const url = 'https://' + private_meta.private_metadata.image + '.ipfs.dweb.link/'
                const a = document.createElement('a')
                a.href = url
                a.target = '_blank'
                a.download = url.split('/').pop()
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                console.log(private_meta)
            })

        }, active: (t) => { return isMyToken(t.id) }
    },
]