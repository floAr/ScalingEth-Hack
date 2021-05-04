<script lang="ts">
  import { browser } from '$app/env'

  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { SecretStore, chainId } from '$lib/modules/secret/secret-store'
  import { tokenContract } from '$lib/secret-manufaktur/contract-interaction'

  let public_tokens: {
    description?: string | null
    image?: string | null
    name?: string | null
  }[] = []

  let token_count = 0

  async function loadTokens() {
    const tokens = await tokenContract.SendQuery({ all_tokens: {} })
    let token

    for (const element of tokens.token_list.tokens) {
      token = await tokenContract.SendQuery({ nft_info: { token_id: element } })
      console.log(token)
      public_tokens = [token.nft_info, ...public_tokens]
    }
    console.log(public_tokens)
    token_count++
  }

  if (browser) {
    if ($SecretStore.queryClient === null) {
      SecretStore.connect('holodeck-2').then(() => {
        console.log('branch a')
        console.log('xxx', $SecretStore.queryClient)
        loadTokens()
      })
    } else {
      console.log('branch b')
      loadTokens()
    }
  }
  $: console.log('chainId', $chainId)
</script>

<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each public_tokens as { name, description, image }, i}
        <FlowEntry id={i} {name} {description} cid={image} />
      {/each}
    </div>
  </div>
</div>

<style>
  .flow-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
    margin-top: 1vh;
  }
  .flow-center {
  }
  .flow-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 75vw;
  }
</style>
