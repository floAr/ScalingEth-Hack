
import { browser } from "$app/env";
import { writable } from "svelte/store";





export const createStore = (storageKey: string) => {
    let stored: string = undefined
    if (browser) {
        stored = localStorage.getItem(storageKey)
    }
    const { subscribe, set } = writable<string>(stored ? stored : undefined)

    subscribe((value) => {
        if (browser) {
            localStorage.setItem(storageKey, JSON.stringify(value))
        }
    })



    return { subscribe, set }
}

export const howtoStore = createStore('how-to');