<script lang="ts">
  import ThemeIcon from '$lib/components/ThemeIcon.svelte'
  import Logo from '$lib/logo/logo.svelte'
  import { SecretStore, status } from '$lib/modules/secret/secret-store'

  import Seperator from '$lib/components/seperator.svelte'

  async function connect() {
    await SecretStore.setBrowserProvider('holodeck-2')
  }
</script>

<div class="nav-bar">
  <div class="nav-container">
    <div class="header-container left">
      <div class="header-link">
        <a href=".">Feed</a>
      </div>
    </div>
    <div
      class="header-logo"
      on:click={() => {
        connect()
      }}
    >
      <Logo />
      {#if $status === 'undefined'}
        <div class="toast-login">click to connect keplr</div>
      {:else if $status === 'working'}
        <div class="toast-login">working</div>
      {:else}
        <div class="toast-login">{$SecretStore.account?.address}</div>
      {/if}
    </div>
    <div class="header-container right">
      <div class="header-link">
        <a href="mint">Manufaktur</a>
      </div>
    </div>
  </div>
</div>
<Seperator />

<style lang="scss">
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    font-family: 'Cinzel Decorative', cursive;
    font-weight: 700;
    font-size: large;
    width: 100vw;
    color: var(--theme-colors-text);
    margin: 10px 0;
  }
  .nav-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .header-logo {
    width: 100px;
    position: relative;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .toast-login {
    font-weight: normal;
    font-size: x-small;
    position: absolute;
    min-width: max-content;
    width: 300%;
    left: -100%;
    text-align: center;
  }

  .header-container {
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .header-container.left {
    right: 120%;
  }

  .header-container.right {
    left: 120%;
  }

  .header-link {
    position: relative;
    overflow: hidden;
  }

  .header-link a {
    text-decoration: none;
  }

  .header-link::before {
    position: absolute;
    bottom: 0;
    left: -100%;
    content: '';
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background-color: #bbb;
    transition: all 0.4s ease-in-out;
  }

  .header-link:focus-within::before {
    left: 0;
  }

  .header-link:hover::before {
    left: 0;
  }
  .header-link a:visited {
    color: var(--theme-colors-text);
  }
  .theme-icon {
    margin-top: 30px;
    padding: 0 10px;
  }
</style>
