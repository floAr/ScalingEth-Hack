import { browser } from "$app/env";
import type { SigningCosmWasmClient } from "secretjs";
import type { Coin } from "secretjs/types/types";
import type { toast_module } from "../toast/toast";
import { toastStore } from "../toast/toast-store";
import { SecretStore } from "./secret-store";


let client: SigningCosmWasmClient = undefined
let workingOnQuery = false;
if (browser) {
    SecretStore.subscribe(value => {
        client = value.client
        workingOnQuery = value.config.queryAsWorking ?? false;
    })
}



let toast: toast_module = undefined
if (browser)
    toastStore.subscribe(value => {
        toast = value
    })



export type HumanAddr = string
export interface InteractionError {
    type: 'no client' | 'decryption' | 'other',
    errTitle: string,
    errBody: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function query<IN extends object, OUT>(address: HumanAddr, query_msg: IN): Promise<OUT> {
    if (client == null) {
        parseError("client is null or undefined", true)
        return
    }
    if (workingOnQuery)
        SecretStore.dispatch({ type: 'transact' })
    try {
        const resp = await client.queryContractSmart(address, query_msg)
        if (workingOnQuery)
            SecretStore.dispatch({ type: 'success' })
        return resp
    }
    catch (err) {
        const errType = parseError(err, true)
    }
    const resp = await client.queryContractSmart(address, query_msg)
    return resp
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function transact<IN extends object, OUT>(address: HumanAddr, msg: IN, fee?: Coin): Promise<OUT> {
    if (client == null) {
        parseError("client is null or undefined", true)
        return
    }
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

export function parseError(err: Error | string, emit = false): InteractionError {

    console.log(err)
    let result: InteractionError = undefined
    if (err.toString().includes('client is null or undefined'))
        result = { type: "no client", errTitle: 'Not connected', errBody: "Make sure you connect to Keplr wallet" }

    result = { type: "other", errTitle: 'Error', errBody: err.toString() }
    if (emit) {
        if (toast) {
            toast.error(result.errTitle, result.errBody)
        }
        else {
            console.error(result.errTitle, result.errBody)
        }
    }
    return result
}