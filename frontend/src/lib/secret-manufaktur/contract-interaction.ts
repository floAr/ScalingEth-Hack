import Contract from "$lib/modules/secret/contract";
import type * as snip721 from "$lib/modules/secret/contracts/snip721";
import type * as minter from "$lib/secret-manufaktur/contracts/minter";


export const tokenContract = new Contract<snip721.InitMsg, snip721.QueryMsg, snip721.QueryAnswer, snip721.HandleMsg, snip721.HandleAnswer>(
    'secret1c6atp9h8k46sa06dfm6k7gsy705zq4hpv92vn2'
)

export const mintContract = new Contract<minter.InitMsg, minter.QueryMsg, minter.QueryAnswer, minter.HandleMsg, minter.HandleAnswer>(
    'secret13eww4xhrszpq73kueq2kjmhe3amhz5n203qxsp'
)

// querying tokens
// we want to start at the end, query one page of tokens and then wait and ask for the next bunch, maybe combine with the lazy loading in the flow, so that we are always asking for the next two bunch of tokens

