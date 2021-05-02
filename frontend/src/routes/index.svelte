<script lang="ts">
	import { theme } from './store';
	import Counter from '$lib/Counter.svelte';
	import Timer from '$lib/Timer.svelte';
	import Logo from '$lib/logo/logo.svelte';
	import Title from '$lib/logo/title.svelte';
	import { onMount } from 'svelte';
	import { toastStore } from '$lib/modules/toast/toast-store';
  import Flow from '$lib/components/flow.svelte'
import { SecretStore } from '$lib/modules/secret/secret-store';

  

	onMount(async () => {
		await toastStore.enableToast();
		$toastStore.info('Toaster', 'Hello from the toast');
	});

</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>secret manufaktur</title>
	<meta name="title" content="secret manufaktur" />
	<meta name="description" content="secret manufaktur - privacy with NFT art on the secret network" />
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
<Flow/>
<style lang="scss">
</style>
