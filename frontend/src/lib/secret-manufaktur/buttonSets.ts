import { isMyToken, PublicToken } from "./token-store";
import type { FlowButton } from "./types";

export const buttons: FlowButton[] = [
    // buy only if it has a price and is not owned by myself
    { title: 'buy', func: (t) => { console.log("buy") }, active: (t:PublicToken):boolean => { return t.price != null && !isMyToken(t.id)} },
    // list only if it is my token and has no price yet
    { title: 'list', func: (t) => { console.log("buy") }, active: (t) => { return t.price == null && isMyToken(t.id) } },
    // unlist only if it is my token and has a price set
    { title: 'unlist', func: (t) => { console.log("buy") }, active: (t) => { return t.price != null && isMyToken(t.id) } },
     // change price only if it is my token and has a price set
     { title: 'change price', func: (t) => { console.log("buy") }, active: (t) => { return t.price != null && isMyToken(t.id) } },
]