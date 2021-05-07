import { persist, localStorage } from "@macfja/svelte-persistent-store";

import { writable } from "svelte/store";


// export type viewingKeyPair = {
//     key: string,
//     address: string
// }


// export const createStore = () => {
//     const { subscribe, update } = persist<viewingKeyPair[]>(writable<viewingKeyPair[]>([]), localStorage(), 'viewingKeys')

//     const addViewingKey = async (address: string) => {
//         const entropy = SecretStore.getEntropy();
//         const viewingkey = await tokenContract.SendTransaction({
//             create_viewing_key: {
//                 entropy,
//                 padding: SecretStore.createPadding(entropy.length, 128)
//             }
//         })
//         update(state => {
//             const filtered = state.filter(vkp => { return vkp.address !== address })
//             return [...filtered, { address, key: viewingkey.viewing_key.key }]
//         })
//         console.log(viewingkey)
//         return viewingkey.viewing_key.key
//     }

//     const getViewingKey = (address: string): string | undefined => {
//         let result: undefined | string = undefined
//         subscribe(value => {
//             value.forEach(vkp => {
//                 if (vkp.address === address)
//                     result = vkp.key

//             })
//         })
//         return result
//     }

//     return { subscribe, addViewingKey, getViewingKey }
// }

// const viewingKey = createStore();
// export default viewingKey

export const viewingKey = persist<string>(writable(''), localStorage(), 'viewingKey')