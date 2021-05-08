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

<div class="connect-text">
  <div class="arrow-container">
    <span class="arrow arrow-top"> </span>
    <span class="arrow arrow-top lesser-opacity"> </span>
  </div>
  <div class="underlined-text">Please connect to keplr</div>
</div>

<style lang="scss">
  .connect-text {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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
    width: 100%;
    height: 2px;
    content: '';
    background: var(--theme-colors-text);
    position: absolute;
    left: 0;
    bottom: 2px;
    border-radius: 2px;
  }

  .arrow-container {
    position: absolute;
    height: max-content;
    width: 100%;
    left: 0;
    top: 26vh;
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    animation: moving 2s infinite;
  }

  @keyframes moving {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

  .arrow {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid var(--theme-colors-text);
    border-right: 2px solid var(--theme-colors-text);
  }

  .arrow-top {
    transform: rotate(-45deg);
  }

  .lesser-opacity {
    opacity: .5;
  }
</style>
