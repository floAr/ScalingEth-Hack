import Contract from "$lib/modules/secret/contract";
import type { InitMsg, QueryMsg, QueryAnswer, HandleMsg, HandleAnswer } from "$lib/modules/secret/contracts/snip721";

export const tokenContract = new Contract<InitMsg, QueryMsg, QueryAnswer, HandleMsg, HandleAnswer>(
    'secret1pctle9m5n52c8atkpjn4v2syypzy0lk0szd4x2'
)

// querying tokens
// we want to start at the end, query one page of tokens and then wait and ask for the next bunch, maybe combine with the lazy loading in the flow, so that we are always asking for the next two bunch of tokens

