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
    return Number.parseInt(t1.id) < Number.parseInt(t2.id) ? -1 : 1
  })
}

export const updateToken = async (tokenId: string) => {
  const token = await tokenContract.SendQuery({ nft_info: { token_id: tokenId } })
  AllTokensStore.update(tokens => {
    const otherTokens = tokens.filter(t => t.id !== tokenId);
    return sortTokens([...otherTokens, { ...token, id: tokenId }])
  })
}

export const ShouldUpdateTokens = writable<boolean>(true)

export const AllTokensStore = writable<PublicToken[]>([])

export const MyTokensStore = writable<string[]>([])