import { writable } from "svelte/store";
import { tokenContract } from "./contract-interaction";

export type PublicToken = {
  id: string,
  description?: string | null
  image?: string | null
  name?: string | null
  price?: string | null
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const sortTokens = (tokens: PublicToken[]) => {
  return tokens.sort((t1, t2) => {
    return Number.parseInt(t1.id) < Number.parseInt(t2.id) ? 1 : -1
  })
}

export const updateToken = async (tokenId: string) => {
  const token = await tokenContract.SendQuery({ nft_info: { token_id: tokenId } })
  AllTokensStore.update(tokens => {
    const otherTokens = tokens.filter(t => t.id !== tokenId);
    return sortTokens([...otherTokens, { ...token.nft_info, id: tokenId }])
  })
}

export const updateTokenShallow = async (tokenId: string) => {
  // const token = await tokenContract.SendQuery({ nft_info: { token_id: tokenId } })
  AllTokensStore.update(tokens => {
    const otherTokens = tokens.filter(t => t.id !== tokenId);
    return sortTokens([...otherTokens, { id: tokenId }])
  })
}

const loadTokenBatch = async (start: number, batch_size: number) => {
  for (let i = 0; i <= batch_size; i++) {
    if (start - i >= 0) {
      console.log('loading', start - i)
      updateTokenShallow((start - i).toString())
    }
    else
      break;
  }
  if (start - batch_size - 1 > 0) {
    await sleep(1000)
    loadTokenBatch(start - batch_size - 1, batch_size)
  }
}

export const loadTokens = async ():Promise<void> => {
  const num_tokens = (await tokenContract.SendQuery({ num_tokens: {} })).num_tokens.count
  loadTokenBatch(num_tokens - 1, 5)
}

export const getToken = async (tokenId: string, ignoreCache = false): Promise<PublicToken> => {
  let token: PublicToken = undefined
  if (!ignoreCache) {

    AllTokensStore.subscribe(value => {
      token = value.find(t => { return t.id === tokenId })
    })
    if (token?.image)
      return token;
  }
  updateToken(tokenId)
  const content = (await tokenContract.SendQuery({ nft_info: { token_id: tokenId } })).nft_info
  return { ...content, id: tokenId }
}

export const isMyToken = (tokenId: string) => {
  let mine = false;
  MyTokensStore.subscribe(value => {
    if (value)
      mine = value.includes(tokenId)
  })
  return mine
}

export const AllTokensStore = writable<PublicToken[]>([])

export const MyTokensStore = writable<string[]>([])