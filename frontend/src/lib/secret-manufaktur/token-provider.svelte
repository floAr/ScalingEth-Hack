<script lang="ts">
  import { browser } from '$app/env'
  import { SecretStore, selectedAccount } from '$lib/modules/secret/secret-store'
  import viewingKey from '$lib/modules/secret/viewingkey-store'

  import { tokenContract } from './contract-interaction'

  import { AllTokensStore, MyTokensStore } from './token-store'

  async function loadTokens() {
    const tokens = await tokenContract.SendQuery({ all_tokens: {} })
    let token

    for (const element of tokens.token_list.tokens.reverse()) {
      if ($AllTokensStore.find(t => t.id === element) === undefined) {
        token = await tokenContract.SendQuery({ nft_info: { token_id: element } })

        AllTokensStore.update(tokens => {
          return [...tokens, { ...token.nft_info, id: element }]
        })
      }
    }
  }

  async function loadMyTokens() {
    let vkey = viewingKey.getViewingKey($selectedAccount.address)
    if (vkey === undefined) {
      vkey = await viewingKey.addViewingKey($selectedAccount.address)
    }
    const mytokens = await tokenContract.SendQuery({
      tokens: { owner: $selectedAccount.address, viewing_key: '' }
    })
    MyTokensStore.set(mytokens.token_list.tokens)
    console.log('my tokens:', $MyTokensStore)
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
    if ($selectedAccount != null)
      if ($selectedAccount.address != null && $selectedAccount.address.length > 0) {
        loadMyTokens()
      }
  }
</script>
