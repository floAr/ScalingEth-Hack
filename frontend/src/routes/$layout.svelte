<script lang="ts">
	import '../app.scss';
	
	import { browser } from '$app/env';
	import { ThemeWrapper } from 'svelte-themer';
	import { themes } from './../themes';
	import { toastStore } from '$lib/modules/toast/toast-store';
	import Header from '$lib/layout/header.svelte'
	import Footer from '$lib/layout/footer.svelte'
import TokenProvider from '$lib/secret-manufaktur/token-provider.svelte';


	if(browser){
		toastStore.enableToast()
	}

</script>

<ThemeWrapper themes={themes} >
	<TokenProvider />
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
		min-height: 80vh;
	}
	:global(body) {
		background-color: var(--theme-colors-background, initial);
		color: var(--theme-colors-text, initial);
		margin: 0;
	}
</style>
