<script lang="ts">
  import { browser } from '$app/env'
  import { SecretStore, selectedAccount } from '$lib/modules/secret/secret-store'
  import { viewingKey } from '$lib/modules/secret/viewingkey-store'
import { onMount } from 'svelte';
  import { tokenContract } from './contract-interaction'
  import { AllTokensStore, loadTokens, MyTokensStore } from './token-store'


  async function loadMyTokens() {
    if (browser) {
      let vkey = viewingKey.getViewingKey($selectedAccount.address)
      if (vkey === undefined || vkey.length === 0) {
        vkey = await viewingKey.addViewingKey($selectedAccount.address)
      }
      const mytokens = await tokenContract.SendQuery({
        tokens: { owner: $selectedAccount.address, viewing_key: vkey }
      })
      MyTokensStore.set(mytokens.token_list.tokens)
      console.log('my tokens:', $MyTokensStore)
      // $ShouldUpdateTokens = false
    }
  }

  if (browser) {
    if ($SecretStore.queryClient === null) {
      SecretStore.connect('holodeck-2').then(() => {
         loadTokens()
      })
    } else {
      loadTokens()
    }
  }

  $: {
    if (browser) {
      if (true) {
        if ($selectedAccount != null)
          if ($selectedAccount.address != null && $selectedAccount.address.length > 0) {
            loadMyTokens()
          }
      }
    }
  }

  onMount(()=>{
    if(browser){
      window.setInterval(()=>{
        loadTokens()
      },25000)
    }
  })
</script>
<div/>