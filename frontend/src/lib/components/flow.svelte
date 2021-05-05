<script lang="ts">
  import { browser } from '$app/env'

  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { SecretStore, chainId } from '$lib/modules/secret/secret-store'
  import { tokenContract } from '$lib/secret-manufaktur/contract-interaction'
  import { tokenStore } from '$lib/secret-manufaktur/token-store'
</script>

<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each $tokenStore as { name, description, image }, i}
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
