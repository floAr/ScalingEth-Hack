import { browser } from "$app/env";
import type { SigningCosmWasmClient, Account as sAccount } from "secretjs";
import { onMount } from "svelte";
import { derived, writable } from "svelte/store";
import type { toast_module } from "../toast/toast";
import { toastStore } from "../toast/toast-store";
import { viewingKey } from "./viewingkey-store";

export type ChainId = 'secret-2' | 'holodeck-2'

export interface KeplrState {
    keplrFound: boolean
    chainId: string,
    connected: boolean,
    status?: 'undefined' | 'working' | 'idle' | 'failure'
    account?: sAccount,
    client?: SigningCosmWasmClient,
}

export interface KeplrContextProps extends KeplrState {
    connect?: (chainId: ChainId) => void,
    resetViewingKey?: () => void
    viewingKey?: string,
    setWorking?: (running: boolean) => void
}

let toast: toast_module = undefined
if (browser)
    toastStore.subscribe(value => {
        toast = value
    })




export type KeplrReducerActions = { type: 'init', chainId: ChainId } |
{
    type: 'connected', account: sAccount, client: SigningCosmWasmClient
} |
{ type: 'error', errorMsg: string } |
{ type: 'transact' } |
{ type: 'success' }


export const createStore = () => {
    const { subscribe, update } = writable<KeplrState>({
        chainId: '',
        connected: false,
        status: 'undefined',
        keplrFound: false
    })

    const dispatch: (action: KeplrReducerActions) => void = (action) => {
        console.log(action)
        switch (action.type) {
            case 'init':
                update(state => {
                    return {
                        ...state,
                        chainId: action.chainId,
                        connected: false,
                        status: 'working'
                    }
                })
                break;
            case 'connected':
                update(state => {
                    return {
                        ...state,
                        connected: true,
                        account: action.account,
                        client: action.client,
                        status: 'idle'
                    }
                })
                break;
            case 'error':
                update(state => {
                    return {
                        ...state,
                        status: 'failure'
                    }
                })
                break;
            case 'transact':
                update(state => {
                    return {
                        ...state,
                        status: 'working'
                    }
                })
                break;
            case 'success':
                update(state => {
                    return {
                        ...state,
                        status: 'idle'
                    }
                })
                break;
            default:
                throw new Error();
        }
    }

    const randomString = (length: number) => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    const getEntropy = () => {
        return btoa(randomString(15))
    }

    const createPadding = (currentLength: number, targetLength: number) => {
        return randomString(targetLength - currentLength)
    }

    const setBrowserProvider = async (chainId: ChainId) => {
        if (!window.getOfflineSigner || !window.keplr) {
            toast?.error('Error', 'Please install and authorize Keplr browser extension')
            return;
        }
        dispatch({ type: 'init', chainId })
        if (chainId === 'holodeck-2') {
            await window.keplr.experimentalSuggestChain({
                chainId,
                chainName: 'Secret Testnet',
                rpc: 'http://bootstrap.secrettestnet.io:26657',
                rest: 'https://bootstrap.secrettestnet.io',
                bip44: {
                    coinType: 529,
                },
                coinType: 529,
                stakeCurrency: {
                    coinDenom: 'SCRT',
                    coinMinimalDenom: 'uscrt',
                    coinDecimals: 6,
                },
                bech32Config: {
                    bech32PrefixAccAddr: 'secret',
                    bech32PrefixAccPub: 'secretpub',
                    bech32PrefixValAddr: 'secretvaloper',
                    bech32PrefixValPub: 'secretvaloperpub',
                    bech32PrefixConsAddr: 'secretvalcons',
                    bech32PrefixConsPub: 'secretvalconspub',
                },
                currencies: [
                    {
                        coinDenom: 'SCRT',
                        coinMinimalDenom: 'uscrt',
                        coinDecimals: 6,
                    },
                ],
                feeCurrencies: [
                    {
                        coinDenom: 'SCRT',
                        coinMinimalDenom: 'uscrt',
                        coinDecimals: 6,
                    },
                ],
                gasPriceStep: {
                    low: 0.1,
                    average: 0.25,
                    high: 0.4,
                },
                features: ['secretwasm'],
            });

        }
        window.keplr.enable(chainId).then(async () => {
            const keplrOfflineSigner = window.getOfflineSigner(chainId);
            const accounts = await keplrOfflineSigner.getAccounts();
            const { address } = accounts[0];
            // eslint-disable-next-line no-shadow
            const { SigningCosmWasmClient } = await import("secretjs")

            const cosmJS: SigningCosmWasmClient = new SigningCosmWasmClient(
                chainId === 'holodeck-2' ? 'https://datahubnode.azurewebsites.net/testnet/' : 'https://datahubnode.azurewebsites.net/node',
                // 'https://bootstrap.secrettestnet.io',
                address,
                keplrOfflineSigner,
                window.getEnigmaUtils(chainId),
                {
                    init: {
                        amount: [{ amount: '300000', denom: 'uscrt' }],
                        gas: '300000',
                    },
                    exec: {
                        amount: [{ amount: '5000000', denom: 'uscrt' }],
                        gas: '5000000',
                    },
                },
            );
            const account = await cosmJS.getAccount(address);

            window.cosmJS = cosmJS

            if (account !== undefined) {
                toast?.success('Connected succesfully', "Account: " + account.address)
                dispatch({
                    type: 'connected',
                    account,
                    client: cosmJS
                })
                // if (viewingKey === undefined)
                //     await resetViewingKey()
            }
        }).catch((e: string) => {
            toast?.error('Error', `Error connecting: ${e}`)
            dispatch({
                type: 'error',
                errorMsg: e
            })
        })

    }
    return {
        subscribe,
        setBrowserProvider,
        createPadding,
        getEntropy,
        dispatch
    }
}

export const SecretStore = createStore()



export const connected = derived(SecretStore, $SecretStore => $SecretStore.connected)

export const selectedAccount = derived(
    SecretStore,
    $SecretStore => $SecretStore.account
)

export const client = derived(SecretStore, $SecretStore => $SecretStore?.client)
export const chainId = derived(SecretStore, $SecretStore => $SecretStore.chainId)
export const status = derived(SecretStore, $SecretStore => $SecretStore.status)


