<script lang="ts">
  import { browser } from '$app/env'
import { goto } from '$app/navigation';
  import { currentRedirect } from '$lib/modules/secret/redirect-store'
  import { SecretStore } from '$lib/modules/secret/secret-store'
  import { onMount } from 'svelte'

  export let redirect = '.'
  onMount(() => {
    if (browser) {
      if (!$SecretStore.connected) {
        $currentRedirect = redirect
        goto('/connect')
      }
    }
  })
</script>
