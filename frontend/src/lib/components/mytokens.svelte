<script lang="ts">
  import FlowEntry from '$lib/components/flow-entry.svelte'
  import { AllTokensStore, MyTokensStore } from '$lib/secret-manufaktur/token-store'

  type PublicToken = {
    id: string
    description?: string | null
    image?: string | null
    name?: string | null
  }
  let myTokens: PublicToken[] = []

  export let predicate: (token: PublicToken) => boolean = undefined

  $: {
    myTokens = []
    console.log('prev', myTokens)
    console.log('pred', predicate)
    $MyTokensStore.forEach(id => {
      const token = $AllTokensStore.find(token => {
        return token.id === id
      })
      if (token !== undefined) {
        if (predicate === undefined) console.log('test1', predicate === undefined)
        else console.log('test2', predicate(token))
        if (predicate === undefined || predicate(token)) {
          myTokens = [...myTokens, token]
        }
      }
    })
    console.log('After', myTokens)
  }
</script>

<h2>My tokens</h2>
<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each myTokens as { name, description, image, id }, i}
        <FlowEntry {id} {name} {description} cid={image} />
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
