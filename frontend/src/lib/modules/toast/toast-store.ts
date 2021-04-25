import { writable } from "svelte/store";
import type { toast_module } from "./toast";
import { browser } from '$app/env';


const loadTata = async (set) => {
    if (browser) {
        if (typeof document != null && typeof document != null) {
            const tata = (await import('tata-js'));
            console.log(tata);
            set(tata)
        }
    }
}

const createStore = () => {
    const { subscribe, set } = writable<toast_module>(undefined)
    if (browser) {
        loadTata(set)
    }




    const enableToast = async () => {
        if (browser) {
            if (typeof (document) != null && typeof (document) != null) {
                const tata = await import('tata-js') as toast_module
                set(tata)
            }
        }
    }

    return {

        subscribe, enableToast
    }
}

export const toastStore = createStore()