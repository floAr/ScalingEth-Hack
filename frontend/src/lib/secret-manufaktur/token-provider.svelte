<script lang="ts">
  import { browser } from '$app/env'
  import { SecretStore } from '$lib/modules/secret/secret-store'
  import { tokenContract } from './contract-interaction'

  import { tokenStore } from './token-store'

  async function loadTokens() {
    const tokens = await tokenContract.SendQuery({ all_tokens: {} })
    let token

    for (const element of tokens.token_list.tokens) {
      if ($tokenStore.find(t => t.id === element) === undefined) {
        token = await tokenContract.SendQuery({ nft_info: { token_id: element } })

        tokenStore.update(tokens => {
          return [{ ...token.nft_info, id: element }, ...tokens]
        })
      }
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
</script>

<div />
