
import { browser } from "$app/env";
import { tokenContract } from "$lib/secret-manufaktur/contract-interaction";
import { writable } from "svelte/store";
import { SecretStore } from "./secret-store";


export type viewingKeyPair = {
    key: string,
    address: string
}

const storageKey = 'viewingKeys'

export const createStore = () => {
    let stored: string = undefined
    if (browser) {
        stored = localStorage.getItem(storageKey)
    }
    const { subscribe, update } = writable<viewingKeyPair[]>(stored ? JSON.parse(stored) : [])

    subscribe((value) => {
        if (browser) {
            localStorage.setItem(storageKey, JSON.stringify(value))
        }
    })

    const addViewingKey = async (address: string) => {
        const entropy = SecretStore.getEntropy();
        const viewingkey = await tokenContract.SendTransaction({
            create_viewing_key: {
                entropy,
                padding: SecretStore.createPadding(entropy.length, 128)
            }
        })
        update(state => {
            const filtered = state.filter(vkp => { return vkp.address !== address })
            return [...filtered, { address, key: viewingkey.viewing_key.key }]
        })
        console.log(viewingkey)
        return viewingkey.viewing_key.key as string
    }

    const getViewingKey = (address: string): string | undefined => {
        let result: undefined | string = undefined
        subscribe(value => {
            value.forEach(vkp => {
                if (vkp.address === address)
                    result = vkp.key

            })
        })
        return result
    }

    return { subscribe, addViewingKey, getViewingKey }
}

export const viewingKey = createStore();


// export const viewingKey = persist<string>(writable(''), localStorage(), 'viewingKey')