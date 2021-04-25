<script lang="ts">
	import '../app.scss';
	
	import { browser } from '$app/env';
	import { ThemeWrapper } from 'svelte-themer';
	import { themes } from './../themes';
	import { toastStore } from '$lib/modules/toast/toast-store';
	import Header from '$lib/layout/header.svelte'


	if(browser){
		toastStore.enableToast()
	}

</script>

<ThemeWrapper themes={themes} >
	<div id="parent">
		<Header />
		<slot />
	</div>
</ThemeWrapper>

<style lang="scss">
	.parent {
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
	:global(body) {
		background-color: var(--theme-colors-background, initial);
		color: var(--theme-colors-text, initial);
	}
</style>
