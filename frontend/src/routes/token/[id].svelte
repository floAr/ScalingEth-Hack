<script context="module">
  export async function load({ fetch, page }) {
    const { id } = page.params
    console.log(id)
    return { props: { token_id: id.toString() } }
  }
</script>

<script lang="ts">
  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { goto } from '$app/navigation'
  export let token_id: string
</script>

<FlowEntry
  id={token_id}
  modalOpen={true}
  modalOnClose={() => {
    goto('/')
  }}
/>

<style lang="scss">
  /* We need to set the display of the token card to none */
</style>
