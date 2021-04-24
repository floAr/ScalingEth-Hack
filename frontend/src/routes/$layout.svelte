<script lang="ts">
  import Header from '$lib/layout/header.svelte'

  import '../global.postcss'
  import { theme } from './store'
  import { onMount } from 'svelte'

  onMount(() => {
    if ($theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    }
  })
</script>

<main>
  <Header />

  <slot />
</main>
