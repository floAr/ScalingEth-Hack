<script lang="ts">
  import Flow from '$lib/components/flow.svelte'
  import { loadTokens, MyTokensStore } from '$lib/secret-manufaktur/token-store'
  import type { PublicToken } from '$lib/secret-manufaktur/token-store'
  import Connector from '$lib/components/connector.svelte'


  loadTokens()

  const isMyToken = (token: PublicToken) => {
    return $MyTokensStore.includes(token.id)
  }

  let predicate: (token: PublicToken) => boolean = isMyToken

  const showAll = () => {
    predicate = isMyToken
  }

  const showOnSale = () => {
    predicate = token => {
      console.log(token.name, token.price, token.price != null)
      return isMyToken(token) && token.price != null
    }
  }
</script>

<Connector redirect={'/collection'} />
<div class="collection-header">
  <button on:click={showAll}>All tokens</button>
  <button on:click={showOnSale}>On Sale</button>
  <button>All tokens</button>
</div>
<Flow {predicate} />

<style lang="scss">
  .collection-header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
