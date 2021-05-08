<script lang="ts">
  import Mytokens from '$lib/components/mytokens.svelte'
  import type { PublicToken } from '$lib/secret-manufaktur/token-store'
  import Connector from '$lib/components/connector.svelte'

  let predicate: (token: PublicToken) => boolean = undefined

  const showAll = () => {
    predicate = undefined
  }
  const showOnSale = () => {
    predicate = token => {
        console.log(token.name,token.price,token.price != null)
      return token.price != null
    }
  }
</script>
<Connector redirect={'/collection'}/>
<div class="collection-header">
  <button on:click={showAll}>All tokens</button>
  <button on:click={showOnSale}>On Sale</button>
  <button>All tokens</button>
</div>
<Mytokens {predicate} />

<style lang="scss">
  .collection-header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
