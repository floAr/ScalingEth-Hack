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
        title: 'buy', func: (t) => {
            tokenContract.SendTransaction({ buy: { token_id: t.id } }, { denom: 'uscrt', amount: t.price })
        }, active: (t: PublicToken): boolean => { return t.price != null && !isMyToken(t.id) }
    },
    // list only if it is my token and has no price yet
    {
        title: 'list', func: (t) => {
            const price = getPrice()
            if (price >= 0) {
                tokenContract.SendTransaction({ set_price: { token_id: t.id, price: price.toString() } })
            }
        }, active: (t) => { return t.price == null && isMyToken(t.id) }
    },
    // unlist only if it is my token and has a price set
    {
        title: 'unlist', func: (t) => {
            const price = getPrice()
            if (price >= 0) {
                tokenContract.SendTransaction({ unlist: { token_id: t.id } })
            }
        }, active: (t) => { return t.price != null && isMyToken(t.id) }
    },
    // change price only if it is my token and has a price set
    {
        title: 'change price', func: (t) => {
            const price = getPrice()
            if (price >= 0) {
                tokenContract.SendTransaction({ set_price: { token_id: t.id, price: price.toString() } })
            }
        }, active: (t) => { return t.price != null && isMyToken(t.id) }
    },
]