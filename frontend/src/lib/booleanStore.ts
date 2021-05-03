import { writable } from 'svelte/store'

export function booleanStore(initial: boolean) {
    const isSet = writable<boolean>(initial)
    const { set, update } = isSet
    return {
        isOpen: isSet,
        setTrue: () => set(true),
        setFalse: () => set(false),
        toggle: () => update((n) => !n),
    }
}