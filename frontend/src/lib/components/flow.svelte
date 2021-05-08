<script lang="ts">
  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { AllTokensStore } from '$lib/secret-manufaktur/token-store'
  import type {PublicToken} from '$lib/secret-manufaktur/token-store'


  let myTokens: PublicToken[] = []
  export let predicate: (token: PublicToken) => boolean = undefined

  export let Buttons: { title: string; func: (token: PublicToken) => void }[] = []

  $: {
    myTokens = []
    $AllTokensStore.forEach(token => {
      if (token !== undefined) {
        if (predicate === undefined || predicate(token)) {
          myTokens = [...myTokens, token]
        }
      }
    })
  }


</script>

<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each myTokens as { name, description, image, price, id }, i}
        <FlowEntry {id} {name} {description} cid={image} {price} {Buttons} />
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
