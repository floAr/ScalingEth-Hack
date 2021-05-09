<script lang="ts">
  import Flow from '$lib/components/flow.svelte'
  import { loadTokens, MyTokensStore } from '$lib/secret-manufaktur/token-store'
  import type { PublicToken } from '$lib/secret-manufaktur/token-store'
  import Connector from '$lib/components/connector.svelte'

  loadTokens()

  let currentTab: 'all tokens' | 'on sale' = 'all tokens'

  const items = ['all tokens', 'on sale']

  const handleClick = tabValue => () => (currentTab = tabValue)

  const isMyToken = (token: PublicToken) => {
    return $MyTokensStore.includes(token.id)
  }

  let predicate: (token: PublicToken) => boolean = isMyToken

  $: {
    switch (currentTab) {
      case 'all tokens':
        predicate = isMyToken
        break
      case 'on sale':
        predicate = token => {
          return isMyToken(token) && token.price != null
        }
        break

      default:
        break
    }
  }
</script>

<Connector redirect={'/collection'} />
<ul>
  {#each items as item}
    <li class={currentTab === item ? 'active' : ''}>
      <span on:click={handleClick(item)}>{item}</span>
    </li>
  {/each}
</ul>
<Flow {predicate} />

<!-- <style lang="scss" ✂prettier:content✂="CiAgLmNvbGxlY3Rpb24taGVhZGVyIHsKICAgIGRpc3BsYXk6IGZsZXg7CiAgICBmbGV4LWRpcmVjdGlvbjogcm93OwogICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7CiAgfQo=" ✂prettier:content✂=""></style> -->
<style lang="scss">
  .box {
    margin-bottom: 10px;
    padding: 40px;
    border: 2px solid var(--theme-colors-text);
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 2px solid var(--theme-colors-text);
  }
  li {
    margin-bottom: -2px;
    flex: 1;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  span {
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: 'Cinzel Decorative', cursive;
    font-weight: bold;
    font-size: medium;
    transition: all 0.4s ease-in-out;
  }

  li:nth-child(1) span:hover {
    box-shadow: inset -50vw 0px 0 0 var(--theme-colors-text); 
    color: var(--theme-colors-background);
  }

  li:nth-child(2) span:hover {
    box-shadow: inset 50vw 0px 0 0 var(--theme-colors-text); 
    color: var(--theme-colors-background);
  }

  li:nth-child(1).active span {
    box-shadow: inset -50vw 0px 0 0 var(--theme-colors-text); 
  }

  li:nth-child(2).active span {
    box-shadow: inset 50vw 0px 0 0 var(--theme-colors-text); 
  }

  li.active > span {
    color: var(--theme-colors-background);     
    letter-spacing: 1px;                                              
  }
</style>
