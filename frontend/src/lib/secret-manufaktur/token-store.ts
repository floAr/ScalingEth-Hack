import { writable } from "svelte/store";

export type PublicToken = {
  id: string,
  description?: string | null
  image?: string | null
  name?: string | null
  price?: string | null
}

export const ShouldUpdateTokens = writable<boolean>(true)

export const AllTokensStore = writable<PublicToken[]>([])

export const MyTokensStore = writable<string[]>([])