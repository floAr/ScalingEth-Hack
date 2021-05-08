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
  <meta name="keywords" content="Svelte, SvelteKit, Svelte-kit, Tailwind, HTML, CSS, JavaScript" />
  <meta name="author" content="@dansvel" />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://metatags.io/" />
  <meta property="og:title" content="secret manufaktur" />
  <meta property="og:description" content="SvelteKit and Tailwind 2 toggle dark/light theme demo" />
  <meta
    property="og:image"
    content="https://github.com/dansvel/sveltekit-typescript-postcss-tailwind2/raw/master/screenshot.png"
  />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://metatags.io/" />
  <meta property="twitter:title" content="secret manufaktur" />
  <meta
    property="twitter:description"
    content="SvelteKit and Tailwind 2 toggle dark/light theme demo"
  />
  <meta
    property="twitter:image"
    content="https://github.com/dansvel/sveltekit-typescript-postcss-tailwind2/raw/master/screenshot.png"
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
