import Contract from "$lib/modules/secret/contract";
import type { InitMsg, QueryMsg, QueryAnswer, HandleMsg, HandleAnswer } from "$lib/modules/secret/contracts/snip721";

const tokenContract = new Contract<InitMsg, QueryMsg, QueryAnswer, HandleMsg, HandleAnswer>(
    'secret1pctle9m5n52c8atkpjn4v2syypzy0lk0szd4x2'
)

