<script context="module" lang="ts">
  import { SecretStore } from '$lib/modules/secret/secret-store'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    let connected = false
    SecretStore.subscribe(value => {
      connected = value.queryClient !== undefined
    })
    if (!connected) await SecretStore.connect('holodeck-2')
    return { status: 200 }
  }
</script>

<script lang="ts">
  import '../app.scss'

  import { browser } from '$app/env'
  import { ThemeWrapper } from 'svelte-themer'
  import { themes } from './../themes'
  import { toastStore } from '$lib/modules/toast/toast-store'
  import Header from '$lib/layout/header.svelte'
  import Footer from '$lib/layout/footer.svelte'
  import TokenProvider from '$lib/secret-manufaktur/token-provider.svelte'

  if (browser) {
    toastStore.enableToast()
  }
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>secret manufaktur</title>
  <meta name="title" content="secret manufaktur" />
  <meta
    name="description"
    content="secret manufaktur - privacy with NFT art on the secret network"
  />
  <meta name="keywords" content="Secret Network, NFT, Art" />
  <meta name="author" content="@florianuhde" />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://priceless-lalande-b40c28.netlify.app/" />
  <meta property="og:title" content="secret manufaktur" />
  <meta
    property="og:description"
    content="Secret Manufaktur brings privacy to NFT art. It allows artists creators to leverage secret networks privacy preserving smart contracts for their creations to enable on-chain unlockables, hidden ownership and private transactions."
  />
  <meta
    property="og:image"
    content="https://github.com/floAr/ScalingEth-Hack/blob/main/frontend/screenshot.png"
  />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://priceless-lalande-b40c28.netlify.app/" />
  <meta property="twitter:title" content="secret manufaktur" />
  <meta
    property="twitter:description"
    content="Secret Manufaktur brings privacy to NFT art. It allows artists creators to leverage secret networks privacy preserving smart contracts for their creations to enable on-chain unlockables, hidden ownership and private transactions."
  />
  <meta
    property="twitter:image"
    content="https://github.com/floAr/ScalingEth-Hack/blob/main/frontend/screenshot.png"
  />
</svelte:head>
<TokenProvider />
<ThemeWrapper {themes}>
  <div class="parent">
    <Header />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</ThemeWrapper>

<style lang="scss">
  .parent {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  .content {
    min-height: 75vh;
  }
  :global(body) {
    background-color: var(--theme-colors-background, initial);
    color: var(--theme-colors-text, initial);
    margin: 0;
  }
</style>
