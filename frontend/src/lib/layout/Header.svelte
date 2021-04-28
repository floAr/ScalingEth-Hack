<script lang="ts">
  import ThemeIcon from '$lib/ThemeIcon.svelte'
  import Logo from '$lib/logo/logo.svelte'

  let connected = false
</script>

<div class="nav-bar">
  <div class="nav-container">
    <div class="header-container">
      <div class="header-link">
        <a href=".">Feed</a>
      </div>
    </div>
    <div
      class="header-logo"
      on:click={() => {
        console.log('clicked logo')
      }}
    >
      <Logo />
      {#if !connected}
        <div class="toast-login">click to connect keplr</div>
      {/if}
    </div>
    <div class="header-container">
      <div class="header-link">
        <a href="mint">Manufaktur</a>
      </div>
    </div>
  </div>
</div>
<hr class="rounded" />

<style lang="scss">
  .nav-container {
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
    width: 200%;
    left: -50%;
    text-align: center;
  }

  .header-container {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 20vw;
    padding-left: 30px;
  }

  .header-container:nth-child(1) {
    justify-content: flex-end;
    padding-left: none;
    padding-right: 30px;
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
  .theme-icon {
    margin-top: 30px;
    padding: 0 10px;
  }

  /* Rounded border */
  hr.rounded {
    border-top: 1px solid #bbb;
    border-radius: 5px;
    width: 90vw;
    transform: translateY(-5px);
  }
</style>
