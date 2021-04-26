import { persist, localStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const viewingKey = persist<string>(writable(''), localStorage(), 'viewingKey')