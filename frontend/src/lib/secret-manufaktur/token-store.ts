import { writable } from "svelte/store";

export type PublicToken={
    id:string,
    description?: string | null
    image?: string | null
    name?: string | null
  }

export const tokenStore =writable<PublicToken[]>([])