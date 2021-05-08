import { writable } from "svelte/store";
import { tokenContract } from "./contract-interaction";

export type PublicToken = {
  id: string,
  description?: string | null
  image?: string | null
  name?: string | null
  price?: string | null
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

export const loadTokens = async () => {
  const tokens = await tokenContract.SendQuery({ all_tokens: {} })
  let token

  for (const element of tokens.token_list.tokens.reverse()) {
    updateToken(element)
  }
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