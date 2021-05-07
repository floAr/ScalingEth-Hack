<script lang="ts">
  import { browser } from '$app/env'
  import { SecretStore, selectedAccount } from '$lib/modules/secret/secret-store'
  import { viewingKey } from '$lib/modules/secret/viewingkey-store'
  import { tokenContract } from './contract-interaction'
  import { AllTokensStore, MyTokensStore, ShouldUpdate } from './token-store'

  // let vkey: string | undefined = undefined
  // if (browser) {
  //   viewingKey.subscribe(value => {
  //     vkey = value
  //   })
  // }

  // async function setViewingkey() {
  //   if (browser) {
  //     const entropy = SecretStore.getEntropy()
  //     const viewingkey = await tokenContract.SendTransaction({
  //       create_viewing_key: {
  //         entropy,
  //         padding: SecretStore.createPadding(entropy.length, 128)
  //       }
  //     })
  //     viewingKey.set(viewingkey.viewing_key.key)
  //     return viewingkey.viewing_key.key
  //   }
  //   return ''
  // }

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
      $ShouldUpdate = false
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
      if ($ShouldUpdate) {
        if ($selectedAccount != null)
          if ($selectedAccount.address != null && $selectedAccount.address.length > 0) {
            loadMyTokens()
          }
        loadTokens()
      }
    }
  }
</script>
<div/>