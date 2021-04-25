<script lang="ts">
	import { spring } from 'svelte/motion';
	import { getContext } from 'svelte';
	let { toggle, current } = getContext('theme');
	export let size = 50;
	const properties = {
		dark: {
			r: 9,
			rota: 50,
			cx: 12,
			cy: 4,
			opacity: 0
		},
		light: {
			r: 5,
			rota: 90,
			cx: 30,
			cy: 0,
			opacity: 1
		}
	};
	let parameters = spring(properties.dark, {
		stiffness: 0.1,
		damping: 0.2
	});

	function setDark() {
		parameters.set(properties.dark);
	}
	function setLight() {
		parameters.set(properties.light);
	}

    setLight();
	function toggeTheme() {
		if ($current !== 'light') {
			toggle();
			setDark();
		} else {
			toggle();
			setLight();
		}
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	on:click={toggeTheme}
	style="transform: rotate({$parameters.rota}deg); cursor: pointer"
>
	<mask id="mask">
		<rect x="0" y="0" width="100%" height="100%" fill="white" />
		<circle cx={$parameters.cx} cy={$parameters.cy} r="9" fill="black" />
	</mask>
	<circle fill="black" cx="12" cy="12" r={$parameters.r} mask="url(#mask)" />
	<g stroke="currentColor">
		<line x1="12" y1="1" x2="12" y2="3" opacity={$parameters.opacity} />
		<line x1="12" y1="21" x2="12" y2="23" opacity={$parameters.opacity} />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" opacity={$parameters.opacity} />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" opacity={$parameters.opacity} />
		<line x1="1" y1="12" x2="3" y2="12" opacity={$parameters.opacity} />
		<line x1="21" y1="12" x2="23" y2="12" opacity={$parameters.opacity} />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" opacity={$parameters.opacity} />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" opacity={$parameters.opacity} />
	</g>
</svg>

<style>
	circle {
		fill: var(--theme-colors-text, initial);
	}
</style>
