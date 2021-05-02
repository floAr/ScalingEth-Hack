import { browser } from "$app/env";
import type { SigningCosmWasmClient } from "secretjs";
import type { Coin } from "secretjs/types/types";
import type { toast_module } from "../toast/toast";
import { toastStore } from "../toast/toast-store";
import { SecretStore } from "./secret-store";

let client: SigningCosmWasmClient = undefined
if (browser) {
    SecretStore.subscribe(value => {
        client = value.client
    })
}



let toast: toast_module = undefined
if (browser)
    toastStore.subscribe(value => {
        toast = value
    })



export type HumanAddr = string
export type InteractionError= 'decryption'|'other'

// eslint-disable-next-line @typescript-eslint/ban-types
export async function query<IN extends object, OUT>(address: HumanAddr, query_msg: IN): Promise<OUT> {
    SecretStore.dispatch({ type: 'transact' })
    try {
        const resp = await client.queryContractSmart(address, query_msg)
        SecretStore.dispatch({ type: 'success' })
        return resp
    }
    catch (err) {
        toast.error('Error running query', err)
    }
    const resp = await client.queryContractSmart(address, query_msg)
    return resp
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function transact<IN extends object, OUT>(address: HumanAddr, msg: IN, fee?: Coin): Promise<OUT> {
    SecretStore.dispatch({ type: 'transact' })
    let resp
    try {
        if (fee !== undefined)
            resp = (await client.execute(address, msg, '', [fee]))
        else
            resp = (await client.execute(address, msg))
    }
    catch (err) {
        toast.error('Error running query', err)
        SecretStore.dispatch({ type: 'error', errorMsg: err })
        return
    }
    SecretStore.dispatch({ type: 'success' })
    return JSON.parse(new TextDecoder().decode(resp.data)) as OUT
}

export function parseError(err:any):InteractionError{
    return "other" 
}