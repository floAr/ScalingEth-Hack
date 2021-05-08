import type { Coin } from "secretjs/types/types";
import { query, transact } from "./contract-helper";

// eslint-disable-next-line @typescript-eslint/ban-types
class Contract<Init, QueryMsg extends object, QueryAnswer, HandleMsg extends object, HandleAnswer>{
    address: string

    constructor(address: string) {
        this.address = address;
    }

    SendQuery(queryObj: QueryMsg): Promise<QueryAnswer> {
        return query<QueryMsg, QueryAnswer>(this.address, queryObj)
    }

    SendTransaction(transactionObj: HandleMsg, fee?: Coin): Promise<HandleAnswer> {
        return transact<HandleMsg, HandleAnswer>(this.address, transactionObj, fee)
    }
}

export default Contract