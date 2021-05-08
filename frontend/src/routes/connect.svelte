<script lang="ts">
  import { browser } from '$app/env'

  import { goto } from '$app/navigation'
  import { currentRedirect } from '$lib/modules/secret/redirect-store'

  import { SecretStore } from '$lib/modules/secret/secret-store'

  import { onMount } from 'svelte'

  onMount(() => {
    if (browser) {
      if ($SecretStore.connected) goto($currentRedirect)
    }
  })

  $: {
    if (browser) {
      if ($SecretStore.connected) goto($currentRedirect)
    }
  }
</script>

<div class="connect-text"><div class="underlined-text">Please connect to keplr</div></div>

<style lang="scss">
  .connect-text {
    height: 100%;
    widows: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .underlined-text {
    font-family: 'Cinzel Decorative';
    letter-spacing: 0px;
    position: relative;
    font-size: larger;
    font-weight: bold;
    margin: 0 5px;
  }

  .underlined-text::after {
    width: 110%;
    height: 2px;
    content: '';
    background: var(--theme-colors-text);
    position: absolute;
    left: -5%;
    bottom: 2px;
    border-radius: 2px;
  }
  
</style>

