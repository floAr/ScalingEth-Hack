<script lang="ts">
  import { theme } from './store'
  import Counter from '$lib/Counter.svelte'
  import Timer from '$lib/Timer.svelte'
  import Logo from '$lib/logo/logo.svelte'
  import Title from '$lib/logo/title.svelte'
  import { onMount } from 'svelte'
  import { toastStore } from '$lib/modules/toast/toast-store'
  import Flow from '$lib/components/flow.svelte'
  import { SecretStore } from '$lib/modules/secret/secret-store'

  onMount(async () => {
    await toastStore.enableToast()
  })
</script>
<!-- Buttons={[{ title: 'buy me', func: t => console.log('bought', t.name, 'for', t.price) }]} -->
<Flow />

<style lang="scss">
</style>
