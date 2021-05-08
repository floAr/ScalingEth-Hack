<script lang="ts">
  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { AllTokensStore } from '$lib/secret-manufaktur/token-store'

  type PublicToken = {
    id: string
    description?: string | null
    image?: string | null
    name?: string | null
    price?: string | null
  }
  export let Buttons: { title: string; func: (token: PublicToken) => void }[] = []
</script>

<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each $AllTokensStore as { name, description, image, price, id }, i}
        <FlowEntry {id} {name} {description} cid={image} {price} {Buttons}/>
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
